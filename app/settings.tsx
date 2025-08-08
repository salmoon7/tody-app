import { useAuthStore } from '@/lib/store';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Divider, List, Switch, Text, useTheme } from 'react-native-paper';

export default function SettingsScreen() {
  const { colors } = useTheme();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const handleLogout = () => {
    setUser(null);
    router.replace('/login');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: user?.image }}
            style={styles.avatar}
          />
          <TouchableOpacity style={[styles.editIcon, { backgroundColor: "#24A19C" }]}>
            <MaterialIcons name="edit" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{`${user?.firstName || ''} ${user?.lastName || ''}`}</Text>
        <Text style={styles.username}>@{user?.username}</Text>
      </View>

      {/* Main Settings */}
      <List.Section>
        <List.Item
          title="Account"
          titleStyle={styles.listTitle}
          left={(props) => <List.Icon {...props} icon="account" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => console.log('Account pressed')}
        />
        <List.Item
          title="Theme"
          titleStyle={styles.listTitle}
          left={(props) => <List.Icon {...props} icon="palette" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => console.log('Theme pressed')}
        />
        <List.Item
          title="App Icon"
          titleStyle={styles.listTitle}
          left={(props) => <List.Icon {...props} icon="apps" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => console.log('App Icon pressed')}
        />
        <List.Item
          title="Productivity"
          titleStyle={styles.listTitle}
          left={(props) => <List.Icon {...props} icon="chart-line" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => console.log('Productivity pressed')}
        />
      </List.Section>

      {/* Dark Mode Switch */}
      <List.Item
        title="Dark Mode"
        titleStyle={styles.listTitle}
        left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
        right={() => (
          <Switch value={isDarkMode} onValueChange={setIsDarkMode} color="#24A19C" />
        )}
      />

      <Divider style={[styles.divider, { backgroundColor: colors.secondary }]} />

      {/* Footer Links */}
      <List.Section>
        <List.Item
          title="Privacy Policy"
          titleStyle={styles.listTitle}
          left={(props) => <List.Icon {...props} icon="shield" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => console.log('Privacy Policy')}
        />
        <List.Item
          title="Help Center"
          titleStyle={styles.listTitle}
          left={(props) => <List.Icon {...props} icon="help-circle" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => console.log('Help Center')}
        />
        <List.Item
          title="Logout"
          titleStyle={styles.listTitle}
          left={(props) => <List.Icon {...props} icon="logout" />}
          onPress={handleLogout}
        />
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingVertical: 24,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 20,
    padding: 6,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#000',
  },
  username: {
    fontSize: 14,
    color: '#767E8C',
    marginTop: 4,
  },
  listTitle: {
    fontSize: 16,
    color: '#767E8C',
  },
  divider: {
    height: 1,
    marginVertical: 8,
    marginHorizontal:6
  },
});
