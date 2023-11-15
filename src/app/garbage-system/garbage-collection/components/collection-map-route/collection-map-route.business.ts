import { formatDate } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
import { MathTool } from 'src/app/common/tools/math.tool';
import { wait } from 'src/app/common/tools/tool';
import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';
import { GisRoutePoint } from 'src/app/network/model/garbage-station/gis-point.model';
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
    let protocol = document.location.protocol;
    if (protocol.indexOf(':') < 0) {
      protocol += ':';
    }
    return `${protocol}//${host}:${port}/amap/map_ts.html?maptype=2D&v=${date}`;
  }
  seek: EventEmitter<GisRoutePoint> = new EventEmitter();
  private loaded = false;
  private client!: CesiumMapClient;
  private point?: CesiumDataController.Point;
  // private routeId?: string;
  private path?: GisRoutePath;
  init(iframe: HTMLIFrameElement): void {
    this.client = new CesiumMapClient(iframe);
    this.client.Events.OnLoaded = () => {
      this.loaded = true;
    };
    this.client.Events.OnRouteClick = (
      position: CesiumDataController.Position
    ) => {
      if (this.path && this.path.points.length > 0) {
        let distance = Number.MAX_VALUE;
        let gis: GisRoutePoint = this.path.points[0];
        let p = this.converter.Position(position, gis.GisType);
        this.path.points.forEach((x) => {
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

          this.client.Village.Basic(source.DivisionId!, false);
          this.client.Viewer.Focus(source.DivisionId!);
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
        if (this.path) {
          this.client.Draw.Route.Remove(this.path.id);
        }
        if (!points || points.length === 0) return;
        let positions = points.map((x) => this.converter.GisPoint(x));
        let opts = new CesiumDataController.DrawRouteOptions();

        opts.route = new CesiumDataController.DrawLineOptions();
        opts.route.img = 'img/route/vehicle_route.png';
        opts.route.alpha = 1;
        opts.route.width = 8;
        opts.route.color = '#666666';
        opts.route.outline = new CesiumDataController.DrawOutlineOptions();
        opts.route.outline.enabled = true;
        opts.route.outline.color = '#888888';

        opts.passed = new CesiumDataController.DrawLineOptions();
        opts.passed.alpha = 0.5;
        opts.passed.color = '#23e353';
        opts.passed.width = 8;
        opts.passed.outline = new CesiumDataController.DrawOutlineOptions();
        opts.passed.outline.enabled = true;
        opts.passed.outline.color = '#adff2f';

        let routeId = this.client.Draw.Route.Create(positions, opts);
        if (this.point) {
          this.client.Point.Remove(this.point.id);
          this.point.position = positions[0];
          this.client.Point.Create(this.point);
        }
        this.path = {
          id: routeId,
          points: points,
        };
      }
    );
  }

  route(
    date: Date,
    position?: CesiumDataController.Position,
    focus: boolean = false
  ) {
    wait(
      () => {
        return !!this.client && this.loaded;
      },
      () => {
        if (this.path && this.client && this.point) {
          let routed = this.path.points.filter(
            (x) => x.Time.getTime() <= date.getTime()
          );
          let positions = routed.map((x) => this.converter.GisPoint(x));
          if (position) {
            positions.pop();
            positions.push(position);
          }
          this.point.position = positions[positions.length - 1];
          this.routing(this.path.id, this.point, positions, focus);
        }
      }
    );
  }
  private routing(
    pathId: string,
    point: CesiumDataController.Point,
    positions: CesiumDataController.Position[],
    focus: boolean
  ) {
    this.client.Draw.Route.Set(pathId, positions);
    let opts: CesiumDataController.PointOptions = {
      id: point.id,
      position: point.position,
    };
    this.client.Point.Set([opts]);
    if (focus) {
      this.client.Viewer.MoveTo(point.position);
    }
  }
}

interface GisRoutePath {
  id: string;
  points: GisRoutePoint[];
}
