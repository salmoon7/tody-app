import { useAuthStore } from "@/lib/store";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';


export default function RootLayout() {
    const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(true);

  // Allow zustand to rehydrate first
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 100); // small delay
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    // While zustand is rehydrating, show splash/loading screen
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{ headerShown: false }}
    >
      {!user ? (
        <Stack.Screen name="login" />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
<Stack.Screen
  name="settings"
  options={{
    headerShown: true,
    title: "Settings",
    headerStyle: {
      backgroundColor: "#fff",
    },
    headerTintColor: "#000",
    headerTitleStyle: {
      fontWeight: "500",
    },
    headerTitleAlign: "center",

    headerLeft: () => (
      <Pressable
        onPress={() => router.push("/")}
        style={{ paddingHorizontal: 12 }} 
      >
        <Ionicons name="chevron-back" size={24} color="#767E8C" />
      </Pressable>
    ),

    headerRight: () => (
      <Pressable
        onPress={() => alert("Search pressed!")}
        style={{ paddingHorizontal: 12 }} 
      >
        <Ionicons name="search" size={24} color="#767E8C" />
      </Pressable>
    ),
  }}
/>




    </Stack>
  );
}
