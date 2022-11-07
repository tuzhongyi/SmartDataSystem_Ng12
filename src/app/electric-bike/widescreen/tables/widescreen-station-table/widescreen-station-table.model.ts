import { Flags } from 'src/app/common/tools/flags';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { StationState } from 'src/app/enum/station-state.enum';
import { Camera } from 'src/app/network/model/camera.model';

export class WidescreenStationModel<T = any> {
  data?: T;
  id: string = '';
  name: string = '';
  status!: Flags<StationState>;
  communityName: string = '';
  cameraCount: number = 0;
}
