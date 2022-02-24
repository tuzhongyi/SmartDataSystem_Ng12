export let option = {
  animation: false,
  tooltip: {
    trigger: 'axis',
    formatter: '{b}',
    axisPointer: {
      lineStyle: {
        color: '#5e6ebf',
        width: 1.2,
      },
    },
  },
  visualMap: {
    show: false,
    type: 'piecewise',
    pieces: [
      {
        gt: 0.005,
        lte: 1,
        color: '#CD661D',
      },
      {
        gte: 0,
        lte: 0.005,
        color: '#28ce38',
      },
    ],
    seriesIndex: 0,
  },
  grid: [
    {
      top: 20,
      left: '40px',
      right: '60px',
      height: '60%',
    },
    {
      left: '40px',
      right: '60px',
      top: '74%',
      height: '10%',
    },
  ],
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none',
      },
      restore: {},
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    minInterval: 1 * 1000 * 60,
    data: [],
    axisLine: { onZero: true },
  },
  yAxis: {
    show: false,
    type: 'value',
    boundaryGap: [0, '100%'],
  },
  dataZoom: [
    {
      type: 'inside',
      xAxisIndex: [0, 1],
      start: 0,
      end: 100,
    },
    {
      show: true,
      xAxisIndex: [0, 1],
      type: 'slider',
      top: '84%',
      start: 0,
      end: 100,
      fillerColor: 'rgb(117,134,224,0.5)',
      borderColor: '#5e6ebf',
      textStyle: {
        color: '#CFD7FE',
        fontSize: '16',
      },
    },
  ],
  series: [
    {
      type: 'line',
      smooth: false,
      step: 'end',
      symbol: 'emptyCircle',
      symbolSize: 8,
      data: [],
    },
  ],
};
