import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';

import RingkasanScreen from './screens/RingkasanScreen';
import PertemuanScreen from './screens/PertemuanScreen';
import JadwalScreen from './screens/JadwalScreen';

// ─── Tab Param List ──────────────────────────────────────────

type RootTabParamList = {
  Ringkasan: undefined;
  Pertemuan: undefined;
  Jadwal: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

// ─── Helpers ─────────────────────────────────────────────────

function getTabColor(routeName: keyof RootTabParamList): string {
  switch (routeName) {
    case 'Ringkasan': return '#4A90D9';
    case 'Pertemuan': return '#7B61FF';
    case 'Jadwal':    return '#2ECC71';
    default:          return '#555';
  }
}

function getTabIcon(routeName: keyof RootTabParamList, focused: boolean): string {
  switch (routeName) {
    case 'Ringkasan': return focused ? '📚' : '📖';
    case 'Pertemuan': return focused ? '📋' : '📄';
    case 'Jadwal':    return focused ? '📅' : '🗓️';
    default:          return '•';
  }
}

// ─── App ─────────────────────────────────────────────────────

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }): BottomTabNavigationOptions => ({
          headerShown: false,
          tabBarActiveTintColor: getTabColor(route.name),
          tabBarInactiveTintColor: '#AAA',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#EEE',
            height: 60,
            paddingBottom: 8,
            paddingTop: 4,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 22 }}>
              {getTabIcon(route.name, focused)}
            </Text>
          ),
        })}
      >
        <Tab.Screen
          name="Ringkasan"
          component={RingkasanScreen}
          options={{ tabBarLabel: 'Matkul' }}
        />
        <Tab.Screen
          name="Pertemuan"
          component={PertemuanScreen}
          options={{ tabBarLabel: 'Pertemuan' }}
        />
        <Tab.Screen
          name="Jadwal"
          component={JadwalScreen}
          options={{ tabBarLabel: 'Jadwal' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
