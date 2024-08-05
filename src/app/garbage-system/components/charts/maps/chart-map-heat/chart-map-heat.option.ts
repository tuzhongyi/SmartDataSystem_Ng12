export const ChartMapHeatOption: any = {
  tooltip: {
    position: 'top',
  },
  grid: {
    height: '91.5%',
    top: 50,
    left: 240,
  },
  xAxis: {
    position: 'top',
    type: 'category',
    data: [],
    splitArea: {
      show: true,
    },
    axisLabel: {
      interval: 0,
      rich: {
        weekend: {
          color: '#ff0000',
          fontSize: 14,
          borderWidth: 0,
        },
        weekday: {
          color: '#ccc',
          fontSize: 14,
          borderWidth: 0,
        },
      },
    },
    axisLine: {
      lineStyle: {
        width: 2,
      },
    },
  },
  yAxis: {
    type: 'category',
    inverse: true,
    data: [],
    axisLabel: {
      color: '#ccc',
      fontSize: 14,
      borderWidth: 0,
    },
    axisLine: {
      lineStyle: {
        width: 3,
      },
    },
    splitArea: {
      show: true,
    },
  },
  visualMap: {
    min: 0,
    max: 110,
    calculable: true,
    left: '0',
    bottom: '0',
    inRange: {
      color: [
        //'#0c1127',

        '#13224d',

        '#2d62cd',

        '#51b0c4',

        '#5ec468',

        //'#ffba00',

        '#ff8441',

        '#ca3131',
      ],
    },
  },
  series: [
    {
      name: 'Punch Card',
      type: 'heatmap',
      coordinateSystem: 'cartesian2d',
      data: [],
      label: {
        show: true,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};
