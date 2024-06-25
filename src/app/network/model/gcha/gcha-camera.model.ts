import { AIGarbageCamera } from '../ai-garbage/camera.model';

/**	Camera(摄像机信息)	*/
export class GCHACamera extends AIGarbageCamera {
  /**	Int32	垃圾滞留数量，0：没有滞留	O	*/
  Drop?: number;
}
