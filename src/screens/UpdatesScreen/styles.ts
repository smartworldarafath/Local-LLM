import {StyleSheet} from 'react-native';
import {Theme} from '../../utils/types';

export const createStyles = (theme: Theme, insets: {bottom: number; top: number}) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      padding: 16,
      paddingBottom: insets.bottom + 24,
      gap: 16,
    },
    headerCard: {
      borderRadius: 16,
      padding: 20,
      backgroundColor: theme.colors.surface,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.08,
      shadowRadius: 8,
      gap: 14,
    },
    appTitleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    appTitle: {
      ...theme.fonts.headlineSmall,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
    },
    versionBadge: {
      backgroundColor: theme.colors.secondaryContainer,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
    },
    versionBadgeText: {
      ...theme.fonts.labelMedium,
      color: theme.colors.onSecondaryContainer,
      fontWeight: '600',
    },
    statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    statusText: {
      ...theme.fonts.bodyMedium,
      color: theme.colors.onSurfaceVariant,
    },
    checkButton: {
      marginTop: 6,
      borderRadius: 12,
    },
    updateCard: {
      borderRadius: 16,
      padding: 20,
      backgroundColor: theme.colors.surface,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.08,
      shadowRadius: 8,
      gap: 16,
    },
    updateHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    releaseTitle: {
      ...theme.fonts.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      flex: 1,
    },
    newTag: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 6,
      marginLeft: 8,
    },
    newTagText: {
      ...theme.fonts.labelSmall,
      color: theme.colors.onPrimary,
      fontWeight: '700',
    },
    metaRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    metaText: {
      ...theme.fonts.bodySmall,
      color: theme.colors.textSecondary,
    },
    changelogContainer: {
      backgroundColor: theme.colors.surfaceVariant,
      padding: 14,
      borderRadius: 12,
      maxHeight: 220,
    },
    changelogTitle: {
      ...theme.fonts.titleSmall,
      color: theme.colors.onSurfaceVariant,
      marginBottom: 8,
      fontWeight: '600',
    },
    progressSection: {
      gap: 8,
      backgroundColor: theme.colors.surfaceVariant,
      padding: 16,
      borderRadius: 12,
    },
    progressBar: {
      height: 8,
      borderRadius: 4,
    },
    progressInfoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    progressText: {
      ...theme.fonts.bodySmall,
      color: theme.colors.onSurfaceVariant,
    },
    speedText: {
      ...theme.fonts.labelSmall,
      color: theme.colors.primary,
      fontWeight: '600',
    },
    actionButtonsRow: {
      flexDirection: 'column',
      gap: 10,
    },
    primaryButton: {
      borderRadius: 12,
    },
    secondaryButton: {
      borderRadius: 12,
    },
    upToDateCard: {
      borderRadius: 16,
      padding: 24,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.08,
      shadowRadius: 8,
      gap: 12,
    },
    upToDateTitle: {
      ...theme.fonts.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: '600',
      textAlign: 'center',
    },
    upToDateDesc: {
      ...theme.fonts.bodySmall,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    githubRepoLink: {
      marginTop: 4,
    },
  });
