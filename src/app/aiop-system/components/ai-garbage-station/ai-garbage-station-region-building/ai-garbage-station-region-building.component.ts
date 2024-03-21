import { Component, Input, OnInit } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { AIGarbageBuilding } from 'src/app/network/model/ai-garbage/building.model';
import { AIGarbageRegion } from 'src/app/network/model/ai-garbage/region.model';
import { AIGarbageRoom } from 'src/app/network/model/ai-garbage/room.model';

@Component({
  selector: 'app-ai-garbage-station-region-building',
  templateUrl: './ai-garbage-station-region-building.component.html',
  styleUrls: ['./ai-garbage-station-region-building.component.less'],
  providers: [],
})
export class AIGarbageStationRegionBuildingComponent implements OnInit {
  @Input()
  model?: AIGarbageRegion;
  ngOnInit(): void {
    if (this.model) {
      if (this.debug) {
        this.model = this.test(this.model);
      }
      if (this.model.Buildings && this.model.Buildings.length > 0) {
        this.selected = this.model.Buildings[0];
      }
    }
  }
  selected?: AIGarbageBuilding;
  Language = Language;
  debug = false;

  test(model: AIGarbageRegion) {
    model.Buildings = [];
    let height = 18;
    for (let i = 0; i < 16; i++) {
      let building = new AIGarbageBuilding();
      building.BuildingNo = (i + 1).toString();
      building.Description = '测试';
      building.Rooms = [];
      for (let f = 0; f < height; f++) {
        for (let r = 0; r < 4; r++) {
          let room = new AIGarbageRoom();
          room.Floor = `F${f + 1}`;
          room.RoomNo = `${f + 1}0${r + 1}`;
          room.Description = 'aaaaaaaaaaaaa';
          building.Rooms.push(room);
        }
      }
      model.Buildings.push(building);
    }
    return model;
  }
  onselect(item: AIGarbageBuilding) {
    this.selected = item;
  }
}
