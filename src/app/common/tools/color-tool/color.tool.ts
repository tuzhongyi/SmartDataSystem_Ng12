import { BatteryState } from 'src/app/enum/ai-garbage/battery-state.enum';
import { RobotState } from 'src/app/enum/ai-garbage/robot-state.enum';
import { StationState } from 'src/app/enum/station-state.enum';
import { Flags } from '../flags';

export class ColorTool {
  static OnlineState(value?: number, cannull = true) {
    switch (value) {
      case 0:
        return 'green-text';
      case 1:
        return 'powder-red-text';
      default:
        if (cannull) return '';
        else return 'powder-red-text';
    }
  }
  static SwitchState(value?: number) {
    switch (value) {
      case 0:
        return 'green-text';
      case 1:
        return 'powder-red-text';
      default:
        return '';
    }
  }

  static YesOrNo(yes: boolean) {
    if (yes) {
      return 'green-text';
    } else {
      return 'powder-red-text';
    }
  }

  static OpenState(value?: number, contrary: boolean = false) {
    if (value === undefined || value === null) return '';
    switch (value) {
      case 0:
        return contrary ? 'powder-red-text' : 'green-text';
      case 1:
        return contrary ? 'green-text' : 'powder-red-text';
      default:
        return '';
    }
  }

  static BatteryState(value?: BatteryState) {
    switch (value) {
      case BatteryState.Normal:
      case BatteryState.Charging:
        return 'green-text';
      case BatteryState.Unable:
      case BatteryState.UnderVoltage:
        return 'powder-red-text';
      default:
        return '';
    }
  }
  static BatteryLevel(value?: number) {
    if (Number.isFinite(value) && !!value) {
      if (value >= 50) {
        return 'green-text';
      } else if (value >= 20) {
        return 'orange-text';
      } else {
        return 'powder-red-text';
      }
    } else {
      return '';
    }
  }

  static RobotState(value: RobotState) {
    switch (value) {
      case RobotState.Busy:
      case RobotState.Charging:
      case RobotState.None:
        return 'green-text';
      case RobotState.Upgrading:
      case RobotState.LoBAT:
        return 'orange-text';
      case RobotState.Error:
      case RobotState.Offline:
        return 'powder-red-text';

      default:
        return '';
    }
  }

  static RobotStateDefault(values: RobotState[]) {
    let colors = values.map((x) => this.RobotState(x));
    let state = colors.find((x) => x === 'powder-red-text');
    if (state) {
      return state;
    }
    state = colors.find((x) => x === 'orange-text');
    if (state) {
      return state;
    }
    state = colors.find((x) => x === 'green-text');
    if (state) {
      return state;
    }
    return '';
  }

  static GarbageDropState(handle: boolean, timeout: boolean) {
    if (handle) {
      if (timeout) {
        return 'sky-blue-text2';
      } else {
        return 'green-text';
      }
    } else {
      if (timeout) {
        return 'powder-red-text';
      } else {
        return 'orange-text';
      }
    }
  }

  static StationState(state: StationState) {
    let flags = new Flags(state);
    if (flags.contains(StationState.Error)) {
      return 'gray-2-text';
    } else if (flags.contains(StationState.Full)) {
      return 'yellow-text';
    } else {
      return 'green-text';
    }
  }

  static IsHandle(state?: boolean) {
    if (state) {
      return 'green-text';
    }
    return 'orange-text';
  }
}
