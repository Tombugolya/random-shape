import { AmbientLight, PointLight, Scene, Vector3 } from 'three';

export default class Lights {
  private readonly ambientLight: AmbientLight;
  private readonly point: PointLight;
  private readonly scene: Scene;

  constructor(scene: Scene, position: Vector3 = new Vector3()) {
    this.ambientLight = new AmbientLight('#444');
    this.point = new PointLight('#fff');
    this.position = position;
    this.scene = scene;
    this.scene.add(this.ambientLight, this.point);
  }

  set position(position: Vector3) {
    this.point.position.copy(position);
  }
}
