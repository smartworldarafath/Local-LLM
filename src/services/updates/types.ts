export interface ReleaseAsset {
  id: number;
  name: string;
  size: number;
  downloadUrl: string;
  contentType: string;
}

export interface UpdateInfo {
  isUpdateAvailable: boolean;
  currentVersion: string;
  currentBuild: string;
  latestVersion: string;
  releaseName: string;
  releaseNotes: string;
  publishedAt: string;
  htmlUrl: string;
  apkAsset?: ReleaseAsset;
}

export interface UpdateDownloadProgress {
  progress: number; // 0 to 100
  bytesWritten: number;
  contentLength: number;
  speed: string; // e.g. "2.4 MB/s"
  formattedProgress: string; // e.g. "15.2 MB / 45.0 MB"
}

export type UpdateStatus =
  | 'idle'
  | 'checking'
  | 'up-to-date'
  | 'update-available'
  | 'downloading'
  | 'downloaded'
  | 'error';
