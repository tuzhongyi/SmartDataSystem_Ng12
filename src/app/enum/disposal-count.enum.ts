// 垃圾滞留处理情况
export enum DisposalCountType {
  total = 0, // 全部任务
  handled = 1, // 已完成任务
  unhandled = 2, // 未完成任务
  timeout = 3, // 超时任务
}
