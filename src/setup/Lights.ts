import { AmbientLight, PointLight, Scene, Vector3 } from 'three';

export default class Lights {
  private readonly _ambientLight: AmbientLight;
  private readonly _pointLight: PointLight;
  private readonly _scene: Scene;

  constructor(scene: Scene, position: Vector3 = new Vector3()) {
    this._ambientLight = new AmbientLight('#444');
    this._pointLight = new PointLight('#fff');
    this.position = position;
    this._scene = scene;
    this._scene.add(this._ambientLight, this._pointLight);
  }

  set position(position: Vector3) {
    this._pointLight.position.copy(position);
  }
}
