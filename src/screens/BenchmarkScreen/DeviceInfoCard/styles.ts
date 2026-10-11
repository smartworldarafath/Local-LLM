import {StyleSheet} from 'react-native';

import type {Theme} from '../../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    deviceInfoCard: {
      marginBottom: 16,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      borderRadius: 15,
    },
    deviceInfoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 4,
    },
    deviceInfoLabel: {
      color: theme.colors.onSurfaceVariant,
      flexShrink: 0,
      marginRight: 8,
    },
    deviceInfoValue: {
      color: theme.colors.onSurface,
      flex: 1,
      textAlign: 'right',
      flexWrap: 'wrap',
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    headerContent: {
      flex: 1,
    },
    headerSummary: {
      color: theme.colors.onSurfaceVariant,
      marginTop: 4,
    },
    section: {
      marginVertical: 8,
    },
    sectionTitle: {
      color: theme.colors.primary,
      marginBottom: 8,
      textTransform: 'uppercase',
    },
    // Samsung About Phone style mockup
    mockupContainer: {
      alignItems: 'center',
      paddingVertical: 16,
      backgroundColor: theme.colors.surfaceContainerLowest || theme.colors.surface,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.outline,
    },
    phoneFrame: {
      width: 140,
      height: 220,
      borderRadius: 24,
      backgroundColor: '#1E2022',
      padding: 6,
      borderWidth: 2,
      borderColor: '#3F4448',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.35,
      shadowRadius: 8,
      elevation: 6,
    },
    phoneInnerScreen: {
      flex: 1,
      borderRadius: 18,
      backgroundColor: theme.colors.primaryContainer || '#2D3748',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      paddingHorizontal: 8,
      overflow: 'hidden',
    },
    phoneCameraHole: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#0F1012',
      marginBottom: 4,
    },
    phoneScreenContent: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    phoneBrandText: {
      fontSize: 9,
      fontWeight: '700',
      letterSpacing: 1.2,
      color: theme.colors.onPrimaryContainer,
      opacity: 0.8,
      textTransform: 'uppercase',
    },
    phoneModelText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: theme.colors.onPrimaryContainer,
      textAlign: 'center',
      marginTop: 2,
    },
    phoneOsBadge: {
      backgroundColor: 'rgba(0,0,0,0.15)',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 8,
      marginTop: 4,
    },
    phoneOsText: {
      fontSize: 8,
      fontWeight: '600',
      color: theme.colors.onPrimaryContainer,
    },
    phoneBottomBar: {
      width: 32,
      height: 3,
      borderRadius: 2,
      backgroundColor: theme.colors.onPrimaryContainer,
      opacity: 0.5,
    },
    deviceSpecsBadgeRow: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 12,
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    specBadge: {
      backgroundColor: theme.colors.surfaceVariant,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 12,
    },
    specBadgeText: {
      fontSize: 11,
      fontWeight: '600',
      color: theme.colors.onSurfaceVariant,
    },
  });
