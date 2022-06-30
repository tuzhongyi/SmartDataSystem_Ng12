export enum GarbageTaskStatus {
  unhandled = 0b00,
  handled = 0b01,
  timeout = 0b10,
  timeout_handled = 0b11,
}
