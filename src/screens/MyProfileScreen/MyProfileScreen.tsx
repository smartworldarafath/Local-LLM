import React, {useState, useContext} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Animated,
} from 'react-native';
import {Text, Button, TextInput, Divider} from 'react-native-paper';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {observer} from 'mobx-react-lite';

import {useTheme} from '../../hooks';
import {createStyles} from './styles';
import {uiStore} from '../../store';
import {authService} from '../../services';
import {Sheet} from '../../components';
import {UserIcon, CheckSmIcon, TrashIcon} from '../../assets/icons';

const AVATAR_PRESETS = [
  '🤖',
  '🧠',
  '⚡',
  '🚀',
  '🎨',
  '🌟',
  '💻',
  '🦊',
  '🦉',
  '🦁',
  '🧑‍💻',
  '🧑‍🚀',
];

export const MyProfileScreen: React.FC = observer(() => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);

  const profile = uiStore.userProfile;

  const [name, setName] = useState(profile.name || '');
  const [email, setEmail] = useState(profile.email || '');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(
    profile.photo || null,
  );
  const [saveSettingsMode, setSaveSettingsMode] = useState<'local' | 'cloud'>(
    profile.saveSettingsMode || 'local',
  );
  const [saveHistoryMode, setSaveHistoryMode] = useState<'local' | 'none'>(
    profile.saveHistoryMode || 'local',
  );

  // Sheets and Modals
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [showEmailSignInModal, setShowEmailSignInModal] = useState(false);
  const [signInEmail, setSignInEmail] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSaveProfile = () => {
    uiStore.setUserProfile({
      name: name.trim() || 'User',
      email: email.trim(),
      photo: selectedPhoto,
      saveSettingsMode,
      saveHistoryMode,
    });
    Alert.alert('Success', 'Profile and preferences updated successfully!');
  };

  const handleSelectAvatar = (emoji: string) => {
    setSelectedPhoto(emoji);
    uiStore.setUserProfile({photo: emoji});
    setShowAvatarPicker(false);
  };

  const handleRemoveAvatar = () => {
    setSelectedPhoto(null);
    uiStore.setUserProfile({photo: null});
  };

  const handleEmailSignIn = async () => {
    if (!signInEmail.trim() || !signInEmail.includes('@')) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    setIsSigningIn(true);
    try {
      // Simulate/Trigger Email Sign In
      setEmail(signInEmail.trim());
      setSaveSettingsMode('cloud');
      uiStore.setUserProfile({
        email: signInEmail.trim(),
        saveSettingsMode: 'cloud',
      });
      setShowEmailSignInModal(false);
      setSignInEmail('');
      Alert.alert(
        'Signed In',
        `Successfully connected account for ${signInEmail.trim()}! Settings will now sync.`,
      );
    } catch (error) {
      Alert.alert(
        'Sign In Error',
        error instanceof Error ? error.message : 'Failed to sign in.',
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Card */}
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatar}>
                {selectedPhoto ? (
                  <Text style={styles.avatarEmoji}>{selectedPhoto}</Text>
                ) : (
                  <UserIcon
                    width={48}
                    height={48}
                    stroke={theme.colors.primary}
                  />
                )}
              </View>
            </View>

            <View style={styles.avatarActionsRow}>
              <Button
                mode="contained-tonal"
                compact
                onPress={() => setShowAvatarPicker(true)}>
                {selectedPhoto ? 'Change Photo' : 'Set Photo'}
              </Button>
              {selectedPhoto && (
                <Button
                  mode="outlined"
                  compact
                  textColor={theme.colors.error}
                  onPress={handleRemoveAvatar}>
                  Remove
                </Button>
              )}
            </View>
          </View>

          {/* User Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>User Details</Text>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Display Name</Text>
              <TextInput
                mode="outlined"
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                style={styles.textInput}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Email Address (Optional)</Text>
              <TextInput
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                placeholder="example@mail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.textInput}
              />
            </View>
          </View>
        </View>

        {/* Save Settings Data Card */}
        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Save Settings Data</Text>
            <Text
              variant="bodySmall"
              style={{color: theme.colors.onSurfaceVariant, marginBottom: 8}}>
              Choose how your app configuration and settings are saved:
            </Text>

            <View style={styles.optionButtonRow}>
              <Button
                mode={saveSettingsMode === 'local' ? 'contained' : 'outlined'}
                style={styles.choiceButton}
                onPress={() => {
                  setSaveSettingsMode('local');
                  uiStore.setUserProfile({saveSettingsMode: 'local'});
                }}>
                Local Storage
              </Button>

              <Button
                mode={saveSettingsMode === 'cloud' ? 'contained' : 'outlined'}
                style={styles.choiceButton}
                onPress={() => {
                  if (authService.isAuthenticated || profile.email) {
                    setSaveSettingsMode('cloud');
                    uiStore.setUserProfile({saveSettingsMode: 'cloud'});
                  } else {
                    setShowEmailSignInModal(true);
                  }
                }}>
                Sign In
              </Button>
            </View>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {saveSettingsMode === 'local'
                  ? '🔒 Settings are securely saved on this device locally and will persist across sessions.'
                  : `☁️ Settings are linked with ${email || 'your account'} for cloud sync.`}
              </Text>
            </View>
          </View>
        </View>

        {/* History Storage Mode */}
        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chat History Storage</Text>
            <Text
              variant="bodySmall"
              style={{color: theme.colors.onSurfaceVariant, marginBottom: 8}}>
              Configure whether chats and conversations are saved in local storage:
            </Text>

            <View style={styles.optionButtonRow}>
              <Button
                mode={saveHistoryMode === 'local' ? 'contained' : 'outlined'}
                style={styles.choiceButton}
                onPress={() => {
                  setSaveHistoryMode('local');
                  uiStore.setUserProfile({saveHistoryMode: 'local'});
                }}>
                Local (Save History)
              </Button>

              <Button
                mode={saveHistoryMode === 'none' ? 'contained' : 'outlined'}
                style={styles.choiceButton}
                onPress={() => {
                  setSaveHistoryMode('none');
                  uiStore.setUserProfile({saveHistoryMode: 'none'});
                }}>
                Don't Save
              </Button>
            </View>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {saveHistoryMode === 'local'
                  ? '💾 Chat sessions are stored locally on your device (Default).'
                  : '🚫 History is not saved. New chats will not persist after leaving.'}
              </Text>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <Button
          mode="contained"
          style={styles.saveButton}
          onPress={handleSaveProfile}>
          Save Profile Changes
        </Button>
      </ScrollView>

      {/* Avatar Picker Sheet */}
      <Sheet
        title="Choose Profile Avatar"
        isVisible={showAvatarPicker}
        onClose={() => setShowAvatarPicker(false)}>
        <View style={styles.avatarPickerSheet}>
          <View style={styles.avatarGrid}>
            {AVATAR_PRESETS.map(emoji => (
              <TouchableOpacity
                key={emoji}
                style={[
                  styles.avatarOption,
                  selectedPhoto === emoji && styles.avatarOptionSelected,
                ]}
                onPress={() => handleSelectAvatar(emoji)}>
                <Text style={{fontSize: 28}}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Sheet>

      {/* Email Sign In Animated Modal */}
      <Modal
        visible={showEmailSignInModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowEmailSignInModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sign In With Email</Text>
            <Text style={styles.modalSubtitle}>
              Enter your email address to sync and save your app settings data safely.
            </Text>

            <TextInput
              mode="outlined"
              label="Email Address"
              value={signInEmail}
              onChangeText={setSignInEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="you@example.com"
              style={{marginBottom: 16}}
            />

            <View style={styles.modalActions}>
              <Button
                mode="text"
                onPress={() => setShowEmailSignInModal(false)}
                disabled={isSigningIn}>
                Cancel
              </Button>
              <Button
                mode="contained"
                loading={isSigningIn}
                disabled={isSigningIn}
                onPress={handleEmailSignIn}>
                Sign In
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
});

export default MyProfileScreen;
