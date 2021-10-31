series: [
  {
    startAngle: 240,
    endAngle: -60,
    radius: "70%",
    type: 'gauge',
    progress: {
      show: true,
      width: 18,
      overlap: false,
      roundCap: false,
      clip: false,
      itemStyle: {
        borderWidth: 8,
        borderColor: "#3a93ff",
      },
    },
    pointer: {
      show: false,
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        width: 5,
        color: [[1, "#6b7199"]],
      },
    },
    splitLine: {
      show: false,
    },
    anchor: {
      show: false,

    },
    detail: {
      valueAnimation: true,
      fontSize: 80,
      offsetCenter: [0, '70%']
    },
    data: [
      {
        value: 70,
        name: '处置率',
        title: {
          offsetCenter: ["0%", "30%"]
        },
        detail: {
          fontSize: 20,
          valueAnimation: true,
          offsetCenter: ["0%", "0%"],
          formatter: '{value}%'
        }
      }
    ]
  }
],
