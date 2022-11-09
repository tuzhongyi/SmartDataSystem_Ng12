/*
 * @Author: pmx 
 * @Date: 2022-11-06 15:08:30 
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-06 15:35:43
 */
import { StreamType } from 'src/app/enum/stream-type.enum';
import { VideoProtocol } from 'src/app/enum/video-protocol.enum';
import { DurationParams, IParams } from '../IParams.interface';

export class GetVehiclePreviewUrlParams implements IParams {
  // 监控点ID
  CameraId!: string;

  // 流类型：1-主码流，2-子码流
  StreamType: StreamType = StreamType.sub;

  // rtmp, rtsp, hls, ws-flv, ws-ps
  Protocol: VideoProtocol = VideoProtocol.ws_ps;
}

export class GetVehicleVodUrlParams extends DurationParams implements IParams {
  // 监控点ID
  CameraId!: string;

  // 流类型：1-主码流，2-子码流
  StreamType: StreamType = StreamType.main;

  // rtmp, rtsp, hls, ws-flv, ws-ps
  Protocol: VideoProtocol = VideoProtocol.ws_ps;
}
