import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  const handleClose = () => {
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: '#ffffff',
            borderBottomWidth: 1,
            borderBottomColor: '#e5e7eb',
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1f2937' }}>
            Settings
          </Text>
          <TouchableOpacity onPress={handleClose}>
            <Ionicons name="close" size={24} color="#1f2937" />
          </TouchableOpacity>
        </View>

        {/* Preferences Section */}
        <View style={{ paddingHorizontal: 12, paddingVertical: 12 }}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', marginBottom: 8, paddingHorizontal: 4 }}>
            Preferences
          </Text>

          <View style={{ backgroundColor: '#ffffff', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', overflow: 'hidden' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#1f2937' }}>
                  Notifications
                </Text>
                <Text style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
                  Receive project updates
                </Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#d1d5db', true: '#86efac' }}
                thumbColor={notifications ? '#22c55e' : '#f3f4f6'}
              />
            </View>

            <View style={{ borderTopWidth: 1, borderTopColor: '#e5e7eb' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: '#1f2937' }}>
                    Auto-save
                  </Text>
                  <Text style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
                    Save changes automatically
                  </Text>
                </View>
                <Switch
                  value={autoSave}
                  onValueChange={setAutoSave}
                  trackColor={{ false: '#d1d5db', true: '#86efac' }}
                  thumbColor={autoSave ? '#22c55e' : '#f3f4f6'}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Appearance Section */}
        <View style={{ paddingHorizontal: 12, paddingVertical: 12 }}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', marginBottom: 8, paddingHorizontal: 4 }}>
            Appearance
          </Text>

          <View style={{ backgroundColor: '#ffffff', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', overflow: 'hidden' }}>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#1f2937' }}>
                  Language
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 14, color: '#6b7280' }}>English</Text>
                <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
              </View>
            </TouchableOpacity>

            <View style={{ borderTopWidth: 1, borderTopColor: '#e5e7eb' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: '#1f2937' }}>
                    Dark Mode
                  </Text>
                  <Text style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
                    Coming soon
                  </Text>
                </View>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: '#d1d5db', true: '#86efac' }}
                  thumbColor={darkMode ? '#22c55e' : '#f3f4f6'}
                  disabled
                />
              </View>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={{ paddingHorizontal: 12, paddingVertical: 12 }}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', marginBottom: 8, paddingHorizontal: 4 }}>
            About
          </Text>

          <View style={{ backgroundColor: '#ffffff', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', overflow: 'hidden' }}>
            <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                <Text style={{ fontSize: 14, color: '#6b7280' }}>Version</Text>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1f2937' }}>1.0.0</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 14, color: '#6b7280' }}>Build</Text>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#1f2937' }}>2024.01.01</Text>
              </View>
            </View>

            <View style={{ borderTopWidth: 1, borderTopColor: '#e5e7eb' }}>
              <TouchableOpacity style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#2563eb' }}>
                  Check for Updates
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Legal */}
        <View style={{ paddingHorizontal: 12, paddingVertical: 12 }}>
          <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
            <TouchableOpacity>
              <Text style={{ fontSize: 12, color: '#2563eb', fontWeight: '500' }}>
                Terms of Service
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 12, color: '#d1d5db' }}>•</Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 12, color: '#2563eb', fontWeight: '500' }}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
