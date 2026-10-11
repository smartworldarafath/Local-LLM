import {StyleSheet} from 'react-native';

import {Theme} from '../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    contentContainer: {
      flexGrow: 1,
      padding: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    heroCard: {
      width: '100%',
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.outline,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
      marginBottom: 20,
    },
    iconWrapper: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: theme.colors.primaryContainer,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    badge: {
      backgroundColor: theme.colors.secondaryContainer,
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 12,
      marginBottom: 12,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: theme.colors.onSecondaryContainer,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.colors.onSurface,
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.colors.primary,
      textAlign: 'center',
      marginBottom: 12,
    },
    description: {
      fontSize: 14,
      lineHeight: 22,
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
      marginBottom: 8,
    },
    authCard: {
      width: '100%',
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 20,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    authTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.colors.onSurface,
      marginBottom: 6,
    },
    authDescription: {
      fontSize: 13,
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
      marginBottom: 16,
    },
    authButton: {
      width: '100%',
      borderRadius: 12,
    },
    signedInText: {
      fontSize: 14,
      color: theme.colors.onSurface,
      marginBottom: 12,
      fontWeight: '500',
    },
  });
