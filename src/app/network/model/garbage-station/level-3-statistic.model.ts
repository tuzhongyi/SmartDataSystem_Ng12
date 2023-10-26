import { IModel } from '../model.interface';

export class Level3Statistic implements IModel {
  /**	Int32	一级事件数量	O	*/
  Level1Number?: number;
  /**	Int32	二级事件数量	O	*/
  Level2Number?: number;
  /**	Int32	三级事件数量	O	*/
  Level3Number?: number;
  /**	Int32	全部事件数量	O	*/
  AllLevelNumber?: number;
  /**	Double	全部事件反馈总时长，单位：秒	O	*/
  TotalFeedbackSeconds?: number;
  /**	Double	平均反馈时长，单位：秒	O	*/
  AvgFeedbackSeconds?: number;
  /**	Int32	全部事件反馈数量	O	*/
  FeedbackNumber?: number;
  /**	Double	反馈率，(FeedbackNumber/ AllLevelNumber)*100	O	*/
  FeedbackRatio?: number;
  /**	Int32	督办事件数量	O	*/
  SupervisedNumber?: number;
  /**	Int32	一级事件后反馈数量	O	*/
  Level1FeedbackNumber?: number;
  /**	Int32	二级事件后反馈数量	O	*/
  Level2FeedbackNumber?: number;
  /**	Int32	三级事件后反馈数量	O	*/
  Level3FeedbackNumber?: number;
  /**	Int32	物业反馈数量	O	*/
  PropertyFeedbackNumber?: number;
  /**	Int32	第三方反馈数量	O	*/
  ThirdPartFeedbackNumber?: number;
}
