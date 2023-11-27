import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { PageArgs } from '../table.interface';

export class DeviceListTableArgs extends PageArgs {
  divisionId?: string;
  status?: OnlineStatus;
  name?: string;
}
