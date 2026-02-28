import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useProjectStore } from '@/stores/projectStore';

const CreateTemplates = [
  { id: 'blank', name: 'Blank Project', icon: 'file-document-outline' },
  { id: 'tutorial', name: 'Tutorial Video', icon: 'play-circle-outline' },
  { id: 'slideshow', name: 'Slideshow', icon: 'presentation-play' },
  { id: 'story', name: 'Story', icon: 'book-open' },
];

export default function CreateScreen() {
  const [projectName, setProjectName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  const [loading, setLoading] = useState(false);
  const { createProject } = useProjectStore();

  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      Alert.alert('Error', 'Please enter a project name');
      return;
    }

    setLoading(true);
    try {
      const newProject = await createProject({
        name: projectName,
        template: selectedTemplate,
      });
      router.replace(`/project/${newProject.id}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f9fafb' }} contentContainerStyle={{ padding: 16 }}>
      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 8 }}>
          Project Name
        </Text>
        <TextInput
          placeholder="Enter project name"
          value={projectName}
          onChangeText={setProjectName}
          editable={!loading}
          style={{
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#e5e7eb',
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            color: '#1f2937',
          }}
          placeholderTextColor="#9ca3af"
        />
      </View>

      <View style={{ marginBottom: 24 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 12 }}>
          Choose Template
        </Text>
        <View style={{ gap: 8 }}>
          {CreateTemplates.map((template) => (
            <TouchableOpacity
              key={template.id}
              style={{
                backgroundColor: selectedTemplate === template.id ? '#eef2ff' : '#fff',
                borderWidth: 2,
                borderColor: selectedTemplate === template.id ? '#6366f1' : '#e5e7eb',
                borderRadius: 8,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
              }}
              onPress={() => setSelectedTemplate(template.id)}
              disabled={loading}
            >
              <MaterialCommunityIcons
                name={template.icon}
                size={24}
                color={selectedTemplate === template.id ? '#6366f1' : '#9ca3af'}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: selectedTemplate === template.id ? '#6366f1' : '#1f2937',
                  }}
                >
                  {template.name}
                </Text>
              </View>
              {selectedTemplate === template.id && (
                <MaterialCommunityIcons name="check-circle" size={20} color="#6366f1" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#6366f1',
          borderRadius: 8,
          paddingVertical: 14,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: loading ? 0.6 : 1,
        }}
        onPress={handleCreateProject}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <MaterialCommunityIcons name="plus" size={20} color="#fff" />
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>Create Project</Text>
          </View>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
