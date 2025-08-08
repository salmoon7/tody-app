import api from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Text as RNText, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function LoginScreen() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      console.log('Logging in with:', { username, password });

      const response = await api.post('/auth/login', { username, password });
      console.log('Login success:', response.data);

      setUser(response.data);
      router.replace('/');
    } catch (error: any) {
      console.error('Login error:', error.message);
      Alert.alert('Error', error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.headerview}>
        <RNText style={styles.header}>Create Account</RNText>
        <RNText style={styles.subText}>
          Create your account and feel the benefits
        </RNText>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          mode="flat"
          style={styles.input}
          contentStyle={styles.inputText}
          underlineColor="transparent"
          placeholder="Enter your username"
          placeholderTextColor="#A9B0C5"
          returnKeyType="next"
          onSubmitEditing={() => {}}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="flat"
          style={styles.input}
          contentStyle={styles.inputText}
          underlineColor="transparent"
          placeholder="Enter your password"
          placeholderTextColor="#A9B0C5"
          secureTextEntry={!showPass}
          right={
            <TextInput.Icon
              icon={showPass ? 'eye-off' : 'eye'}
              onPress={() => setShowPass(!showPass)}
            />
          }
          returnKeyType="done"
          onSubmitEditing={handleLogin} 
        />
      </View>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Sign Up
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff', 
    justifyContent: 'space-between',
  },
  headerview: {
    paddingTop: 40,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#767E8C',
    fontFamily: 'System',
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 16,
  },
  formContainer: {
    marginTop:-30, 
  },
  input: {
    backgroundColor: '#F6F7F9',
    marginBottom: 16,
    borderRadius: 6,
  },
  inputText: {
    color: '#000',
    fontWeight: 'bold', 
  },
  footer: {
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#24A19C',
    borderRadius: 6,
    paddingVertical: 8,
    marginBottom:20
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});
