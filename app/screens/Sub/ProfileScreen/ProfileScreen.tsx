import React from 'react'
import { View } from 'react-native'

import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js'
import { observer } from 'mobx-react-lite'
import { Radar } from 'react-chartjs-2'

import { Screen, Text } from 'app/components'
import { ScreenTypes, SubStackScreenProps } from 'app/navigators'
import { useRenderCount } from 'app/utils'

import useProfile from './useProfile'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

export const ProfileScreen: React.FC<SubStackScreenProps<ScreenTypes.PROFILE>> = observer(
  function Profile(_props) {
    const { colors, styles } = useProfile()
    useRenderCount('ProfileScreen')

    const radarData = {
      datasets: [
        {
          backgroundColor: colors.background,
          borderColor: colors.accent,
          borderWidth: 1,
          data: [
            40, 95, 30, 50, 70, 80, 20, 90, 75, 85, 65, 55, 45, 35, 25, 15, 50, 95, 65, 45, 85, 75,
            55, 35, 50, 25, 65, 75, 85, 95, 20,
          ],
          fill: true,
          label: 'My Skills',
          tension: 0,
        },
      ],
      labels: [
        'Speed',
        'Strength',
        'Endurance',
        'Agility',
        'Flexibility',
        'Coordination',
        'Reaction Time',
        'Balance',
        'Stamina',
        'Power',
        'Mental Toughness',
        'Speed Endurance',
        'Strength Endurance',
        'Plyometrics',
        'Speed Agility',
        'Explosive Power',
        'Muscular Endurance',
        'Aerobic Capacity',
        'Body Composition',
        'Functional Strength',
        'Core Strength',
        'Mobility',
        'Recovery',
        'Nutrition',
        'Hydration',
        'Injury Prevention',
        'Mental Focus',
        'Skill',
        'Technique',
        'Game Sense',
        'Strategic Thinking',
      ],
    }

    return (
      <Screen
        contentContainerStyle={styles.container}
        preset="auto"
        safeAreaEdges={['top', 'bottom']}>
        <View style={styles.container}>
          <Text textAlign="center" weight="bold" size="xl4">
            {'Test User'}
          </Text>
          <Text textAlign="center">{`'Test Biography yaaay'}`}</Text>
          <Text textAlign="center">{`'Software Developer in LA'}`}</Text>
        </View>

        <View style={styles.radarContainer}>
          <Radar
            data={radarData}
            options={{
              plugins: {
                legend: {
                  display: false, // This line hides the legend
                },
              },
              responsive: true,
              scales: {
                r: {
                  angleLines: {
                    display: true,
                  },
                  suggestedMax: 100,
                  suggestedMin: 0,
                  ticks: {
                    display: false,
                  },
                },
              },
            }}
            width={200}
            height={200}
          />
        </View>
      </Screen>
    )
  },
)
