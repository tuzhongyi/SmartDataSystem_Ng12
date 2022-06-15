export class IllegalDropRecordModel {
  constructor(
    public EventId: string = '',
    public ImageUrl: string = '',// 图片地址
    public ResourceName: string = '', // 资源名称
    public StationName: string = '', // 投放点
    public CountyName: string = '', // 街道
    public CountyId: string = '',
    public CommitteeName: string = '', // 居委会
    public CommitteeId: string = '',
    public CommunityName: string = '',
    public CommunityId: string = '',
    public EventTime: string = '', // 上报时间
  ) { }
}
