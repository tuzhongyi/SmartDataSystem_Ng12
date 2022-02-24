let xAxisLine = new Array();
let xAxisBar = new Array();
let lineData = new Array();
let lineDataB = new Array();
let barData = new Array();

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
  xAxis: [
    {
      type: 'category',
      data: xAxisLine,
      scale: true,
      boundaryGap: false,
      axisLine: {
        onZero: false,
        lineStyle: {
          color: '#7d90bc',
        },
      },
      splitLine: {
        lineStyle: {
          color: 'rgb(117,134,224,0.3)',
        },
      },
      min: 'dataMin',
      max: 'dataMax',
      axisLabel: {
        color: '#CFD7FE',
        fontSize: '16',
      },
      axisTick: {
        //刻度线

        lineStyle: {
          color: 'rgb(117,134,224,0.3)',
        },
      },
    },
    {
      type: 'category',
      gridIndex: 1,
      data: xAxisBar,
      scale: true,
      boundaryGap: false,
      axisLine: { show: false, onZero: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisPointer: {
        show: true,
        type: 'none',
      },

      min: 'dataMin',
      max: 'dataMax',

      axisLabel: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      scale: true,
      splitArea: {
        show: false,
      },
      axisTick: {
        //刻度线
        show: false,
      },

      axisLine: {
        show: false,
        onZero: false, //y轴
        lineStyle: {
          color: '#7d90bc',
        },
      },
      axisLabel: {
        color: '#CFD7FE',
        fontSize: '16',
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: 'rgb(117,134,224,0.3)',
        },
      },
    },
    {
      scale: true,
      gridIndex: 1,
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisPointer: {
        show: false,
      },
    },
  ],
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
      name: 'theLine',
      type: 'line',
      data: lineData,
      step: 'end',
      symbolSize: 8,
    },
    {
      name: 'theLineB',
      type: 'line',
      data: lineDataB,
      symbolSize: 8,
      itemStyle: {
        color: 'gray',
      },
    },
    {
      name: 'theBar',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: barData,
    },
  ],
};
