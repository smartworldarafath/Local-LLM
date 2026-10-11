import {Platform, Linking, Alert} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import * as RNFS from '@dr.pogodin/react-native-fs';
import {UpdateInfo, ReleaseAsset, UpdateDownloadProgress} from './types';
import {formatBytes} from '../../utils/formatters';

const GITHUB_REPO_OWNER = 'smartworldarafath';
const GITHUB_REPO_NAME = 'Local-LLM';
const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases/latest`;
const GITHUB_RELEASES_FALLBACK_URL = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases`;
export const GITHUB_RELEASES_WEB_URL = `https://github.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases`;

/**
 * Normalizes a version string into comparable numerical parts.
 * Examples: "v1.0.1" -> [1, 0, 1], "1.0" -> [1, 0, 0]
 */
export function normalizeVersion(versionStr: string): number[] {
  const clean = versionStr.replace(/^[vV]/, '').trim();
  const parts = clean.split(/[.-]/).map(part => {
    const parsed = parseInt(part, 10);
    return isNaN(parsed) ? 0 : parsed;
  });
  while (parts.length < 3) {
    parts.push(0);
  }
  return parts;
}

/**
 * Compares two semantic version strings.
 * Returns 1 if v1 > v2, -1 if v1 < v2, 0 if equal.
 */
export function compareVersions(v1: string, v2: string): number {
  const parts1 = normalizeVersion(v1);
  const parts2 = normalizeVersion(v2);

  const length = Math.max(parts1.length, parts2.length);
  for (let i = 0; i < length; i++) {
    const p1 = parts1[i] ?? 0;
    const p2 = parts2[i] ?? 0;
    if (p1 > p2) {
      return 1;
    }
    if (p1 < p2) {
      return -1;
    }
  }
  return 0;
}

class UpdateService {
  private activeDownloadJobId: number | null = null;
  private downloadedApkPath: string | null = null;

  /**
   * Fetches latest release metadata from GitHub repository.
   */
  async checkForUpdates(): Promise<UpdateInfo> {
    const currentVersion = DeviceInfo.getVersion() || '1.0.0';
    const currentBuild = DeviceInfo.getBuildNumber() || '1';

    let releaseData: any = null;

    try {
      const response = await fetch(GITHUB_API_URL, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'Local-LLM-App',
        },
      });

