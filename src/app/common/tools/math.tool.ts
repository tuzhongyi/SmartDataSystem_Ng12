import { Point } from 'src/app/network/model/point.model';

export class MathTool {
  static distance(a: Point, b: Point) {
    let x = Math.abs(b.X - a.X);
    let y = Math.abs(b.Y - a.Y);
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  }
  static distance_coordinate(pointA: Point, pointB: Point) {
    let radLat1 = (pointA.Y * Math.PI) / 180.0;
    let radLat2 = (pointB.Y * Math.PI) / 180.0;
    let a = radLat1 - radLat2;
    let b = (pointA.X * Math.PI) / 180.0 - (pointB.X * Math.PI) / 180.0;
    let s =
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
        )
      );
    s = s * 6378.137; // EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
  }
}
