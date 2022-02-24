export abstract class BasicChart<T> {
  protected myChart?: echarts.ECharts;

  setOption(data: T, opt: any) {
    if (this.myChart) {
      this.myChart.resize();
      let option = this.optionProcess(data, opt);
      this.myChart.setOption(option);
    }
  }

  abstract optionProcess(data: T, option: any): any;
}
