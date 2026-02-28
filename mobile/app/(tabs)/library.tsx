import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { entityAPI } from '@/services/api/entityAPI';

type EntityType = 'character' | 'location' | 'prop' | 'effect';

export default function LibraryScreen() {
  const [activeTab, setActiveTab] = useState<EntityType>('character');
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchEntities(activeTab);
  }, [activeTab]);

  const fetchEntities = async (type: EntityType) => {
    try {
      setLoading(true);
      const data = await entityAPI.getEntities(type);
      setEntities(data);
    } catch (err) {
      console.error('Failed to fetch entities:', err);
    } finally {
      setLoading(false);
    }
  };

  const entityTabs: EntityType[] = ['character', 'location', 'prop', 'effect'];
  const entityIcons = {
    character: 'person',
    location: 'location',
    prop: 'cube',
    effect: 'sparkles',
  };

  const filteredEntities = entities.filter((entity) =>
    entity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f9fafb' }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Tab Navigation */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ borderBottomWidth: 1, borderBottomColor: '#e5e7eb' }}
        >
          <View style={{ flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 0 }}>
            {entityTabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderBottomWidth: activeTab === tab ? 2 : 0,
                  borderBottomColor: activeTab === tab ? '#2563eb' : 'transparent',
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
                  {tab}s
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Search Bar */}
        <View style={{ padding: 12 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              borderRadius: 8,
              paddingHorizontal: 12,
              borderWidth: 1,
              borderColor: '#e5e7eb',
            }}
          >
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
              placeholder="Search..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{
                flex: 1,
                paddingHorizontal: 8,
                paddingVertical: 10,
                fontSize: 14,
              }}
            />
          </View>
        </View>

        {/* Content */}
        {loading ? (
          <View style={{ paddingVertical: 48, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#2563eb" />
          </View>
        ) : filteredEntities.length === 0 ? (
          <View style={{ paddingVertical: 48, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name={entityIcons[activeTab]} size={48} color="#d1d5db" />
            <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 16, color: '#6b7280' }}>
              No {activeTab}s found
            </Text>
          </View>
        ) : (
          <View style={{ padding: 12 }}>
            {filteredEntities.map((entity) => (
              <TouchableOpacity
                key={entity.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    backgroundColor: '#f3f4f6',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 12,
                  }}
                >
                  <Ionicons name={entityIcons[activeTab]} size={24} color="#6b7280" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#1f2937' }}>
                    {entity.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>
                    {entity.category || 'Uncategorized'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
