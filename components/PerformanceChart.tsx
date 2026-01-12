import { dayLabels, performanceData } from '@/services/mockData';
import { Dimensions, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

export function PerformanceChart({ style, chartHeight = 160 }: { style?: StyleProp<ViewStyle>; chartHeight?: number }) {
  // Calculate internal dimensions based on total height
  // reserving 24px for bottom axis labels
  const chartAreaHeight = chartHeight - 24;

  // Estimate chart width (Screen width - container padding 40 - card padding 40)
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 80;

  // Generate Bezier Path using Catmull-Rom spline
  const getPath = () => {
    const data = performanceData.energy;
    const maxVal = 500;

    const points = data.map((val: number, index: number) => {
      const x = (index / (data.length - 1)) * chartWidth;
      const y = chartAreaHeight - (val / maxVal) * chartAreaHeight;
      return { x, y };
    });

    if (points.length === 0) return { d: '', points: [] };

    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || points[i + 1];

      // Catmull-Rom to Cubic Bezier conversion constants
      const tension = 0.3; // Lower tension = looser curve (worm-like), Higher = tighter

      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;

      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;

      d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`;
    }

    return { d, points };
  };

  const { d: pathData, points } = getPath();

  return (
    <View style={style}>
      {/* Header with Total Badge */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.subtext}>£2.7K saved</Text>
        </View>
        <View style={styles.totalBadge}>
          <Text style={styles.totalText}>124,186 kWh</Text>
        </View>
      </View>

      {/* Chart Container */}
      <View style={[styles.lineChartContainer, { height: chartHeight }]}>
        <View style={styles.lineChart}>
          {/* Grid lines (Vertical) */}
          <View style={[styles.gridLines, { bottom: 24 }]}>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <View key={i} style={[styles.gridLineVertical, { left: `${(i / 6) * 100}%` }]} />
            ))}
            <View style={[styles.dashedLine, { top: '30%' }]} />
          </View>

          {/* SVG Chart Layer */}
          <View style={[styles.svgContainer, { height: chartAreaHeight, width: chartWidth }]}>
            <Svg width={chartWidth} height={chartAreaHeight}>
              <Path
                d={pathData}
                stroke="#2E7D32"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {points.map((p: { x: number; y: number }, index: number) => (
                <Circle
                  key={index}
                  cx={p.x}
                  cy={p.y}
                  r="6"
                  fill="#2E7D32"
                  stroke="#fff"
                  strokeWidth="2"
                />
              ))}
            </Svg>
          </View>

          {/* X-axis labels */}
          <View style={styles.xAxisLabels}>
            {(dayLabels || []).map((label, index) => (
              <View key={index} style={{ alignItems: 'center', width: 40, marginLeft: -20, left: `${(index / 6) * 100}%`, position: 'absolute' }}>
                {index === 4 ? ( // Highlight "Oct" equivalent
                  <View style={styles.activeLabelContainer}>
                    <Text style={styles.xAxisLabelActive}>{label}</Text>
                  </View>
                ) : (
                  <Text style={styles.xAxisLabel}>{label}</Text>
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -10,
  },
  subtext: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  totalBadge: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  totalText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  lineChartContainer: {
    flexDirection: 'row',
    height: 160,
    marginBottom: 0,
  },
  lineChart: {
    flex: 1,
    position: 'relative',
    marginHorizontal: 16,
  },
  svgContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  gridLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 24,
  },
  gridLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  dashedLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    borderStyle: 'dashed',
  },
  xAxisLabels: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 24,
  },
  xAxisLabel: {
    fontSize: 12,
    color: '#666',
  },
  activeLabelContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  xAxisLabelActive: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
});
