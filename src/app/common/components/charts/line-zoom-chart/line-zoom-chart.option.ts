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
        gt: 0.01,
        lte: 1,
        color: '#CD661D',
      },
      {
        gte: 0.0000000000000000000000001,
        lte: 0.01,
        color: '#28ce38',
      },
      {
        gte: -1,
        lte: 0,
        color: '#cccccc',
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
  xAxis: {
    type: 'category',
    boundaryGap: false,
    minInterval: 1 * 1000 * 60,
    data: [],
    axisLine: { onZero: true },
    axisLabel: {
      color: '#CFD7FE',
      fontSize: '16',
      margin: -5,
      formatter: function (value: any, index: number) {
        return value;
      },
    },
  },
  yAxis: {
    show: false,
    type: 'value',
    boundaryGap: [0, '100%'],
    max: 1.1,
    min: -0.1,
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
    {
      symbolSize: 15,
      data: [],
      type: 'scatter',
      symbol: 'image://assets/img/arrow-tag.png',
      symbolKeepAspect: true,
      select: {},
      symbolOffset: [0, 25],
    },
  ],
};
