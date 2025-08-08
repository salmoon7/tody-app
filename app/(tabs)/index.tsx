import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const todayDate = new Date().toLocaleDateString();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Today</Text>
        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Subheading */}
      <Text style={styles.subheading}>Best platform to create to-do list</Text>

      {/* Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader} />
        <View style={styles.cardContent}>
          <TouchableOpacity style={styles.plusButton}>
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.cardText}>
            Tap plus to create a new task
          </Text>
        </View>
        {/* Task row */}
        <View style={styles.taskRow}>
          <Text style={styles.taskText}>Add your task text</Text>
          <Text style={styles.taskDate}>{todayDate}</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  subheading: {
    color: "#767E8C",
    marginVertical: 10,
    fontSize: 16,
  },
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginTop: 20,
    padding: 16,
  },
  cardHeader: {
    backgroundColor: "#24A19C",
    height: 40,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginHorizontal: -16,
    marginTop: -16,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  plusButton: {
    backgroundColor: "#24A19C",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardText: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "System", 
  },
  taskRow: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskText: {
    color: "#767E8C",
  },
  taskDate: {
    color: "#767E8C",
  },
});
