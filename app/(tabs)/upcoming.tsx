import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import dayjs from 'dayjs';
import { router, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PRIMARY_COLOR = '#24A19C';
const SECONDARY_COLOR = '#767E8C';
const RED_COLOR = '#FF3B30';

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  date: string;
  time: string;
};

const screenWidth = Dimensions.get('window').width;

export default function Upcoming() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const insets = useSafeAreaInsets();

  // Generate 14 days from start of week
  const generateWeekDays = () => {
    const startOfWeek = dayjs(selectedDate).startOf('week');
    const days: string[] = [];
    for (let i = 0; i < 14; i++) {
      days.push(dayjs(startOfWeek).add(i, 'day').format('YYYY-MM-DD'));
    }
    return days;
  };
  const weekDays = generateWeekDays();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/todos');
      const todosWithDates = response.data.todos.map((todo: any, idx: number) => ({
        ...todo,
        date: dayjs().add(idx % 5, 'day').format('YYYY-MM-DD'),
        time: `${9 + (idx % 8)}:${idx % 2 === 0 ? '00' : '30'} AM`,
      }));
      setTodos(todosWithDates);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTodos = todos.filter((todo) => todo.date === selectedDate);

  const renderTodoItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoCard}>
      <View style={styles.todoItemRow}>
        <View style={styles.circle} />
        <Text style={styles.todoTitle} numberOfLines={1}>
          {item.todo}
        </Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color={SECONDARY_COLOR} />
        </TouchableOpacity>
      </View>
      <View style={styles.infoRow}>
        <View>

        <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <View style={styles.iconCountainer}> 

        <View style={styles.iconWithCount}>
          <Ionicons name="chatbubble-outline" size={18} color={SECONDARY_COLOR} />
          <Text style={styles.iconCount}>1</Text>
        </View>
        <View style={styles.iconWithCount}>
          <MaterialCommunityIcons name="inbox-outline" size={18} color={SECONDARY_COLOR} />
          <Text style={styles.iconCount}>2</Text>
        </View>
        </View>
      </View>
      <View style={styles.dateRow}>
        <Text style={styles.dateText}>{dayjs(item.date).format('dddd')}</Text>
        <Text style={styles.dateText}>{dayjs(item.date).format('MMMM D, YYYY')}</Text>
      </View>
    </View>
  );

  // Date picker change handler
  const onChangeDate = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios'); // keep open on iOS
    if (date) {
      setSelectedDate(dayjs(date).format('YYYY-MM-DD'));
    }
  };

  // Convert selectedDate string to Date object for DatePicker value
  const selectedDateObj = dayjs(selectedDate).toDate();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Upcoming',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
          headerTitleStyle: { fontWeight: '500' },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Pressable onPress={() => router.push('/')} style={{ paddingHorizontal: 12 }}>
              <Ionicons name="chevron-back" size={24} color="#767E8C" />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable onPress={() => alert('Search pressed!')} style={{ paddingHorizontal: 12 }}>
              <Ionicons name="search" size={24} color="#767E8C" />
            </Pressable>
          ),
        }}
      />

      <View style={[styles.container, { paddingTop: insets.top + 8 }]}>

        {/* Calendar header row */}
        <View style={styles.calendarHeaderRow}>
          <TouchableOpacity
            style={styles.calendarDropdown}
            activeOpacity={0.7}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.currentDayText}>{dayjs(selectedDate).format('dddd')}</Text>
            <Ionicons name="chevron-down" size={20} color={PRIMARY_COLOR} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedDate(dayjs().format('YYYY-MM-DD'))}
            style={styles.todayButton}
          >
            <Text style={{ color: 'white' }}>Today</Text>
          </TouchableOpacity>
        </View>

        {/* Date picker modal */}
        {showDatePicker && (
          <DateTimePicker
            value={selectedDateObj}
            mode="date"
            display="default"
            onChange={onChangeDate}
            maximumDate={new Date(2100, 12, 31)}
            minimumDate={new Date(2000, 1, 1)}
          />
        )}

        {/* Calendar days row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 8, marginBottom: 8 }}
        >
          {weekDays.slice(0, 7).map((day) => {
            const isSelected = day === selectedDate;
            return (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayContainer,
                  isSelected && {
                    backgroundColor: PRIMARY_COLOR,
                    borderRadius: 8,
                  },
                ]}
                onPress={() => setSelectedDate(day)}
              >
                <Text style={[styles.dayName, isSelected && { color: '#fff' }]}>
                  {dayjs(day).format('ddd')}
                </Text>
                <Text style={[styles.dayNumber, isSelected && { color: '#fff' }]}>
                  {dayjs(day).format('D')}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Day and Reschedule row */}
        <View style={styles.dayRescheduleRow}>
          <Text style={styles.currentDayText}>{dayjs(selectedDate).format('dddd')}</Text>
          <Pressable onPress={() => alert('Reschedule pressed')}>
            <Text style={styles.rescheduleText}>Reschedule</Text>
          </Pressable>
        </View>

        <View style={styles.separator} />

        {/* Todo List */}
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTodoItem}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            loading ? (
              <View style={styles.center}>
                <ActivityIndicator color={PRIMARY_COLOR} size="small" />
                <Text style={{ color: SECONDARY_COLOR, marginTop: 6 }}>Loading tasks...</Text>
              </View>
            ) : 

 (
    <View style={styles.noTodoContainer}>
      <Text style={styles.noTodoText}>No todos for today</Text>
    </View>
  )
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flex: 1,
  },

  calendarHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 16,
  },

  calendarDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 20,
  },

  currentDayText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },

  todayButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dayContainer: {
    width: 50,
    alignItems: 'center',
    paddingVertical: 15,
    marginHorizontal: 4,
  },

  dayName: {
    color: SECONDARY_COLOR,
    fontSize: 12,
  },

  dayNumber: {
    fontSize: 18,
    fontWeight: '600',
    
  },

  dayRescheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    marginBottom: 8,
    alignItems: 'center',
  },
  noTodoContainer: {
  paddingVertical: 20,
  alignItems: 'center',
  justifyContent: 'center',
},
noTodoText: {
  fontSize: 16,
  color: '#888',
  fontStyle: 'italic',
},

  rescheduleText: {
    fontSize: 16,
    color: PRIMARY_COLOR,
    fontWeight: '600',
  },

  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },

  todoCard: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    width: screenWidth - 32,
  },

  todoItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  circle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: PRIMARY_COLOR,
    marginRight: 12,
  },

  todoTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
justifyContent:"space-between",
    marginBottom: 6,
    gap: 20,
  },
iconCountainer:{
flexDirection: 'row',
    alignItems: 'center',
    gap:8
}
,  timeText: {
    color: RED_COLOR,
    fontWeight: '600',
    fontSize: 14,
  },

  iconWithCount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  iconCount: {
    color: SECONDARY_COLOR,
    fontSize: 14,
  },

  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
  },

  dateText: {
    color: SECONDARY_COLOR,
    fontWeight: '500',
    fontSize: 14,
  },

  center: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
