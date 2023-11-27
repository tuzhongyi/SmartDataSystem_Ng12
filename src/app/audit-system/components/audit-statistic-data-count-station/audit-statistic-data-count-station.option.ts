// export let ChartPieData: IChartPieData[] = [];
let color = ['#3184e3', '#ef6464', '#fde546'];
export let ChartPieOption: echarts.EChartsOption = {
  color: color,
  tooltip: {
    trigger: 'item',
    position: ['50%', '50%'],
  },
  title: {
    right: 'center',
  },
  legend: {
    show: false,
    top: 'center',
    right: '5%',
    orient: 'vertical',
    itemStyle: {
      opacity: 0,
    },
    textStyle: {
      height: 60,
      rich: {
        name: {
          fontSize: 16,
          color: '#99aaff',
          padding: [0, 0, 10, 0], //上右下左
        },
        value0: {
          fontSize: 24,
          padding: [0, 0, 0, 0], //上右下左
          color: color[0],
        },
        value1: {
          fontSize: 24,
          padding: [0, 0, 0, 0], //上右下左
          color: color[1],
        },
        value2: {
          fontSize: 24,
          padding: [0, 0, 0, 0], //上右下左
          color: color[2],
        },
      },
    },
    formatter: (name: string) => {
      return name;
      // let index = ChartPieData.findIndex((x) => x.name === name);
      // let data = ChartPieData[index];

      // return [`{name|${name}}`, `{value${index}|${data.value}}`].join('\n');
    },
  },
  label: {
    show: false,
  },
  series: [
    {
      type: 'pie',
      radius: ['56%', '66%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
      },
      emphasis: {
        label: {
          show: false,
        },
      },
      labelLine: {
        show: false,
      },
      data: [],
    },
    {
      type: 'pie',
      radius: ['30%', '40%'],
      avoidLabelOverlap: false,
      cursor: 'default',
      itemStyle: {
        opacity: 0.3,
      },
      label: {
        show: false,
      },
      emphasis: {
        disabled: true,
      },
      labelLine: {
        show: false,
      },
      tooltip: {
        show: false,
      },
      data: [],
    },
    {
      type: 'pie',
      radius: ['43%', '53%'],
      avoidLabelOverlap: false,
      cursor: 'default',
      itemStyle: {
        opacity: 0.7,
      },
      label: {
        show: false,
      },
      emphasis: {
        disabled: true,
      },
      labelLine: {
        show: false,
      },
      tooltip: {
        show: false,
      },
      data: [],
    },
  ],
};
