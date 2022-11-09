import { Injectable } from '@angular/core';
import { IService } from 'src/app/business/Ibusiness';
import { VehicleMember } from '../../model/member.model';
import { PagedList } from '../../model/page_list.model';
import { GarbageVehicleMemberUrl } from '../../url/garbage-vehicle/member.url';
import { MemberUrl } from '../../url/garbage/member.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { IParams } from '../IParams.interface';
import { GetVehicleMembersParams } from './member-request.params';
@Injectable({
  providedIn: 'root',
})
export class VehicleMemberRequsetService {
  private basic: BaseRequestService;
  private type: BaseTypeRequestService<VehicleMember>;
  constructor(private _http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(VehicleMember);
  }

  get(id: string): Promise<VehicleMember> {
    let url = GarbageVehicleMemberUrl.item(id)
    return this.type.get(url);
  }
  update(data: VehicleMember): Promise<VehicleMember> {
    let url = GarbageVehicleMemberUrl.item(data.Id);
    return this.type.put(url, data);
  }
  create(data: VehicleMember): Promise<VehicleMember> {
    let url = GarbageVehicleMemberUrl.basic();
    return this.type.post(url, data);
  }
  delete(id: string): Promise<VehicleMember> {
    let url = GarbageVehicleMemberUrl.item(id);
    return this.type.delete(url);
  }
  list(
    params: GetVehicleMembersParams = new GetVehicleMembersParams()
  ): Promise<PagedList<VehicleMember>> {
    let url = GarbageVehicleMemberUrl.list();
    return this.type.paged(url, params);
  }

  excel(data: BinaryData) {
    let url = GarbageVehicleMemberUrl.excels()
    if (data)
      return this.basic.postReturnString(url, data);
    else
      return this.type.get(url)
  }
}

