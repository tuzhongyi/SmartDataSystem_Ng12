export const ChartBar3DOption: any = {
  tooltip: {},
  visualMap: {
    max: 20,
    calculable: true,
    inRange: {
      color: [
        //'#0c1127',

        //'#13224d',

        '#2d62cd',

        '#28ce38',

        '#ffba00',

        '#ff8441',

        '#ca3131',
      ],
    },
  },
  xAxis3D: {
    type: 'category',
    name: '时间',
    min: 'dataMin',
    boundaryGap: true,
    data: [
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
    ],
    interval: 1,

    axisLine: {
      interval: 1,
    },
    axisLabel: {
      interval: 0,
      showMaxLabel: false,
    },
    nameGap: 30,
    nameTextStyle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
  yAxis3D: {
    type: 'category',
    name: '日期',
    boundaryGap: true,
    interval: 1,
    axisLabel: {
      interval: 0,
      formatter: (item: any) => {
        if (!item) return '';
        const date = new Date(item);
        let day = date.getDay();
        let weekend = day === 0 || day === 6 ? 'weekend' : 'weekday';
        return `{${weekend}|${date.getDate()}}`;
      },
      rich: {
        weekend: {
          color: '#ff0000',
          fontSize: 16,
          fontWeight: 'bold',
          borderWidth: 0,
        },
        weekday: {
          color: '#fff',
          fontSize: 16,
          fontWeight: 'bold',
          borderWidth: 0,
        },
      },
    },
    nameTextStyle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
  zAxis3D: {
    type: 'value',
    name: '次数',
    nameGap: 30,
    nameTextStyle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
  grid3D: {
    boxWidth: 100,
    boxDepth: 160,
    boxHeight: 50,
    left: 50,
    right: 50,
    top: '-20%',
    height: '120%',
    axisLine: {
      lineStyle: {
        color: '#cccccc',
        //color:'#ec2b2b',
        width: '2',
      },
    },

    axisLabel: {
      margin: 10,
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        borderWidth: 0,
        borderColor: '#fff',
      },
    },

    splitLine: {
      lineStyle: {
        color: '#2d395c',
        width: '1',
      },
    },

    viewControl: {
      projection: 'perspective',
      //projection: 'orthographic',
      distance: 200,
      alpha: 20,
      beta: 30,
    },
    light: {
      main: {
        intensity: 1,
        quality: 'ultra',
        //shadow: true
      },
      ambient: {
        intensity: 0.3,
      },
    },
  },
  series: [
    {
      type: 'bar3D',
      shading: 'lambert',
      label: {
        fontSize: 12,
        borderWidth: 11,
        color: '#ff0000',
      },
      emphasis: {
        label: {
          fontSize: 20,
          color: '#fff',
          borderWidth: 11,
        },
        itemStyle: {
          //color: '#FFFFFF',

          opacity: 0.1,
          borderWidth: 11,
        },
      },
    },
  ],
};
