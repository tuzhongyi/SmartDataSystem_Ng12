export let AuditListStationGarbageManagerTrashcanItemOption: echarts.EChartsOption =
  {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: '#464646',
          },
        },
        axisLine: {
          lineStyle: {
            width: 10,
          },
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        data: [],
        title: {
          show: false,
        },
        detail: {
          width: 50,
          height: 14,
          fontSize: 14,
          color: 'inherit',
          formatter: '{value}%',
        },
      },
    ],
  };
