import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function StoryboardScreen() {
  const [storyboards, setStoryboards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading storyboards
    setTimeout(() => {
      setStoryboards([
        {
          id: '1',
          title: 'Project Alpha - Act 1',
          scenes: 12,
          duration: '2:45',
          status: 'In Progress',
        },
        {
          id: '2',
          title: 'Project Beta - Scene 5',
          scenes: 8,
          duration: '1:30',
          status: 'Completed',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return '#10b981';
      case 'In Progress':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9fafb' }}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <ScrollView style={{ flex: 1 }}>
        {storyboards.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 48 }}>
            <Ionicons name="images-outline" size={64} color="#d1d5db" />
            <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 16, color: '#6b7280' }}>
              No Storyboards
            </Text>
            <Text style={{ fontSize: 14, color: '#9ca3af', marginTop: 8, textAlign: 'center', paddingHorizontal: 24 }}>
              Create storyboards from your projects
            </Text>
          </View>
        ) : (
          <View style={{ padding: 12 }}>
            {storyboards.map((storyboard) => (
              <TouchableOpacity
                key={storyboard.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
                }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937' }}>
                      {storyboard.title}
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 8, gap: 12 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Ionicons name="image" size={14} color="#6b7280" />
                        <Text style={{ fontSize: 12, color: '#6b7280' }}>
                          {storyboard.scenes} scenes
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Ionicons name="time" size={14} color="#6b7280" />
                        <Text style={{ fontSize: 12, color: '#6b7280' }}>
                          {storyboard.duration}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        marginTop: 8,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        backgroundColor: `${getStatusColor(storyboard.status)}15`,
                        borderRadius: 4,
                        alignSelf: 'flex-start',
                      }}
                    >
                      <Text style={{ fontSize: 11, fontWeight: '600', color: getStatusColor(storyboard.status) }}>
                        {storyboard.status}
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="#d1d5db" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