      if (response.ok) {
        releaseData = await response.json();
      } else if (response.status === 404) {
        // Fallback to releases list if latest release is not tagged
        const listResponse = await fetch(GITHUB_RELEASES_FALLBACK_URL, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'Local-LLM-App',
          },
        });
        if (listResponse.ok) {
          const list = await listResponse.json();
          if (Array.isArray(list) && list.length > 0) {
            releaseData = list[0];
          }
        }
      }
    } catch (error) {
      console.warn('[UpdateService] Failed to fetch latest release:', error);
    }

    if (!releaseData) {
      return {
        isUpdateAvailable: false,
        currentVersion,
        currentBuild,
        latestVersion: currentVersion,
        releaseName: `v${currentVersion}`,
        releaseNotes: '',
        publishedAt: new Date().toISOString(),
        htmlUrl: GITHUB_RELEASES_WEB_URL,
      };
    }

    const latestTag = releaseData.tag_name || releaseData.name || currentVersion;
    const cleanLatestVersion = latestTag.replace(/^[vV]/, '');
    const isUpdateAvailable =
      compareVersions(cleanLatestVersion, currentVersion) > 0;

    let apkAsset: ReleaseAsset | undefined;
    if (Array.isArray(releaseData.assets)) {
      const foundApk = releaseData.assets.find(
        (asset: any) =>
          asset.name && asset.name.toLowerCase().endsWith('.apk'),
      );
      if (foundApk) {
        apkAsset = {
          id: foundApk.id,
          name: foundApk.name,
          size: foundApk.size,
          downloadUrl: foundApk.browser_download_url,
          contentType: foundApk.content_type,
        };
      }
    }

    return {
      isUpdateAvailable,
      currentVersion,
      currentBuild,
      latestVersion: cleanLatestVersion,
      releaseName: releaseData.name || `Release ${latestTag}`,
      releaseNotes: releaseData.body || '',
      publishedAt: releaseData.published_at || releaseData.created_at || '',
      htmlUrl: releaseData.html_url || GITHUB_RELEASES_WEB_URL,
      apkAsset,
    };
  }

  /**
   * Downloads APK from the given asset URL with progress tracking.
   */
  async downloadUpdate(
    asset: ReleaseAsset,
    onProgress: (progress: UpdateDownloadProgress) => void,
  ): Promise<string> {
    const destDir =
      Platform.OS === 'android' && RNFS.DownloadDirectoryPath
        ? RNFS.DownloadDirectoryPath
        : RNFS.CachesDirectoryPath;

    const destPath = `${destDir}/${asset.name || `Local-LLM-update.apk`}`;
    this.downloadedApkPath = destPath;

    // Check if file already exists from previous download
    try {
      const exists = await RNFS.exists(destPath);
      if (exists) {
        await RNFS.unlink(destPath);
      }
    } catch {
      // Ignore file check errors
    }

    let lastBytes = 0;
    let lastTime = Date.now();
    let currentSpeed = '0 KB/s';

    const downloadOptions = {
      fromUrl: asset.downloadUrl,
      toFile: destPath,
      background: true,
      progressDivider: 1,
      begin: (res: any) => {
        const total = res.contentLength || asset.size || 0;
        onProgress({
          progress: 0,
          bytesWritten: 0,
          contentLength: total,
          speed: '0 KB/s',
          formattedProgress: `0 B / ${formatBytes(total)}`,
        });
      },
      progress: (res: any) => {
        const now = Date.now();
        const timeDiff = (now - lastTime) / 1000;
        if (timeDiff >= 0.5) {
          const bytesDiff = res.bytesWritten - lastBytes;
          const bytesPerSec = bytesDiff / timeDiff;
          currentSpeed = `${formatBytes(bytesPerSec)}/s`;
          lastBytes = res.bytesWritten;
          lastTime = now;
        }

        const total = res.contentLength || asset.size || 1;
        const pct = Math.min(100, Math.round((res.bytesWritten / total) * 100));

        onProgress({
          progress: pct,
          bytesWritten: res.bytesWritten,
          contentLength: total,
          speed: currentSpeed,
          formattedProgress: `${formatBytes(res.bytesWritten)} / ${formatBytes(total)}`,
        });
      },
    };

    const downloadResult = RNFS.downloadFile(downloadOptions);
    this.activeDownloadJobId = downloadResult.jobId;

    const response = await downloadResult.promise;
    this.activeDownloadJobId = null;

    if (response.statusCode === 200 || response.statusCode === 0) {
      return destPath;
    } else {
      throw new Error(`Download failed with status code ${response.statusCode}`);
    }
  }

  /**
   * Cancels any active download job.
   */
  cancelDownload() {
    if (this.activeDownloadJobId !== null) {
      RNFS.stopDownload(this.activeDownloadJobId);
      this.activeDownloadJobId = null;
    }
  }

  /**
   * Installs or opens the downloaded APK file.
   */
  async installApk(filePath?: string): Promise<void> {
    const targetPath = filePath || this.downloadedApkPath;
    if (!targetPath) {
      Linking.openURL(GITHUB_RELEASES_WEB_URL);
      return;
    }

    try {
      if (Platform.OS === 'android') {
        const fileUrl = `file://${targetPath}`;
        const canOpen = await Linking.canOpenURL(fileUrl);
        if (canOpen) {
          await Linking.openURL(fileUrl);
        } else {
          // Open releases web page as fallback
          await Linking.openURL(GITHUB_RELEASES_WEB_URL);
        }
      } else {
        await Linking.openURL(GITHUB_RELEASES_WEB_URL);
      }
    } catch (error) {
      console.warn('[UpdateService] Failed to open APK file:', error);
      Linking.openURL(GITHUB_RELEASES_WEB_URL);
    }
  }

  /**
   * Opens GitHub releases in browser.
   */
  openReleasesWeb(url?: string) {
    Linking.openURL(url || GITHUB_RELEASES_WEB_URL);
  }
}

export const updateService = new UpdateService();
