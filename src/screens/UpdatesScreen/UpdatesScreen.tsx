import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {Text, Button, ProgressBar} from 'react-native-paper';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import dayjs from 'dayjs';

import {
  updateService,
  UpdateInfo,
  UpdateStatus,
  UpdateDownloadProgress,
  GITHUB_RELEASES_WEB_URL,
} from '../../services/updates';
import {useTheme} from '../../hooks';
import {createStyles} from './styles';
import {L10nContext, formatBytes} from '../../utils';
import {
  CheckCircleIcon,
  DownloadIcon,
  RefreshIcon,
  GithubIcon,
  AlertIcon,
} from '../../assets/icons';
import {MarkdownView} from '../../components/MarkdownView';

export const UpdatesScreen: React.FC = observer(() => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);
  const l10n = useContext(L10nContext);

  const [status, setStatus] = useState<UpdateStatus>('idle');
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [downloadProgress, setDownloadProgress] =
    useState<UpdateDownloadProgress | null>(null);
  const [downloadedPath, setDownloadedPath] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const checkUpdates = useCallback(async () => {
    setStatus('checking');
    setErrorMessage('');
    try {
      const info = await updateService.checkForUpdates();
      setUpdateInfo(info);
      if (info.isUpdateAvailable) {
        setStatus('update-available');
      } else {
        setStatus('up-to-date');
      }
    } catch (err) {
      console.warn('[UpdatesScreen] Error checking for updates:', err);
      setStatus('error');
      setErrorMessage(
        l10n.updates?.errorChecking ||
          'Unable to check for updates. Please verify your connection.',
      );
    }
  }, [l10n]);

  useEffect(() => {
    checkUpdates();
  }, [checkUpdates]);

  const handleStartDownload = async () => {
    if (!updateInfo?.apkAsset) {
      updateService.openReleasesWeb(updateInfo?.htmlUrl);
      return;
    }

    setStatus('downloading');
    setDownloadProgress({
      progress: 0,
      bytesWritten: 0,
      contentLength: updateInfo.apkAsset.size,
      speed: '0 KB/s',
      formattedProgress: `0 B / ${formatBytes(updateInfo.apkAsset.size)}`,
    });

    try {
      const savedPath = await updateService.downloadUpdate(
        updateInfo.apkAsset,
        progress => {
          setDownloadProgress(progress);
        },
      );
      setDownloadedPath(savedPath);
      setStatus('downloaded');
    } catch (err) {
      console.warn('[UpdatesScreen] Error downloading update:', err);
      setStatus('error');
      setErrorMessage(
        l10n.updates?.errorDownloading ||
          'Failed to download update APK. Please download from GitHub.',
      );
    }
  };

  const handleInstall = () => {
    updateService.installApk(downloadedPath || undefined);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header App Version Card */}
        <View style={styles.headerCard}>
          <View style={styles.appTitleRow}>
            <Text style={styles.appTitle}>Local LLM</Text>
            <View style={styles.versionBadge}>
              <Text style={styles.versionBadgeText}>
                v{updateInfo?.currentVersion || '1.0.0'} ({updateInfo?.currentBuild || '1'})
              </Text>
            </View>
          </View>

          <View style={styles.statusRow}>
            {status === 'checking' && (
              <>
                <ActivityIndicator size={16} color={theme.colors.primary} />
                <Text style={styles.statusText}>
                  {l10n.updates?.checkingForUpdates || 'Checking for updates...'}
                </Text>
              </>
            )}
            {status === 'up-to-date' && (
              <>
                <CheckCircleIcon
                  width={18}
                  height={18}
                  fill={theme.colors.primary}
                />
                <Text style={styles.statusText}>
                  {l10n.updates?.upToDate || "You're on the latest version"}
                </Text>
              </>
            )}
            {status === 'update-available' && (
              <>
                <DownloadIcon
                  width={18}
                  height={18}
                  stroke={theme.colors.primary}
                />
                <Text style={styles.statusText}>
                  {l10n.updates?.updateAvailable || 'New version available!'}
                </Text>
              </>
            )}
            {status === 'downloading' && (
              <>
                <ActivityIndicator size={16} color={theme.colors.primary} />
                <Text style={styles.statusText}>
                  {l10n.updates?.downloading || 'Downloading update APK...'}
                </Text>
              </>
            )}
            {status === 'downloaded' && (
              <>
                <CheckCircleIcon
                  width={18}
                  height={18}
                  fill={theme.colors.primary}
                />
                <Text style={styles.statusText}>
                  {l10n.updates?.apkReady || 'APK ready for installation'}
                </Text>
              </>
            )}
            {status === 'error' && (
              <>
                <AlertIcon
                  width={18}
                  height={18}
                  stroke={theme.colors.error}
                />
                <Text style={[styles.statusText, {color: theme.colors.error}]}>
                  {errorMessage || (l10n.updates?.errorChecking || 'Error checking for updates')}
                </Text>
              </>
            )}
          </View>

          <Button
            mode="outlined"
            icon={() => (
              <RefreshIcon
                width={16}
                height={16}
                stroke={theme.colors.primary}
              />
            )}
            loading={status === 'checking'}
            disabled={status === 'checking' || status === 'downloading'}
            onPress={checkUpdates}
            style={styles.checkButton}>
            {l10n.updates?.checkForUpdates || 'Check for Updates'}
          </Button>
        </View>

        {/* Update Available Card */}
        {(status === 'update-available' ||
          status === 'downloading' ||
          status === 'downloaded') &&
          updateInfo && (
            <View style={styles.updateCard}>
              <View style={styles.updateHeader}>
                <Text style={styles.releaseTitle}>
                  {updateInfo.releaseName || `Version ${updateInfo.latestVersion}`}
                </Text>
                <View style={styles.newTag}>
                  <Text style={styles.newTagText}>NEW</Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                {updateInfo.publishedAt && (
                  <View style={styles.metaItem}>
                    <Text style={styles.metaText}>
                      {l10n.updates?.publishedOn || 'Released'}:{' '}
                      {dayjs(updateInfo.publishedAt).format('MMM D, YYYY')}
                    </Text>
                  </View>
                )}
                {updateInfo.apkAsset?.size && (
                  <View style={styles.metaItem}>
                    <Text style={styles.metaText}>
                      {l10n.updates?.fileSize || 'Size'}:{' '}
                      {formatBytes(updateInfo.apkAsset.size)}
                    </Text>
                  </View>
                )}
              </View>

              {/* Release Notes / Changelog */}
              {updateInfo.releaseNotes ? (
                <View style={styles.changelogContainer}>
                  <Text style={styles.changelogTitle}>
                    {l10n.updates?.changelog || "What's New"}
                  </Text>
                  <ScrollView nestedScrollEnabled>
                    <MarkdownView
                      markdownText={updateInfo.releaseNotes}
                      maxMessageWidth={300}
                    />
                  </ScrollView>
                </View>
              ) : null}

              {/* Live Download Progress Section */}
              {status === 'downloading' && downloadProgress && (
                <View style={styles.progressSection}>
                  <ProgressBar
                    progress={downloadProgress.progress / 100}
                    color={theme.colors.primary}
                    style={styles.progressBar}
                  />
                  <View style={styles.progressInfoRow}>
                    <Text style={styles.progressText}>
                      {downloadProgress.formattedProgress} ({downloadProgress.progress}%)
                    </Text>
                    <Text style={styles.speedText}>
                      {downloadProgress.speed}
                    </Text>
                  </View>
                </View>
              )}

              {/* Action Buttons */}
              <View style={styles.actionButtonsRow}>
                {status === 'update-available' && (
                  <Button
                    mode="contained"
                    icon={() => (
                      <DownloadIcon
                        width={18}
                        height={18}
                        stroke={theme.colors.onPrimary}
                      />
                    )}
                    onPress={handleStartDownload}
                    style={styles.primaryButton}>
                    {l10n.updates?.downloadUpdate || 'Download & Install Update'}
                  </Button>
                )}

                {status === 'downloaded' && (
                  <Button
                    mode="contained"
                    icon={() => (
                      <CheckCircleIcon
                        width={18}
                        height={18}
                        fill={theme.colors.onPrimary}
                      />
                    )}
                    onPress={handleInstall}
                    style={styles.primaryButton}>
                    {l10n.updates?.installNow || 'Install Update'}
                  </Button>
                )}

                <Button
                  mode="outlined"
                  icon={() => (
                    <GithubIcon
                      width={18}
                      height={18}
                      stroke={theme.colors.primary}
                    />
                  )}
                  onPress={() => updateService.openReleasesWeb(updateInfo.htmlUrl)}
                  style={styles.secondaryButton}>
                  {l10n.updates?.viewOnGithub || 'View on GitHub'}
                </Button>
              </View>
            </View>
          )}

        {/* Up To Date Banner */}
        {status === 'up-to-date' && (
          <View style={styles.upToDateCard}>
            <CheckCircleIcon
              width={48}
              height={48}
              fill={theme.colors.primary}
            />
            <Text style={styles.upToDateTitle}>
              {l10n.updates?.upToDate || 'Your app is up to date'}
            </Text>
            <Text style={styles.upToDateDesc}>
              You are running the latest release of Local LLM. Any new versions published on GitHub will automatically appear here.
            </Text>
            <Button
              mode="text"
              icon={() => (
                <GithubIcon
                  width={16}
                  height={16}
                  stroke={theme.colors.primary}
                />
              )}
              onPress={() => updateService.openReleasesWeb()}
              style={styles.githubRepoLink}>
              GitHub Repository Releases
            </Button>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
});
