import { Injectable } from "@angular/core";
import { MqttComponent, } from "./mqtt";
import { EventPushService } from "./event-push.service";
import { IllegalDropEventRecord } from "../../model/event-record.model";
import { ConfigRequestService } from "../config/config-request.service";
import { MqttConnectionState } from "ngx-mqtt";
@Injectable({
    providedIn: 'root'
})
export class MQTTEventService {
    mqtt?: MqttComponent;
    constructor(private pushService: EventPushService, private configService: ConfigRequestService) {
        // this.mqtt = new MqttComponent('192.168.21.241', 15883);
        let hostname = document.location.hostname;
        if (hostname == "127.0.0.1" || hostname == "localhost") {
            hostname = "garbage01.51hws.com"
        }
        configService.getMQTT().subscribe(x =>
            this.mqtt = new MqttComponent(hostname, x.Port, x.Username, x.Password));
    }

    listenerIllegalDrop(divisionsId?: string) {
        var topic = 'AIOP/Garbage/Counties/';
        topic += (divisionsId ? divisionsId : '+') + '/Committees/+/GarbageStations/+/Events/1';

        // console.log(topic);
        setTimeout(() => {
            if (this.mqtt) {
                this.mqtt.subscription(topic, (topic: string, message: string) => {

                    const msg = JSON.parse(message) as IllegalDropEventRecord;
                    //console.log(msg);
                    this.pushService.pushIllegalDrop.emit(msg);
                });
                this.mqtt.connectionState.subscribe((x) => {
                    const state = x != MqttConnectionState.CLOSED;
                    this.pushService.connectionState.emit(state);
                });
            }
        }, 500);

    }

    unlistenerIllegalDrop() {
        if (this.mqtt) {
            this.mqtt.ngOnDestroy();
        }
    }
}
