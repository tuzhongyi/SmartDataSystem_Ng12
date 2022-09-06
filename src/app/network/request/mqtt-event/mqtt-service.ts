/**
 * Developer
 * LastUpdateTime
 */

import { Subscription } from 'rxjs';
import { IMqttMessage, IMqttServiceOptions, MqttService } from 'ngx-mqtt';

export class HowellMqttService {
  private _subscription?: Subscription;
  private MQTT_SERVICE_OPTIONS: IMqttServiceOptions;
  private _mqttService: MqttService;
  constructor(host: string, port: number, username: string, pwd: string) {
    this.MQTT_SERVICE_OPTIONS = {
      hostname: host,
      port: port,
      path: '/',
      username: username,
      password: pwd,
    };
    this._mqttService = new MqttService(this.MQTT_SERVICE_OPTIONS);
    this._mqttService.state.subscribe((x) => {});
  }

  get connectionState() {
    return this._mqttService.state;
  }
  public subscription(topic: string, fn?: Function) {
    this._subscription = this._mqttService
      .observe(topic)
      .subscribe((message: IMqttMessage) => {
        if (fn) {
          fn(message.topic, message.payload.toString());
        }
      });
  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, { qos: 1, retain: true });
  }

  public destroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
