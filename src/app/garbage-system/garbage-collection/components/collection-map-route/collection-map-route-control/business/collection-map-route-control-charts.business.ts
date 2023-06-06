import { formatDate } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts/core';
import { TimeString } from 'src/app/common/components/charts/line-zoom-chart/line-zoom-chart.model';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { Duration } from 'src/app/network/model/duration.model';
import { GisRoutePoint } from 'src/app/network/model/gis-point.model';
import {
  GarbageCollectionEventRecord,
  VehicleOnlineEventRecord,
} from 'src/app/network/model/vehicle-event-record.model';
import { CollectionMapRouteQuery } from '../../collection-map-route-query/collection-map-route-query.model';
import {
  ArrayItem,
  CollectionMapRouteControlSource,
  ICollectionMapRouteControlChartsBusiness,
} from '../collection-map-route-control.model';
import { CollectionMapRouteControlOnlineBusiness } from './collection-map-route-control-online.business';
import { CollectionMapRouteControlPointBusiness } from './collection-map-route-control-point.business';
import { CollectionMapRouteControlScoreBusiness } from './collection-map-route-control-score.business';

@Injectable()
// implements IBusiness<GisRoutePoint[], EChartsOption>
export class CollectionMapRouteControlChartsBusiness
  implements ICollectionMapRouteControlChartsBusiness
{
  scoreclick: EventEmitter<any> = new EventEmitter();
  routetrigger: EventEmitter<Date> = new EventEmitter();
  routeclick: EventEmitter<Date> = new EventEmitter();
  private readonly formater = 'H:mm:ss';
  private chart?: echarts.ECharts;
  private handle?: NodeJS.Timeout;
  private registed = false;
  private data?: CollectionMapRouteControlSource;
  constructor(
    private online: CollectionMapRouteControlOnlineBusiness,
    private point: CollectionMapRouteControlPointBusiness,
    private score: CollectionMapRouteControlScoreBusiness
  ) {}

  speed = 1;

  seek(point: GisRoutePoint) {
    if (this.handle) {
      this.stop();
      this.run(point.Time);
    } else {
      this.triggerByTime(point.Time);
    }
  }

  run(date: Date, offset: number = 0) {
    this.handle = setTimeout(() => {
      if (this.data) {
        if (offset) {
          let time: Date;
          if (this.data.points[offset].Time.getTime() === date.getTime()) {
            time = this.data.points[offset].Time;
            this.triggerByTime(time);
            this.run(time, offset + 1);
          } else if (offset < this.data.points.length - 1) {
            let next = this.data.points[offset];
            let interval = next.Time.getTime() - date.getTime();
            if (interval >= 1000 * 5) {
              this.run(next.Time, offset);
            }
          } else {
            time = new Date(date.getTime() + 1000);
            this.run(time, offset);
          }
        } else {
          let item = this.getDataByTime(date);
          this.triggerByTime(item.data);
          this.run(item.data, item.index + 1);
        }
      } else {
        let time = new Date(date.getTime() + offset);
        this.triggerByTime(time);
        this.run(date, (offset += 1000));
      }
    }, 1000 / this.speed);
  }
  stop() {
    if (this.handle) {
      clearTimeout(this.handle);
      this.handle = undefined;
    }
  }
  async getData(
    vehicleId: string,
    duration: Duration
  ): Promise<CollectionMapRouteControlSource> {
    let source = new CollectionMapRouteControlSource();
    source.points = await this.point.load(vehicleId, duration);
    source.collectionRecord = await this.score.load(vehicleId, duration);
    // source.onlineRecord = await this.online.load(vehicleId, duration);
    return source;
  }

  load(dom: HTMLDivElement, query: CollectionMapRouteQuery) {
    this.chart = echarts.init(dom, 'dark');

    return this.getData(query.model.Id, query.duration).then((data) => {
      this.data = data;
      if (data.points.length === 0) return data;
      this.loadXAxis(data.points);
      this.loadDataZoom(data.points);
      this.loadEndSerie(data.points);
      this.loadRouteSerie(data.points, query.duration.begin);
      this.loadScoreSerie(data.collectionRecord);
      // this.loadOnlineStatus(
      //   data.onlineRecord,
      //   data.points[0].Time,
      //   data.points[data.points.length - 1].Time
      // );

      let option: EChartsOption = {
        color: this.colors,
        grid: this.grid,
        backgroundColor: 'rgba(0,0,0,0)',
        tooltip: this.tooltip,
        dataZoom: this.dataZoom,
        xAxis: this.xAxis,
        yAxis: this.yAxis,
        // visualMap: this.visualMap,
        series: this.series,
      };
      if (this.chart) {
        if (!this.registed) {
          this.eventRegist(this.chart);
          this.registed = true;
        }
        // this.series[0].data = data;
        this.chart.setOption(option);
      }
      return data;
    });
  }

  private eventRegist(chart: echarts.ECharts) {
    // chart.on('click', 'series.line', this.onScoreClicked.bind(this));
    chart.on('click', 'series.line', (e: any) => {});
    chart.on('click', 'series.scatter', (e: any) => {
      let index = this.getXAxisIndex(e.data[0]);
      let time = this.xAxis.data[index] as TimeString;

      this.scoreclick.emit(time.date);
    });
    chart.getZr().on('click', (params: any) => {
      let pointInPixel = [params.offsetX, params.offsetY];
      let grid = chart.convertFromPixel({ seriesIndex: 0 }, pointInPixel);
      let index = grid[0];
      let str = this.xAxis.data[index] as TimeString;
      // this.triggerByIndex(index, time.date);
      let item = this.getDataByTime(str.date);
      this.triggerByTime(item.data);
      this.routeclick.emit(item.data);
    });
  }

  private getDataByTime(date: Date): ArrayItem<Date> {
    if (this.data && this.data.points && this.data.points.length > 0) {
      let min = Number.MAX_VALUE;
      let index = -1;
      this.data.points.forEach((x, i) => {
        let interval = Math.abs(x.Time.getTime() - date.getTime());
        if (interval < min) {
          index = i;
          min = interval;
        }
      });
      return {
        index: index,
        data: this.data.points[index].Time,
      };
    }
    return {
      index: -1,
      data: date,
    };
  }

  private triggerByIndex(index: number, now: Date) {
    this.routetrigger.emit(now);
    this.serieRoutePosition.data = [[index, 0]];
    let _now = now.getTime();
    this.serieRouted.data = (this.serieRoute.data as Array<any>).filter((x) => {
      if (x.name) {
        let time = x.name.getTime();
        let result = time >= _now;
        return result;
      } else {
        return true;
      }
    });
    this.chart?.setOption({ series: this.series });
  }
  private triggerByTime(time: Date) {
    let index = this.getXAxisIndex(time);
    if (index < 0) return;

    this.triggerByIndex(index, time);
  }

  /** X 轴 */
  private loadXAxis(datas: GisRoutePoint[]) {
    let end = datas[datas.length - 1].Time.getTime();
    let offset = 0;
    this.xAxis.data = [];
    let begin = new Date(datas[0].Time.getTime());
    // begin.setSeconds(0);
    // begin.setMilliseconds(0);
    let time = begin.getTime();

    while (time <= end) {
      let str = new TimeString(time);
      str.formater = this.formater;
      this.xAxis.data.push(str);
      offset = 5 * 1000;
      time += offset;
    }
  }
  /** 缩放组件 */
  private loadDataZoom(datas: GisRoutePoint[]) {
    this.dataZoom[0].end = datas.length - 1;
    this.dataZoom[1].end = datas.length - 1;
  }
  /** 结束散点 */
  private loadEndSerie(datas: GisRoutePoint[]) {
    let last = formatDate(datas[datas.length - 1].Time, this.formater, 'en');
    this.series[SerieIndex.end].data = [[last, 1]];
  }
  /** 加载路径线 */
  // private loadRouteSerie(datas: GisRoutePoint[]) {
  //   this.series[SerieIndex.route].data = datas.map((x) => {
  //     let time = formatDate(x.Time, this.formater, 'en');
  //     let value = {
  //       name: x.Time,
  //       value: [time, 0],
  //     };
  //     // let time = new TimeString(x.Time);
  //     return value;
  //   });

  //   this.series[SerieIndex.routed].data = this.series[SerieIndex.route].data;

  //   for (let i = 0; i < this.xAxis.data.length; i++) {
  //     const x = (this.xAxis.data[i] as TimeString).toString();
  //     let index = datas.findIndex((y) => {
  //       let time = formatDate(y.Time, this.formater, 'en');
  //       return time === x;
  //     });
  //     if (index < 0) {
  //       this.series[SerieIndex.offline].data.push([x, 0]);
  //     }
  //   }
  // }

  private loadRouteSerie(datas: GisRoutePoint[], date: Date) {
    this.series[SerieIndex.route].data = [];
    this.series[SerieIndex.offline].data = [];

    let times = datas.map((x) => formatDate(x.Time, this.formater, 'en'));
    let xAxis = (this.xAxis.data as Array<TimeString>).map((x) => x.toString());

    let todayStr = formatDate(date, 'yyyy-MM-dd', 'en');
    for (let i = 1; i < times.length; i++) {
      let current = new Date(`${todayStr} ${times[i - 1]}`);
      let next = new Date(`${todayStr} ${times[i]}`);
      let interval = next.getTime() - current.getTime();
      if (1000 < interval && interval < 15 * 1000) {
        let time = new Date(current.getTime());
        time.setSeconds(time.getSeconds() + 1);
        times.splice(i, 0, formatDate(time, this.formater, 'en'));
        i--;
      }
    }

    let i = 0;
    while (xAxis.length) {
      let x = xAxis.shift()!;
      let index = times.indexOf(x, i);

      if (index < 0) {
        this.series[SerieIndex.offline].data.push([x, 0]);
        this.series[SerieIndex.route].data.push([x, null]);
      } else {
        let value = {
          name: new Date(`${todayStr} ${times[index]}`),
          value: [x, 0],
        };
        this.series[SerieIndex.route].data.push(value);
        this.series[SerieIndex.offline].data.push([x, null]);

        i++;
      }
    }

    this.series[SerieIndex.routed].data = this.series[SerieIndex.route].data;
    // this.series[SerieIndex.route].data = datas.map((x) => {
    //   let time = formatDate(x.Time, this.formater, 'en');
    //   let value = {
    //     name: x.Time,
    //     value: [time, 0],
    //   };
    //   // let time = new TimeString(x.Time);
    //   return value;
    // });

    // this.series[SerieIndex.routed].data = this.series[SerieIndex.route].data;

    // for (let i = 0; i < this.xAxis.data.length; i++) {
    //   const x = (this.xAxis.data[i] as TimeString).toString();
    //   let index = datas.findIndex((y) => {
    //     let time = formatDate(y.Time, this.formater, 'en');
    //     return time === x;
    //   });
    //   if (index < 0) {
    //     this.series[SerieIndex.offline].data.push([x, 0]);
    //   }
    // }
  }

  private loadScoreSerie(datas: GarbageCollectionEventRecord[]) {
    this.series[SerieIndex.good].data = datas
      .filter((x) => x.Data.Score === CollectionPointScore.Good)
      .map((x) => {
        let time = formatDate(x.EventTime, this.formater, 'en');
        return [time, 1];
      });
    this.series[SerieIndex.middle].data = datas
      .filter((x) => x.Data.Score === CollectionPointScore.Average)
      .map((x) => {
        let time = formatDate(x.EventTime, this.formater, 'en');
        return [time, 1];
      });
    this.series[SerieIndex.bad].data = datas
      .filter((x) => x.Data.Score === CollectionPointScore.Poor)
      .map((x) => {
        let time = formatDate(x.EventTime, this.formater, 'en');
        return [time, 1];
      });
  }
  private loadOnlineStatus(
    online: VehicleOnlineEventRecord[],
    begin: Date,
    end: Date
  ) {
    this.visualMap.pieces = [];

    let last: {
      index: number;
      status?: OnlineStatus;
      color?: string;
    } = {
      index: this.getXAxisIndex(begin),
    };

    this.visualMap.pieces.push({ lte: last.index, color: 'gray' });
    for (let i = 0; i < online.length; i++) {
      const record = online[i];
      let index = this.getXAxisIndex(record.EventTime);

      if (index < 0) {
        console.warn('OnlineStatus not in xAxis', record);
        continue;
      }
      last.status = record.Data.OnlineStatus;
      last.color =
        record.Data.OnlineStatus === OnlineStatus.Offline ? '#28df69' : 'red';
      this.visualMap.pieces.push({
        gt: last.index,
        lte: index,
        color: last.color,
      });
      last.index = index;
    }
    let color = last.status === OnlineStatus.Online ? '#28df69' : 'red';
    let endIndex = this.getXAxisIndex(end);
    if (last.index < endIndex) {
      this.visualMap.pieces.push({
        gt: last.index,
        lte: endIndex,
        color: color,
      });
    }

    // let color = last.status === OnlineStatus.Online ? '#28df69' : 'red';
    this.visualMap.pieces.push({
      gt: endIndex,
      color: 'white',
    });
  }
  private getXAxisIndex(time: Date | string) {
    let data: string;
    if (typeof time === 'string') {
      data = time;
    } else {
      data = formatDate(time, this.formater, 'en');
    }

    return (this.xAxis.data as TimeString[]).findIndex(
      (x) => x.toString() === data
    );
  }

  private grid: any = {
    top: 30,
    left: 50,
    right: 50,
    height: 70,
  };
  private xAxis: any = {
    type: 'category',
    data: [],
    boundaryGap: false,
    triggerEvent: true,
    axisTick: {
      inside: true,
      length: 5,
    },
    // splitLine: {
    //   show: true,
    // },

    // axisPointer: {
    //   snap: true,
    //   lineStyle: {
    //     color: '#7581BD',
    //     width: 2,
    //   },
    //   label: {
    //     show: false,
    //     formatter: (params: any) => {
    //       return params.value;
    //     },
    //     backgroundColor: '#7581BD',
    //   },
    //   handle: {
    //     show: true,
    //     value: 0,
    //     color: '#7581BD',
    //     icon: `image://http://${location.host}/assets/img/route/point.png`,
    //     size: 10,
    //     margin: 0,
    //   },
    // },
  };
  private yAxis: any = {
    show: false,
    min: 0,
    max: 2,
  };
  // tooltip: any = {
  //   triggerOn: 'none',
  //   animation: false,
  //   position: function (pt: any) {
  //     return [pt[0], 130];
  //   },
  // };
  private tooltip: any = {
    trigger: 'axis',
    position: (pt: any) => {
      return [pt[0] - 28, '-10%'];
    },
    formatter: (params: any) => {
      if (params && params.length > 0) {
        let i = params.length - 1;
        let item;
        do {
          item = params[i];
          i--;
        } while (item.data[1] === null);
        switch (parseInt(item.seriesId)) {
          case SerieIndex.offline:
            return `${item.name}</br>${item.marker}离线`;
          case SerieIndex.position:
            return item.name;
          case SerieIndex.good:
            return `${item.name}</br>${item.marker}评价：优`;
          case SerieIndex.middle:
            return `${item.name}</br>${item.marker}评价：中`;
          case SerieIndex.bad:
            return `${item.name}</br>${item.marker}评价：差`;
          default:
            break;
        }
        return `${item.marker}${item.name}`;
      }
      return '';
    },
  };
  private visualMap: any = {
    show: false,
    dimension: 0,
    pieces: [
      {
        lte: 60,
        color: '#28df69',
      },
      {
        gt: 60,
        lte: 80,
        color: 'red',
      },
      {
        gt: 80,
        lte: 140,
        color: '#28df69',
      },
      {
        gt: 140,
        lte: 170,
        color: 'red',
      },
      {
        gt: 170,
        color: '#28df69',
      },
    ],
  };
  private dataZoom: any = [
    {
      type: 'inside',
      start: 0,
      end: 10,
    },
    {
      start: 0,
      end: 10,
    },
  ];
  private serieRoute: any = {
    id: SerieIndex.route,
    symbol: 'none',
    data: [],
    type: 'line',
    lineStyle: {
      color: '#28df69',
      width: 3,
    },
  };
  private serieRouted: any = {
    id: SerieIndex.routed,
    symbol: 'none',
    zlevel: 8,
    data: [],
    type: 'line',
    lineStyle: {
      color: '#aaaaaa', //'rgba(0,0,255,0.5)',
      width: 3,
    },
  };
  private serieOffline: any = {
    id: SerieIndex.offline,
    symbol: 'none',
    zlevel: 9,
    data: [],
    type: 'line',
    lineStyle: {
      color: 'rgba(255,0,0,1)',
      width: 3,
    },
  };
  private serieRoutePosition: any = {
    id: SerieIndex.position,
    data: [[0, 0]],
    type: 'scatter',
    symbolSize: 8,
    symbol: `image://http://${location.host}/assets/img/route/point.png`,
    zlevel: 10,
    animation: false,
  };

  private get serieScoreGood(): any {
    return {
      id: SerieIndex.good,
      data: [],
      type: 'scatter',
      symbolSize: 30,
      symbol: `image://http://${location.host}/assets/img/route/good.png`,
      encode: { tooltip: '1111111' },
    };
  }
  private get serieScoreMiddle(): any {
    return {
      id: SerieIndex.middle,
      data: [],
      type: 'scatter',
      symbolSize: 30,
      symbol: `image://http://${location.host}/assets/img/route/middle.png`,
    };
  }
  private get serieScoreBad(): any {
    return {
      id: SerieIndex.bad,
      data: [],
      type: 'scatter',
      symbolSize: 30,
      symbol: `image://http://${location.host}/assets/img/route/bad.png`,
    };
  }
  private get serieScoreBegin(): any {
    return {
      id: SerieIndex.begin,
      data: [[0, 1]],
      type: 'scatter',
      symbolSize: 30,
      symbol: `image://http://${location.host}/assets/img/route/begin.png`,
    };
  }
  private get serieScoreEnd(): any {
    return {
      id: SerieIndex.end,
      data: [[0, 1]],
      type: 'scatter',
      symbolSize: 30,
      symbol: `image://http://${location.host}/assets/img/route/end.png`,
    };
  }

  private series: any = [
    this.serieRoute,
    this.serieRouted,
    this.serieOffline,
    this.serieRoutePosition,
    this.serieScoreGood,
    this.serieScoreMiddle,
    this.serieScoreBad,
    this.serieScoreBegin,
    this.serieScoreEnd,
  ];
  private colors = [
    '#28df69',
    '#4992ff',
    'red',
    'transparent',
    '#a7272c',
    '#a39d13',
    '#06bc53',
  ];

  private datasetPoints: any = {
    id: 'points',
    source: [],
  };
}

enum SerieIndex {
  route,
  routed,
  offline,
  position,
  good,
  middle,
  bad,
  begin,
  end,
}
