import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ToastrService } from 'ngx-toastr';
import { DivisionTreeSource } from 'src/app/common/components/division-tree/division-tree.model';
import { Guid } from 'src/app/common/tools/guid';
import { Language } from 'src/app/common/tools/language';
import { RegExpTool } from 'src/app/common/tools/reg-exp/reg-exp.tool';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { Gender } from 'src/app/enum/gender.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { UserState } from 'src/app/enum/user-state.enum';
import { UserType } from 'src/app/enum/user-type.enum';
import { UserUIType } from 'src/app/enum/user-ui-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { Role } from 'src/app/network/model/garbage-station/role.model';
import {
  User,
  UserResource,
} from 'src/app/network/model/garbage-station/user.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { AIOPUserDetailsRoleBusiness } from './aiop-user-details-role.business';
import { AIOPUserDetailsBusiness } from './aiop-user-details.business';
import { AIOPUserDetailsService } from './aiop-user-details.service';

@Component({
  selector: 'aiop-user-details',
  templateUrl: './aiop-user-details.component.html',
  styleUrls: ['./aiop-user-details.component.less'],
  providers: [
    AIOPUserDetailsRoleBusiness,
    AIOPUserDetailsService,
    AIOPUserDetailsBusiness,
  ],
})
export class AIOPUserDetailsComponent implements OnInit {
  @Input() user?: User;

  @Output() ok: EventEmitter<void> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  constructor(
    public role: AIOPUserDetailsRoleBusiness,
    private business: AIOPUserDetailsBusiness,
    private toastr: ToastrService
  ) {}

  Language = Language;
  Gender = Gender;
  UserState = UserState;
  UserUIType = UserUIType;
  SelectStrategy = SelectStrategy;
  model = this.createUser();
  password: string = '';
  roles: Role[] = [];

  createUser() {
    let user = new User();
    user.Id = Guid.NewGuid().ToString('N');
    user.Role = [];
    user.ServerId = '1';
    user.State = UserState.normal;
    user.UserType = UserType.garbage_station_system;
    return user;
  }

  get resourceIds() {
    if (this.model.Resources) {
      return this.model.Resources.map((x) => x.Id);
    } else {
      return [];
    }
  }

  ngOnInit(): void {
    if (this.user) {
      let plain = instanceToPlain(this.user);
      this.model = plainToInstance(User, plain);
    }
    this.role.load().then((x) => {
      if (this.model.Role.length > 0) {
        this.role.select(this.model.Role[0].Id);
      }
    });
  }

  select_resources(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    this.model.Resources = nodes.map((x) => this.convert(x));
  }
  convert(node: CommonFlatNode<DivisionTreeSource>) {
    let resource = new UserResource();
    resource.Id = node.Id;
    resource.Name = node.Name;
    if (node.RawData instanceof Division) {
      resource.ResourceType = EnumHelper.ConvertDivisionToUserResource(
        node.RawData.DivisionType
      );
    } else if (node.RawData instanceof GarbageStation) {
      resource.ResourceType = UserResourceType.Station;
    } else {
    }

    resource.AllSubResources = true;
    resource.RoleFlags = 0;
    return resource;
  }

  check() {
    if (!this.model.Id) {
      this.toastr.warning('请填写ID');
      return false;
    }
    if (!this.model.Username) {
      this.toastr.warning('请填写用户名');
      return false;
    }
    if (!this.model.CreateTime) {
      if (!this.password) {
        this.toastr.warning('请输入密码');
        return false;
      }
      if (!this.password.match(RegExpTool.UserPassowrd)) {
        this.toastr.warning('请输入正确的密码');
        return false;
      }
    }
    if (!this.model.LastName) {
      this.toastr.warning('请填写姓名');
      return false;
    }
    if (!this.role.selected) {
      this.toastr.warning('请选择用户角色');
      return false;
    }
    if (!this.model.Resources || this.model.Resources.length === 0) {
      this.toastr.warning('请选择资源权限');
      return false;
    }

    return true;
  }

  onok() {
    if (this.check()) {
      let promise: Promise<boolean>;
      if (this.model.CreateTime) {
        promise = this.business.update(this.model);
      } else {
        promise = this.business.create(
          this.model,
          this.password,
          this.role.selected!
        );
      }
      promise
        .then((x) => {
          this.toastr.success('操作成功');
          this.ok.emit();
        })
        .catch((error) => {
          console.error(error);
          this.toastr.error('操作失败');
        });
    }
  }

  oncancel() {
    this.cancel.emit();
  }
}
