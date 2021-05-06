import { AmbientLight, PointLight, Scene, Vector3 } from 'three';

export default class Lights {
  readonly #ambientLight: AmbientLight;
  readonly #pointLight: PointLight;
  readonly #scene: Scene;

  constructor(scene: Scene, position: Vector3 = new Vector3()) {
    this.#ambientLight = new AmbientLight('#444');
    this.#pointLight = new PointLight('#fff');
    this.position = position;
    this.#scene = scene;
    this.#scene.add(this.#ambientLight, this.#pointLight);
  }

  set position(position: Vector3) {
    this.#pointLight.position.copy(position);
  }
}
