import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import { PageArgs } from '../table.interface';

export class DeviceListTableArgs extends PageArgs {
  status?: OnlineStatus;
  opts?: SearchOptions;
}
