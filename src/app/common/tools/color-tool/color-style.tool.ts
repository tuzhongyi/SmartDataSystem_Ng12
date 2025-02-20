import { BatteryState } from 'src/app/enum/ai-garbage/battery-state.enum';
import { RobotState } from 'src/app/enum/ai-garbage/robot-state.enum';
import { StationState } from 'src/app/enum/station-state.enum';
import { Flags } from '../flags';

export class ColorStyleTool {
  text = {
    green: '#21e452',
    orange: '#ffba00',
    yellow: '#fde546',
    gray2: '#cccccc',
    red: {
      powder: '#ef6464',
    },
    blue: {
      sky2: '#6997ff',
    },
  };

  OnlineState(value?: number, cannull = true) {
    switch (value) {
      case 0:
        return this.text.green;
      case 1:
        return this.text.red.powder;
      default:
        if (cannull) return '';
        else return this.text.red.powder;
    }
  }
  SwitchState(value?: number) {
    switch (value) {
      case 0:
        return this.text.green;
      case 1:
        return this.text.red.powder;
      default:
        return '';
    }
  }

  YesOrNo(yes: boolean) {
    if (yes) {
      return this.text.green;
    } else {
      return this.text.red.powder;
    }
  }

  OpenState(value?: number, contrary: boolean = false) {
    if (value === undefined || value === null) return '';
    switch (value) {
      case 0:
        return contrary ? this.text.red.powder : this.text.green;
      case 1:
        return contrary ? this.text.green : this.text.red.powder;
      default:
        return '';
    }
  }

  BatteryState(value?: BatteryState) {
    switch (value) {
      case BatteryState.Normal:
      case BatteryState.Charging:
        return this.text.green;
      case BatteryState.Unable:
      case BatteryState.UnderVoltage:
        return this.text.red.powder;
      default:
        return '';
    }
  }
  BatteryLevel(value?: number) {
    if (Number.isFinite(value) && !!value) {
      if (value >= 50) {
        return this.text.green;
      } else if (value >= 20) {
        return this.text.orange;
      } else {
        return this.text.red.powder;
      }
    } else {
      return '';
    }
  }

  RobotState(value: RobotState) {
    switch (value) {
      case RobotState.Busy:
      case RobotState.Charging:
      case RobotState.None:
        return this.text.green;
      case RobotState.Upgrading:
      case RobotState.LoBAT:
        return this.text.orange;
      case RobotState.Error:
      case RobotState.Offline:
        return this.text.red.powder;

      default:
        return '';
    }
  }

  RobotStateDefault(values: RobotState[]) {
    let colors = values.map((x) => this.RobotState(x));
    let state = colors.find((x) => x === this.text.red.powder);
    if (state) {
      return state;
    }
    state = colors.find((x) => x === this.text.orange);
    if (state) {
      return state;
    }
    state = colors.find((x) => x === this.text.green);
    if (state) {
      return state;
    }
    return '';
  }

  GarbageDropState(handle: boolean, timeout: boolean) {
    if (handle) {
      if (timeout) {
        return this.text.orange;
      } else {
        return this.text.green;
      }
    } else {
      if (timeout) {
        return this.text.red.powder;
      } else {
        return this.text.orange;
      }
    }
  }

  StationState(state: StationState) {
    let flags = new Flags(state);
    if (flags.contains(StationState.Error)) {
      return this.text.gray2;
    } else if (flags.contains(StationState.Full)) {
      return this.text.yellow;
    } else {
      return this.text.green;
    }
  }

  IsHandle(state?: boolean) {
    if (state) {
      return this.text.green;
    }
    return this.text.orange;
  }

  SceneChange(value?: number) {
    switch (value) {
      case 0:
        return this.text.green;
      case 1:
        return this.text.orange;
      case 2:
        return this.text.red.powder;
      default:
        return '';
    }
  }
  ImageQuality(value?: number): string {
    switch (value) {
      case 0:
        return this.text.green;
      case 1:
        return this.text.orange;
      case 2:
        return this.text.red.powder;
      default:
        return '';
    }
  }
  Brightness(value?: number): string {
    switch (value) {
      case 0:
        return this.text.red.powder;
      case 1:
        return this.text.orange;
      case 2:
        return this.text.green;
      case 3:
        return this.text.orange;
      case 4:
        return this.text.red.powder;
      default:
        return '';
    }
  }
  Aberration(value?: number): string {
    switch (value) {
      case 0:
        return this.text.green;
      case 1:
        return this.text.orange;
      case 2:
        return this.text.red.powder;
      default:
        return '';
    }
  }
  Disturbance(value?: number): string {
    switch (value) {
      case 0:
        return this.text.green;
      case 1:
        return this.text.red.powder;
      default:
        return '';
    }
  }

  NBState(value?: number): string {
    switch (value) {
      case 0:
        return this.text.green;
      case 1:
      case 2:
        return this.text.red.powder;
      default:
        return '';
    }
  }

  RecordState(value?: number) {
    switch (value) {
      case 0:
        return this.text.green;
      case 1:
        return this.text.red.powder;
      default:
        return '';
    }
  }
  Signal(value?: number) {
    if (!value || value < 20) {
      return this.text.red.powder;
    } else if (value >= 20) {
      return this.text.orange;
    } else {
      return this.text.green;
    }
  }
}
