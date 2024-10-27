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
import { Radar } from 'react-chartjs-2'

import { translate } from 'app/i18n'
import { PreferencesResult } from 'app/services'
import { Palette, sizing, typography } from 'app/theme'
import { logger, scaleHeight, scaleWidth } from 'app/utils'

// Register the chart elements globally
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

interface RadarChartProps {
  width?: number
  height?: number
  colors: Palette
  weightedPreferences: PreferencesResult[]
}

const RadarChart: React.FC<RadarChartProps> = ({
  colors,
  height = scaleHeight(450),
  weightedPreferences,
  width = scaleWidth(450),
}) => {
  const radarOptions = {
    animation: {
      duration: 1000,
      easing: 'easeOutCubic' as const,
    },
    hover: {
      animationDuration: 400,
      intersect: true,
      mode: 'nearest' as const,
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: colors.background,
        bodyColor: colors.text,
        bodyFont: { size: 12 },
        cornerRadius: sizing.radius.lg,
        enabled: true,
        padding: sizing.spacing.xs,
        titleColor: colors.text,
        titleFont: { size: typography.fontSize.md, weight: 'bold' },
      },
    },
    responsive: true,
    scales: {
      r: {
        angleLines: {
          color: colors.transparent,
        },
        grid: {
          color: colors.backgroundSecondary,
        },
        pointLabels: {
          color: colors.text,
          font: {
            size: typography.fontSize.sm,
            weight: 'light',
          },
        },
        suggestedMax: 100,
        suggestedMin: 0,
        ticks: {
          display: false,
        },
      },
    },
  }
  logger.log(weightedPreferences)

  const radarData = {
    datasets: [
      {
        backgroundColor: `${colors.accent}22`,
        borderColor: colors.accent,
        borderWidth: 1,
        data: weightedPreferences.map(pref => pref.weight),
        fill: true,
        label: translate('common.skill'),
        pointBackgroundColor: colors.accent,
        pointBorderColor: colors.background,
        pointBorderWidth: 2,
        pointHoverBackgroundColor: colors.accent,
        pointHoverBorderColor: colors.background,
        pointHoverBorderWidth: 1,
        pointHoverRadius: 5,
        tension: 0.5,
      },
    ],
    labels: weightedPreferences.map(pref => pref.preference),
  }

  return (
    <View style={{ height, width }}>
      <Radar data={radarData} options={radarOptions as any} width={width} height={height} />
    </View>
  )
}

export default RadarChart
