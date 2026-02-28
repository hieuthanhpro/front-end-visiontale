import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();

  const menuItems = [
    { icon: 'settings', label: 'Settings', onPress: () => router.push('/settings') },
    { icon: 'help-circle', label: 'Help & Support', onPress: () => {} },
    { icon: 'information-circle', label: 'About', onPress: () => {} },
    { icon: 'log-out', label: 'Logout', onPress: () => {} },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Profile Header */}
        <View
          style={{
            backgroundColor: '#ffffff',
            padding: 24,
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#e5e7eb',
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: '#2563eb',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <Ionicons name="person" size={40} color="#ffffff" />
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1f2937' }}>
            User Profile
          </Text>
          <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>
            user@example.com
          </Text>
        </View>

        {/* Stats */}
        <View style={{ flexDirection: 'row', padding: 12, gap: 12 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#e5e7eb',
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2563eb' }}>
              5
            </Text>
            <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
              Projects
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#e5e7eb',
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#10b981' }}>
              12
            </Text>
            <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
              Videos
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: 12,
              padding: 16,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#e5e7eb',
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#f59e0b' }}>
              24
            </Text>
            <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
              Hours
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                padding: 16,
                marginBottom: 8,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#e5e7eb',
              }}
            >
              <Ionicons name={item.icon} size={24} color="#2563eb" />
              <Text style={{ fontSize: 16, fontWeight: '500', color: '#1f2937', marginLeft: 16, flex: 1 }}>
                {item.label}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Version Info */}
        <View style={{ padding: 16, justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
          <Text style={{ fontSize: 12, color: '#9ca3af' }}>
            VisionTale Mobile v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
