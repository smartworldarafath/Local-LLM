import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {observer} from 'mobx-react-lite';

import {PalIcon} from '../../assets/icons';
import {useTheme} from '../../hooks';
import {createStyles} from './styles';
import {AuthSheet} from '../../components/PalsHub';
import {ProfileSheet} from './components/ProfileSheet';
import {authService} from '../../services';

export const PalsScreen: React.FC = observer(() => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [showAuth, setShowAuth] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Coming Soon Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.iconWrapper}>
            <PalIcon width={36} height={36} stroke={theme.colors.primary} />
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>COMING SOON IN NEXT UPDATE</Text>
          </View>
          <Text style={styles.title}>AI Pals & Characters</Text>
          <Text style={styles.subtitle}>
            Personalized Companions, Vision Assistants & Roleplay
          </Text>
          <Text style={styles.description}>
            This feature is currently under active development and will be available in the upcoming update. Soon you will be able to discover, create, customize, and chat with specialized AI companions powered entirely offline on your device!
          </Text>
        </View>

        {/* PalsHub Account Card */}
        <View style={styles.authCard}>
          <Text style={styles.authTitle}>PalsHub Account</Text>
          {authService.isAuthenticated ? (
            <>
              <Text style={styles.signedInText}>
                Signed in as {authService.user?.email || 'User'}
              </Text>
              <Button
                mode="contained"
                onPress={() => setShowProfile(true)}
                style={styles.authButton}>
                Manage Account
              </Button>
            </>
          ) : (
            <>
              <Text style={styles.authDescription}>
                Sign in to sync your custom companions and access the community library as soon as it launches.
              </Text>
              <Button
                mode="contained"
                onPress={() => setShowAuth(true)}
                style={styles.authButton}>
                Sign In to PalsHub
              </Button>
            </>
          )}
        </View>
      </ScrollView>

      <AuthSheet isVisible={showAuth} onClose={() => setShowAuth(false)} />
      <ProfileSheet
        isVisible={showProfile}
        onClose={() => setShowProfile(false)}
        onSignInPress={() => {
          setShowProfile(false);
          setShowAuth(true);
        }}
      />
    </View>
  );
});

export default PalsScreen;
