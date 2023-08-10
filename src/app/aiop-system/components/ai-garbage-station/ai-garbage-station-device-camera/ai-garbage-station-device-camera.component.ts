import { Component, Input, OnInit } from "@angular/core";
import { Language } from "src/app/common/tools/language";
import { AIGarbageCamera } from "src/app/network/model/ai-garbage/camera.model";
import { AIGarbageDevice } from "src/app/network/model/ai-garbage/garbage-device.model";

@Component({
  selector: "app-ai-garbage-station-device-camera",
  templateUrl: "./ai-garbage-station-device-camera.component.html",
  styleUrls: ["./ai-garbage-station-device-camera.component.less"],
  providers: [],
})
export class AIGarbageStationDeviceCameraComponent implements OnInit {
  @Input()
  model?: AIGarbageDevice;
  ngOnInit(): void {
    if (this.model) {
      if (this.model.Cameras && this.model.Cameras.length > 0) {
        this.selected = this.model.Cameras[0];
      }
    }
  }
  selected?: AIGarbageCamera;
  Language = Language;
}
