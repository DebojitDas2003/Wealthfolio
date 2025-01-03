import { Tabs } from 'expo-router'
import React from 'react'
import { Platform, Image, View } from 'react-native'

import { HapticTab } from '@/components/HapticTab'
import { IconSymbol } from '@/components/ui/IconSymbol'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { useColorScheme } from '@/hooks/useColorScheme'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarShowLabel: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            backgroundColor: '#d4f5d4',
            borderTopWidth: 0,
          },
          default: {
            backgroundColor: '#d4f5d4',
            borderTopWidth: 0,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="TransactionsScreen"
        options={{
          title: 'Transaction',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={28} name="history" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AIScreen"
        options={{
          title: 'AI',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: '#D1FFD6', // Blue background layer
                width: 60, // Size larger than the PNG
                height: 60,
                borderRadius: 30, // Circle around the image
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5, // Add some space for the image
                marginBottom: 20, // Apply different margin based on selection
              }}
            >
              <View
                style={{
                  backgroundColor: '#1E1F4B', // Blue background layer
                  width: 50, // Size larger than the PNG
                  height: 50,
                  borderRadius: 25, // Circle around the image
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 5, // Add some space for the image
                }}
              >
                <Image
                  source={require('@/assets/images/ai.png')}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7, // Center the PNG inside the blue circle
                  }}
                />
              </View>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="InsightsScreen"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={28}
              name="chart-donut"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="UserProfileScreen"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={28}
              name="account-circle"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}
