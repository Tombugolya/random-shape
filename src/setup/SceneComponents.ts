import { Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class SceneComponents {
  readonly #container: HTMLDivElement;
  readonly #color: Color;
  readonly #renderer: WebGLRenderer;
  readonly #camera: PerspectiveCamera;
  readonly #scene: Scene;
  readonly #controls: OrbitControls;
  #width: number;
  #height: number;

  constructor(container: HTMLDivElement, color: Color | string | number) {
    this.#container = container;
    this.#width = window.innerWidth;
    this.#height = window.innerHeight;
    this.#color = new Color(color);
    this.#renderer = this.initRenderer();
    this.#camera = this.initCamera();
    this.#scene = this.initScene();
    this.#controls = this.initControls();
  }

  public get camera(): PerspectiveCamera {
    return this.#camera;
  }
  public get scene(): Scene {
    return this.#scene;
  }

  public handleResize(width: number, height: number) {
    this.#width = width;
    this.#height = height;
    this.#renderer.setSize(width, height);
    this.#camera.aspect = width / height;
    this.#camera.updateProjectionMatrix();
    this.render();
  }

  public render() {
    this.#renderer.render(this.scene, this.camera);
  }

  private initRenderer(): WebGLRenderer {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.#container.append(renderer.domElement);
    return renderer;
  }

  private initCamera(): PerspectiveCamera {
    const camera = new PerspectiveCamera(
      45,
      this.#width / this.#height,
      1,
      1000
    );
    camera.position.set(0, 0, 500);
    return camera;
  }

  private initScene(): Scene {
    const scene = new Scene();
    scene.background = this.#color;
    return scene;
  }

  private initControls(): OrbitControls {
    const controls = new OrbitControls(this.#camera, this.#renderer.domElement);
    controls.minDistance = 100;
    controls.maxDistance = 500;
    return controls;
  }
}
