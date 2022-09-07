import { EventEmitter, Injectable } from '@angular/core';
import { HowellMqttService } from './mqtt-service';
import { EventPushService } from './event-push.service';
import { ConfigRequestService } from '../config/config-request.service';
import { DisarmMessage } from './disarm.message';
import { EventRecord } from '../../model/event-record.model';
import { wait } from 'src/app/common/tools/tool';
import { EventType } from 'src/app/enum/event-type.enum';
@Injectable({
  providedIn: 'root',
})
export class MQTTEventService {
  mqtt?: HowellMqttService;
  loaded = false;
  constructor(
    public pushService: EventPushService,
    configService: ConfigRequestService
  ) {
    // this.mqtt = new MqttComponent('192.168.21.241', 15883);
    let hostname = document.location.hostname;
    if (hostname == '127.0.0.1' || hostname == 'localhost') {
      hostname = 'iebs.51hws.cn';
    }
    configService.getMQTT().subscribe((x) => {
      this.mqtt = new HowellMqttService(
        hostname,
        x.Port,
        x.Username,
        x.Password
      );
      this.loaded = true;
    });
  }

  listenerStationEvent(divisionsId?: string, ...types: EventType[]) {
    wait(
      () => {
        return this.loaded;
      },
      () => {
        if (this.mqtt) {
          if (types && types.length > 0) {
            for (let i = 0; i < types.length; i++) {
              const type = types[i];
              let topic = `AIOP/Garbage/Counties/${
                divisionsId ?? '+'
              }/Committees/+/GarbageStations/+/Events/${type}`;
              this.mqtt.subscription(
                topic,
                (topic: string, message: string) => {
                  const msg = JSON.parse(message) as EventRecord;
                  this.pushService.pushEvent.emit(msg);
                }
              );
            }
          } else {
            let topic = 'AIOP/Garbage/Counties/';
            topic +=
              (divisionsId ? divisionsId : '+') +
              '/Committees/+/GarbageStations/+/Events/+';
            this.mqtt.subscription(topic, (topic: string, message: string) => {
              const msg = JSON.parse(message) as EventRecord;
              this.pushService.pushEvent.emit(msg);
            });
          }
        }
      }
    );
  }

  smokeEventListener() {
    let topic = `AIOP/Resources/Cameras/+/Artemis/IOStatus/+`;

    wait(
      () => {
        return this.loaded;
      },
      () => {
        if (this.mqtt) {
          this.mqtt.subscription(topic, (topic: string, message: string) => {
            const msg = JSON.parse(message) as EventRecord;
            //console.log(msg);
            this.pushService.pushEvent.emit(msg);
          });
          // this.mqtt.connectionState.subscribe((x) => {
          //   const state = x != MqttConnectionState.CLOSED;
          //   this.pushService.connectionState.emit(state);
          // });
        }
      }
    );
  }

  smoke(
    id: string,
    name: string,
    messageId: string = '1293819274174094',
    status: number = 0
  ) {
    if (this.mqtt) {
      let topic = `AIOP/Resources/Cameras/${id}/Artemis/IOStatus/${status}`;
      let message = new DisarmMessage();
      message.Id = messageId;
      message.Data.Id = id;
      message.Data.Name = name;
      message.Data.IOStatus = status;
      this.mqtt.unsafePublish(topic, JSON.stringify(message));
    }
  }

  unlistenerIllegalDrop() {
    if (this.mqtt) {
      this.mqtt.destroy();
    }
  }
}
