declare module 'react-native-pure-chart' {
    import { Component } from 'react';
    import { ViewStyle } from 'react-native';

    interface ChartData {
        x: string;
        y: number;
        color?: string;
    }

    interface PureChartProps {
        data: ChartData[];
        type: 'line' | 'bar' | 'pie' | 'radar';
        height?: number;
        width?: number;
        style?: ViewStyle;
    }

    export default class PureChart extends Component<PureChartProps> {}
}
