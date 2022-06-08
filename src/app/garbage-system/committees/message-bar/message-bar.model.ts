export enum NotifyStatus {
  normal = 'normal',
  remind = 'remind',
  warning = 'warning',
}

export class CommitteesMessageBarNotifyViewModel {
  status: NotifyStatus = NotifyStatus.normal;
  text: string = '';
  onClick?: () => void;
}
