import { Component, Input, OnInit } from '@angular/core';
import { MessageBar } from 'src/app/common/tools/message-bar';
import { RelayState } from 'src/app/enum/relay-state.enum';
import { VehicleRelayOperator } from 'src/app/enum/vehicle-relay.enum';
import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';
import {
  NBPowerOnParams,
  ResetRelayParams,
} from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.params';

import { AIOPGarbageVehicleCommandBusiness } from './aiop-garbage-vehicle-command.business';
import { GarbageVehicleCommandConfirmWindowModel } from './garbage-vehicle-command.model';

@Component({
  selector: 'aiop-garbage-vehicle-command',
  templateUrl: './aiop-garbage-vehicle-command.component.html',
  styleUrls: ['./aiop-garbage-vehicle-command.component.less'],
  providers: [AIOPGarbageVehicleCommandBusiness],
})
export class AIOPGarbageVehicleCommandComponent implements OnInit {
  @Input()
  model?: GarbageVehicle;

  constructor(private business: AIOPGarbageVehicleCommandBusiness) {}

  realies: number[] = [];
  confirm = new GarbageVehicleCommandConfirmWindowModel();
  RelayState = RelayState;

  ngOnInit(): void {
    if (this.model && this.model.RelayCount) {
      for (let i = 1; i <= this.model.RelayCount; i++) {
        this.realies.push(i);
      }
    }
  }

  onnb() {
    this.confirm.language = '是否NB传感器远程上电?';
    this.confirm.model = new NBPowerOnParams();
    this.confirm.model.PowerOn = true;
    this.confirm.show = true;
  }
  onrelay(no: number, state: RelayState) {
    this.confirm.language = `是否${
      state === RelayState.Closed ? '打开' : '关闭'
    }继电器?`;
    this.confirm.model = new ResetRelayParams();
    this.confirm.model.No = [no];

    switch (state) {
      case RelayState.Closed:
        this.confirm.model.Operator = VehicleRelayOperator.Open;
        break;
      case RelayState.Opened:
        this.confirm.model.Operator = VehicleRelayOperator.Close;
        break;
      default:
        break;
    }

    this.confirm.show = true;
  }

  onok() {
    if (this.model && this.confirm.model) {
      this.business
        .command(this.model.Id, this.confirm.model)
        .then((x) => {
          MessageBar.response_success('操作成功');
          this.model = x;
        })
        .catch((x) => {
          console.error(x);
        })
        .finally(() => {
          this.close();
        });
    }
  }
  close() {
    this.confirm.clear();
    this.confirm.show = false;
  }
}
