import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  FAB,
  Chip,
  Text,
  Button,
  IconButton,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const {user} = useSelector((state: RootState) => state.auth);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Refresh data
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const quickActions = [
    {id: '1', title: 'Ask AI Assistant', icon: 'robot', action: () => {}},
    {id: '2', title: 'View Schedule', icon: 'calendar', action: () => {}},
    {id: '3', title: 'Campus Map', icon: 'map', action: () => {}},
    {id: '4', title: 'Join Study Group', icon: 'account-group', action: () => {}},
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'Computer Science Seminar',
      time: '2:00 PM - 4:00 PM',
      location: 'Room 301',
      type: 'academic',
    },
    {
      id: '2',
      title: 'Basketball Game',
      time: '6:00 PM - 8:00 PM',
      location: 'Sports Complex',
      type: 'sports',
    },
  ];

  const assignments = [
    {
      id: '1',
      title: 'Data Structures Assignment',
      course: 'CS 201',
      dueDate: 'Tomorrow',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Physics Lab Report',
      course: 'PHY 101',
      dueDate: 'Friday',
      priority: 'medium',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Welcome Section */}
        <Card style={styles.welcomeCard}>
          <Card.Content>
            <Title>Welcome back, {user?.full_name || 'Student'}!</Title>
            <Paragraph>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Quick Actions */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Quick Actions</Title>
            <View style={styles.quickActions}>
              {quickActions.map((action) => (
                <View key={action.id} style={styles.quickAction}>
                  <IconButton
                    icon={action.icon}
                    size={30}
                    onPress={action.action}
                    style={styles.quickActionButton}
                  />
                  <Text style={styles.quickActionText}>{action.title}</Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        {/* Upcoming Events */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Today's Events</Title>
            {upcomingEvents.map((event) => (
              <View key={event.id} style={styles.eventItem}>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDetails}>
                    {event.time} • {event.location}
                  </Text>
                </View>
                <Chip
                  mode="outlined"
                  style={[
                    styles.eventChip,
                    event.type === 'academic' ? styles.academicChip : styles.sportsChip,
                  ]}>
                  {event.type}
                </Chip>
              </View>
            ))}
            <Button mode="outlined" style={styles.viewAllButton}>
              View All Events
            </Button>
          </Card.Content>
        </Card>

        {/* Assignments Due */}
        <Card style={styles.card}>
          <Card.Content>
            <Title>Assignments Due</Title>
            {assignments.map((assignment) => (
              <View key={assignment.id} style={styles.assignmentItem}>
                <View style={styles.assignmentInfo}>
                  <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                  <Text style={styles.assignmentCourse}>
                    {assignment.course} • Due {assignment.dueDate}
                  </Text>
                </View>
                <Chip
                  mode="outlined"
                  style={[
                    styles.priorityChip,
                    assignment.priority === 'high'
                      ? styles.highPriority
                      : styles.mediumPriority,
                  ]}>
                  {assignment.priority}
                </Chip>
              </View>
            ))}
            <Button mode="outlined" style={styles.viewAllButton}>
              View All Assignments
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        icon="message"
        style={styles.fab}
        onPress={() => {
          // Navigate to AI Assistant
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  welcomeCard: {
    margin: 16,
    marginBottom: 8,
  },
  card: {
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  quickAction: {
    alignItems: 'center',
    width: '22%',
    marginBottom: 16,
  },
  quickActionButton: {
    backgroundColor: '#e3f2fd',
  },
  quickActionText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  eventChip: {
    marginLeft: 8,
  },
  academicChip: {
    backgroundColor: '#e8f5e8',
  },
  sportsChip: {
    backgroundColor: '#fff3e0',
  },
  assignmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  assignmentCourse: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  priorityChip: {
    marginLeft: 8,
  },
  highPriority: {
    backgroundColor: '#ffebee',
  },
  mediumPriority: {
    backgroundColor: '#fff8e1',
  },
  viewAllButton: {
    marginTop: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;
