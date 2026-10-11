import {StyleSheet} from 'react-native';
import {EdgeInsets} from 'react-native-safe-area-context';
import {Theme} from '../../utils/types';

export const createStyles = (theme: Theme, insets: EdgeInsets) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flexGrow: 1,
      padding: theme.spacing.default,
      paddingBottom: theme.spacing.default + insets.bottom + 20,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borders.default,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.colors.outline,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 6,
      marginBottom: 16,
    },
    header: {
      padding: theme.spacing.default * 1.5,
      backgroundColor: theme.colors.surfaceContainerHighest,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surfaceVariant,
    },
    avatarWrapper: {
      position: 'relative',
      marginBottom: 12,
    },
    avatar: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: theme.colors.primaryContainer,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 3,
      borderColor: theme.colors.primary,
    },
    avatarEmoji: {
      fontSize: 44,
    },
    avatarActionsRow: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 8,
    },
    section: {
      padding: theme.spacing.default * 1.5,
    },
    sectionTitle: {
      ...theme.fonts.titleMedium,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    field: {
      marginBottom: 16,
    },
    fieldLabel: {
      ...theme.fonts.labelMedium,
      color: theme.colors.onSurfaceVariant,
      marginBottom: 6,
    },
    textInput: {
      backgroundColor: theme.colors.background,
    },
    optionButtonRow: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 8,
    },
    choiceButton: {
      flex: 1,
      borderRadius: 10,
    },
    statusBadge: {
      backgroundColor: theme.colors.surfaceVariant,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      marginTop: 8,
    },
    statusText: {
      ...theme.fonts.bodySmall,
      color: theme.colors.onSurfaceVariant,
    },
    avatarPickerSheet: {
      padding: 16,
    },
    avatarGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
      justifyContent: 'center',
      paddingVertical: 16,
    },
    avatarOption: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.colors.surfaceVariant,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    avatarOptionSelected: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primaryContainer,
    },
    saveButton: {
      marginTop: 8,
      borderRadius: 12,
      paddingVertical: 4,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      padding: 24,
    },
    modalContent: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 24,
      elevation: 5,
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    modalTitle: {
      ...theme.fonts.titleLarge,
      color: theme.colors.onSurface,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    modalSubtitle: {
      ...theme.fonts.bodyMedium,
      color: theme.colors.onSurfaceVariant,
      marginBottom: 16,
    },
    modalActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 8,
      marginTop: 16,
    },
  });
