import { formatDate } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
import { MathTool } from 'src/app/common/tools/math.tool';
import { wait } from 'src/app/common/tools/tool';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { GisRoutePoint } from 'src/app/network/model/gis-point.model';
import { CollectionMapControlConverter } from '../collection-map-control/collection-map-control.converter';
import { ICollectionMapRouteBusiness } from './collection-map-route.model';

@Injectable()
export class CollectionMapRouteBusiness implements ICollectionMapRouteBusiness {
  constructor(private converter: CollectionMapControlConverter) {}
  get src(): string {
    const host = document.location.hostname;
    const port = document.location.port;
    //let date = this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const date = formatDate(new Date(), 'yyyyMMddHHmmss', 'en');

    return `http://${host}:${port}/amap/map_ts.html?maptype=2D&v=${date}`;
  }
  seek: EventEmitter<GisRoutePoint> = new EventEmitter();
  private loaded = false;
  private client!: CesiumMapClient;
  private point?: CesiumDataController.Point;
  // private routeId?: string;
  private route?: {
    id: string;
    points: GisRoutePoint[];
  };
  init(iframe: HTMLIFrameElement): void {
    this.client = new CesiumMapClient(iframe);
    this.client.Events.OnLoaded = () => {
      this.loaded = true;
    };
    this.client.Events.OnRouteClick = (
      position: CesiumDataController.Position
    ) => {
      if (this.route && this.route.points.length > 0) {
        let distance = Number.MAX_VALUE;
        let gis: GisRoutePoint = this.route.points[0];
        let p = this.converter.Position(position, gis.GisType);
        this.route.points.forEach((x) => {
          let value = MathTool.distance_coordinate(
            {
              X: x.Longitude,
              Y: x.Latitude,
            },
            {
              X: p[0],
              Y: p[1],
            }
          );
          if (value < distance) {
            gis = x;
            distance = value;
          }
        });
        this.seek.emit(gis);
      }
    };
    // this.client.Events.OnLoaded = this.loaded.bind(this);
  }

  load(source: GarbageVehicle) {
    return new Promise<boolean>((resolve) => {
      wait(
        () => {
          return !!this.client && this.loaded;
        },
        () => {
          if (this.point) {
            this.client.Point.Remove(this.point.id);
          }

          this.client.Village.Basic(source.DivisionId!);
          this.point = this.converter.GarbageVehicle(source);
        }
      );

      resolve(true);
      // this.client.Point.Create(this.point);
      // this.client.Viewer.MoveTo(this.point.position);
    });
  }

  ready(points: GisRoutePoint[]) {
    wait(
      () => {
        return !!this.client && this.loaded && !!this.point;
      },
      () => {
        if (this.route) {
          this.client.Draw.Route.Remove(this.route.id);
        }
        let positions = points.map((x) => this.converter.GisPoint(x));
        let opts = new CesiumDataController.DrawLineOptions();
        opts.img = 'img/route/vehicle.png';
        let routeId = this.client.Draw.Route.Create(positions, opts);
        if (this.point) {
          this.client.Point.Remove(this.point.id);
          this.point.position = positions[0];
          this.client.Point.Create(this.point);
          this.client.Viewer.Focus(this.point.villageId);
        }
        this.route = {
          id: routeId,
          points: points,
        };
      }
    );
  }

  routing(date: Date) {
    wait(
      () => {
        return !!this.client && this.loaded;
      },
      () => {
        if (this.route && this.client && this.point) {
          let routed = this.route.points.filter(
            (x) => x.Time.getTime() <= date.getTime()
          );
          let positions = routed.map((x) => this.converter.GisPoint(x));
          this.client.Draw.Route.Set(this.route.id, positions);
          this.point.position = positions[positions.length - 1];
          let opts: CesiumDataController.PointOptions = {
            id: this.point.id,
            position: this.point.position,
          };
          this.client.Point.Set([opts]);
        }
      }
    );
  }
}
