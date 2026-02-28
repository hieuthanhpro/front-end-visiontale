import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { projectAPI } from '@/services/api/projectAPI';
import { useProjectStore } from '@/stores/projectStore';

export default function ProjectsScreen() {
  const router = useRouter();
  const { projects, loading, setProjects, setLoading } = useProjectStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectAPI.getProjects();
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = () => {
    router.push('/project/new');
  };

  const handleProjectPress = (projectId: string) => {
    router.push(`/project/${projectId}`);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <ScrollView style={{ flex: 1 }}>
        {error && (
          <View style={{ backgroundColor: '#fee2e2', padding: 12, margin: 12, borderRadius: 8 }}>
            <Text style={{ color: '#dc2626' }}>{error}</Text>
          </View>
        )}

        {projects.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 48 }}>
            <Ionicons name="film-outline" size={64} color="#d1d5db" />
            <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 16, color: '#6b7280' }}>
              No Projects
            </Text>
            <Text style={{ fontSize: 14, color: '#9ca3af', marginTop: 8, textAlign: 'center', paddingHorizontal: 24 }}>
              Create your first project to get started with video generation
            </Text>
          </View>
        ) : (
          <View style={{ padding: 12 }}>
            {projects.map((project) => (
              <TouchableOpacity
                key={project.id}
                onPress={() => handleProjectPress(project.id)}
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
                      {project.name}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
                      {project.description || 'No description'}
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 8, gap: 16 }}>
                      <Text style={{ fontSize: 12, color: '#9ca3af' }}>
                        Updated: {new Date(project.updatedAt).toLocaleDateString()}
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

      <TouchableOpacity
        onPress={handleCreateProject}
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          backgroundColor: '#2563eb',
          borderRadius: 50,
          width: 56,
          height: 56,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <Ionicons name="add" size={28} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}
