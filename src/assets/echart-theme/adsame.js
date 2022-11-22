/*
 * @Author: pmx 
 * @Date: 2022-11-10 14:57:10 
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-21 18:07:35
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports', 'echarts'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports, require('echarts'));
  } else {
    // Browser globals
    factory({}, root.echarts);
  }
}(this, function (exports, echarts) {
  var log = function (msg) {
    if (typeof console !== 'undefined') {
      console && console.error && console.error(msg);
    }
  };
  if (!echarts) {
    log('ECharts is not Loaded');
    return;
  }
  echarts.registerTheme('adsame', {
    "color": ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
    "grid": {
      "left": 15,
      "right": 15,
      "bottom": 0,
      "containLabel": true
    },
    "backgroundColor": "rgba(0,0,0,0)",
    "textStyle": {},
    "title": {
      "textStyle": {
        "color": "#ffffff",
        "fontSize": "24",
        "fontFamily": "Source Han Sans CN Normal",
        "fontWeight": "normal",
        "overflow": "truncate"
      },
      "subtextStyle": {
        "color": "inherit"
      }
    },
    "line": {
      "label": {
        "show": true,
        "color": "#cfd7fe",
        "fontSize": "16",
        "distance": 10
      },
      "itemStyle": {
        "borderWidth": 1
      },
      "lineStyle": {
        "width": 4
      },
      "symbolSize": 4,
      "symbol": "emptyCircle",
      "smooth": false
    },
    "radar": {
      "itemStyle": {
        "borderWidth": 1
      },
      "lineStyle": {
        "width": 2
      },
      "symbolSize": 4,
      "symbol": "emptyCircle",
      "smooth": false
    },
    "bar": {
      "label": {
        "color": "#7586e0",
        "fontSize": 16,
        "position": "top"
      },
      "itemStyle": {
        "barBorderWidth": 0,
        "barBorderColor": "#ccc"
      }
    },
    "pie": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    },
    "scatter": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    },
    "boxplot": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    },
    "parallel": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    },
    "sankey": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    },
    "funnel": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      }
    },
    "gauge": {


    },
    "candlestick": {
      "itemStyle": {
        "color": "#c12e34",
        "color0": "#2b821d",
        "borderColor": "#c12e34",
        "borderColor0": "#2b821d",
        "borderWidth": 1
      }
    },
    "graph": {
      "itemStyle": {
        "borderWidth": 0,
        "borderColor": "#ccc"
      },
      "lineStyle": {
        "width": 1,
        "color": "#aaa"
      },
      "symbolSize": 4,
      "symbol": "emptyCircle",
      "smooth": false,
      "color": [
        "#c12e34",
        "#e6b600",
        "#0098d9",
        "#2b821d",
        "#005eaa",
        "#339ca8",
        "#cda819",
        "#32a487"
      ],
      "label": {
        "color": "#eee"
      }
    },
    "map": {
      "itemStyle": {
        "areaColor": "#ddd",
        "borderColor": "#eee",
        "borderWidth": 0.5
      },
      "label": {
        "color": "#c12e34"
      },
      "emphasis": {
        "itemStyle": {
          "areaColor": "#e6b600",
          "borderColor": "#ddd",
          "borderWidth": 1
        },
        "label": {
          "color": "#c12e34"
        }
      }
    },
    "geo": {
      "itemStyle": {
        "areaColor": "#ddd",
        "borderColor": "#eee",
        "borderWidth": 0.5
      },
      "label": {
        "color": "#c12e34"
      },
      "emphasis": {
        "itemStyle": {
          "areaColor": "#e6b600",
          "borderColor": "#ddd",
          "borderWidth": 1
        },
        "label": {
          "color": "#c12e34"
        }
      }
    },
    "categoryAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#cfd7fe"
        }
      },
      "axisTick": {
        "show": false,
        "lineStyle": {
          "color": "#cfd7fe"
        }
      },
      "axisLabel": {
        "show": true,
        "color": "#cfd7fe",
        "fontSize": "16"
      },
      "splitLine": {
        "show": false,
        "lineStyle": {
          "color": ["#ccc"]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
        }
      }
    },
    "valueAxis": {
      "axisLine": {
        "show": false,
        "lineStyle": {
          "color": "#cfd7fe"
        }
      },
      "axisTick": {
        "show": false,
        "lineStyle": {
          "color": "#cfd7fe"
        }
      },
      "axisLabel": {
        "show": false,
        "color": "#cfd7fe"
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": ["rgba(117,134,224,0.3)"]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
        }
      }
    },
    "logAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisLabel": {
        "show": true,
        "color": "#333"
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": ["#ccc"]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
        }
      }
    },
    "timeAxis": {
      "axisLine": {
        "show": true,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisTick": {
        "show": true,
        "lineStyle": {
          "color": "#333"
        }
      },
      "axisLabel": {
        "show": true,
        "color": "#333"
      },
      "splitLine": {
        "show": true,
        "lineStyle": {
          "color": ["#ccc"]
        }
      },
      "splitArea": {
        "show": false,
        "areaStyle": {
          "color": ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
        }
      }
    },
    "toolbox": {
      "iconStyle": {
        "borderColor": "#06467c"
      },
      "emphasis": {
        "iconStyle": {
          "borderColor": "#4187c2"
        }
      }
    },
    "legend": {
      "selectedMode": false,
      "icon": "none",
      "top": "0",
      "left": "80%",
      "textStyle": {
        "color": "inherit",
        "fontSize": 12
      }
    },
    "tooltip": {
      "mainType": "tooltip",
      "trigger": "axis",
      "axisPointer": {
        "type": "cross",
        "lineStyle": {
          "color": "#cccccc",
          "width": 1
        },
        "crossStyle": {
          "color": "#cccccc",
          "width": 1
        },
        "label": {
          "backgroundColor": "rgb(110,112,121)"
        }
      }
    },
    "timeline": {
      "lineStyle": {
        "color": "#005eaa",
        "width": 1
      },
      "itemStyle": {
        "color": "#005eaa",
        "borderWidth": 1
      },
      "controlStyle": {
        "color": "#005eaa",
        "borderColor": "#005eaa",
        "borderWidth": 0.5
      },
      "checkpointStyle": {
        "color": "#005eaa",
        "borderColor": "#316bc2"
      },
      "label": {
        "color": "#005eaa"
      },
      "emphasis": {
        "itemStyle": {
          "color": "#005eaa"
        },
        "controlStyle": {
          "color": "#005eaa",
          "borderColor": "#005eaa",
          "borderWidth": 0.5
        },
        "label": {
          "color": "#005eaa"
        }
      }
    },
    "visualMap": {
      "color": ["#1790cf", "#a2d4e6"]
    },
    "dataZoom": {
      "backgroundColor": "rgba(47,69,84,0)",
      "dataBackgroundColor": "rgba(47,69,84,0.3)",
      "fillerColor": "rgba(167,183,204,0.4)",
      "handleColor": "#a7b7cc",
      "handleSize": "100%",
      "textStyle": {
        "color": "#333333"
      }
    },
    "markPoint": {
      "label": {
        "color": "#eee"
      },
      "emphasis": {
        "label": {
          "color": "#eee"
        }
      }
    }
  }
  );
}));
