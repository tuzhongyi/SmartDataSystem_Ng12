import { Injectable } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { AMapClient } from './amap.client';
import { AMapEvent } from './amap.event';
import { AMapService } from './amap.service';

@Injectable()
export class AMapPointContextMenuBusiness {
  constructor(
    private service: AMapService,
    private amap: AMapClient,
    private event: AMapEvent
  ) {}
  async init() {
    let client = await this.amap.client;
    client.ContextMenu.AddItem(
      `<i class="howell-icon-nolittering" style="font-size: 18px"></i> ${Language.json.EventType.IllegalDrop}${Language.json.record}`,
      async (id: string) => {
        this.event.menu.click.emit();

        let station = this.amap.source.all.find((x) => x.Id === id);
        if (!station) {
          const station = await this.service.get(id);
          this.amap.source.all.push(station);
        }
        this.event.menu.illegaldrop.emit(station);
      },
      0
    );
    client.ContextMenu.AddItem(
      `<i class="howell-icon-mixlittering" style="font-size: 18px"></i> ${Language.json.EventType.MixedInto}${Language.json.record}`,
      async (id: string) => {
        this.event.menu.click.emit();

        let station = this.amap.source.all.find((x) => x.Id === id);
        if (!station) {
          const station = await this.service.get(id);
          this.amap.source.all.push(station);
        }
        this.event.menu.mixedinto.emit(station);
      },
      1
    );
    client.ContextMenu.AddItem(
      `<i class="howell-icon-garbagebags" style="font-size: 18px"></i> ${Language.json.small}${Language.json.garbage}${Language.json.stay}`,
      async (id: string) => {
        this.event.menu.click.emit();

        let station = this.amap.source.all.find((x) => x.Id === id);
        if (!station) {
          const station = await this.service.get(id);
          this.amap.source.all.push(station);
        }
        this.event.menu.garbagedrop.emit(station);
      },
      2
    );

    client.ContextMenu.AddItem(
      `<i class="howell-icon-Subsystem" style="font-size: 18px"></i> ${Language.json.station}${Language.json.info}`,
      async (id: string) => {
        this.event.menu.click.emit();
        const status = document.getElementsByClassName(
          'map-bar status'
        )[0] as HTMLElement;
        if (status) {
          status['style'].display = 'none';
        }
        let station = this.amap.source.all.find((x) => x.Id === id);
        if (!station) {
          const station = await this.service.get(id);
          this.amap.source.all.push(station);
        }
        this.event.menu.information.emit(station);
      },
      3
    );
    client.ContextMenu.AddItem(
      `<i class="howell-icon-video" style="font-size: 18px"></i> ${Language.json.station}${Language.json.video}`,
      async (id: string) => {
        let station = this.amap.source.all.find((x) => x.Id === id);
        if (!station) {
          const station = await this.service.get(id);
          this.amap.source.all.push(station);
        }
        this.event.menu.video.emit(station);
      },
      4
    );

    client.ContextMenu.Enable();
  }

  async open(point: CesiumDataController.Point) {
    let client = await this.amap.client;
    client.ContextMenu.Open(point);
  }
  async close() {
    let client = await this.amap.client;
    client.ContextMenu.Close();
  }
}
