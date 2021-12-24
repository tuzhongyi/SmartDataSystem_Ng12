export class IllegalDropRecordModel {
  constructor(
    public imgUrl: string,
    public resourceName: string,
    public stationName: string,
    public committeeName: string,
    public county: string,
    public recordTime: string
  ) {}
}
