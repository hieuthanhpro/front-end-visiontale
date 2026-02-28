import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { projectAPI } from '@/services/api/projectAPI';

export default function ProjectDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'scenes' | 'settings'>('overview');

  useEffect(() => {
    if (id) {
      fetchProjectDetail();
    }
  }, [id]);

  const fetchProjectDetail = async () => {
    try {
      setLoading(true);
      const data = await projectAPI.getProject(id!);
      setProject(data);
    } catch (err) {
      console.error('Failed to fetch project:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!project) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, color: '#6b7280' }}>Project not found</Text>
      </View>
    );
  }

  const tabs = ['overview', 'scenes', 'settings'] as const;

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Tab Navigation */}
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e5e7eb', backgroundColor: '#ffffff' }}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{
                flex: 1,
                paddingVertical: 12,
                paddingHorizontal: 12,
                borderBottomWidth: activeTab === tab ? 2 : 0,
                borderBottomColor: activeTab === tab ? '#2563eb' : 'transparent',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: activeTab === tab ? '600' : '400',
                  color: activeTab === tab ? '#2563eb' : '#6b7280',
                  textTransform: 'capitalize',
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        {activeTab === 'overview' && (
          <View style={{ padding: 12 }}>
            <View style={{ backgroundColor: '#ffffff', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e5e7eb' }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937' }}>
                {project.name}
              </Text>
              <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 8 }}>
                {project.description}
              </Text>

              <View style={{ marginTop: 16, gap: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>Created</Text>
                  <Text style={{ fontSize: 12, fontWeight: '500', color: '#1f2937' }}>
                    {new Date(project.createdAt).toLocaleDateString()}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>Updated</Text>
                  <Text style={{ fontSize: 12, fontWeight: '500', color: '#1f2937' }}>
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>Status</Text>
                  <View
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      backgroundColor: '#dbeafe',
                      borderRadius: 4,
                    }}
                  >
                    <Text style={{ fontSize: 11, fontWeight: '600', color: '#2563eb' }}>
                      Active
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Actions */}
            <View style={{ gap: 8 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#2563eb',
                  borderRadius: 8,
                  padding: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                <Ionicons name="play" size={20} color="#ffffff" />
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#ffffff' }}>
                  Continue Editing
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 8,
                  padding: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
                }}
              >
                <Ionicons name="share-social" size={20} color="#2563eb" />
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#2563eb' }}>
                  Share
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeTab === 'scenes' && (
          <View style={{ padding: 12 }}>
            <Text style={{ fontSize: 14, color: '#6b7280', textAlign: 'center', marginVertical: 24 }}>
              Scenes will appear here
            </Text>
          </View>
        )}

        {activeTab === 'settings' && (
          <View style={{ padding: 12 }}>
            <View style={{ backgroundColor: '#ffffff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e5e7eb' }}>
              <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#1f2937' }}>
                  Rename Project
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
              </TouchableOpacity>

              <View style={{ borderTopWidth: 1, borderTopColor: '#e5e7eb' }}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 }}>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: '#1f2937' }}>
                    Delete Project
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
