import {StyleSheet} from 'react-native';

import {Theme} from '../../utils/types';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    container: {
      padding: 16,
    },
    scrollViewContent: {
      paddingVertical: 16,
      paddingHorizontal: 16,
    },
    card: {
      marginVertical: 8,
      borderRadius: 12,
      backgroundColor: theme.colors.background,
    },
    settingItemContainer: {
      marginVertical: 16,
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 8,
    },
    textContainer: {
      flex: 1,
      marginRight: 16,
    },
    labelWithIconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    settingIcon: {
      marginRight: 8,
    },
    textLabel: {
      color: theme.colors.onSurface,
    },
    textDescription: {
      color: theme.colors.onSurfaceVariant,
      //marginTop: 4,
    },
    divider: {
      marginVertical: 12,
    },
    slider: {
      //marginVertical: 8,
      //height: 40,
    },
    textInput: {
      marginVertical: 8,
    },
    invalidInput: {
      borderColor: theme.colors.error,
      borderWidth: 1,
    },
    errorText: {
      color: theme.colors.error,
      marginTop: 4,
    },
    menuContainer: {
      position: 'relative',
    },
    menuButton: {
      minWidth: 100,
    },
    consentContainer: {
      marginVertical: 8,
    },
    consentButton: {
      alignSelf: 'flex-end',
      marginTop: 12,
    },
    buttonContent: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
    },
    advancedSettingsButton: {
      marginVertical: 8,
    },
    advancedSettingsContent: {
      marginTop: 8,
    },
    advancedAccordion: {
      height: 55,
      //backgroundColor: theme.colors.surface,
    },
    accordionTitle: {
      fontSize: 14,
      color: theme.colors.secondary,
    },
    menu: {
      width: 170,
    },
    linkContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    linkIcon: {
      marginLeft: 4,
    },
    segmentedButtons: {
      marginVertical: 8,
    },
    colorSwatchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 12,
      paddingHorizontal: 4,
    },
    colorSwatch: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: 'rgba(0,0,0,0.1)',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    colorSwatchSelected: {
      borderColor: theme.colors.primary,
      borderWidth: 3,
      transform: [{scale: 1.1}],
    },
    appearanceActionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8,
    },
    resetButton: {
      alignSelf: 'flex-start',
    },
    languageRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 8,
    },
  });
