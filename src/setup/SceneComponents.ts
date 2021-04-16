import { Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class SceneComponents {
  private readonly container: HTMLDivElement;
  private readonly width: number;
  private readonly height: number;
  private readonly color: Color;
  private readonly _renderer: WebGLRenderer;
  private readonly _camera: PerspectiveCamera;
  private readonly _scene: Scene;
  private readonly _controls: OrbitControls;

  constructor(
    container: HTMLDivElement,
    width: number,
    height: number,
    color: Color | string | number
  ) {
    this.container = container;
    this.width = width;
    this.height = height;
    this.color = new Color(color);
    this._renderer = this.initRenderer();
    this._camera = this.initCamera();
    this._scene = this.initScene();
    this._controls = this.initControls();
  }

  public get renderer() {
    return this._renderer;
  }
  public get camera() {
    return this._camera;
  }
  public get scene() {
    return this._scene;
  }
  public get controls() {
    return this._controls;
  }

  private initRenderer(): WebGLRenderer {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    this.container.append(renderer.domElement);
    return renderer;
  }

  private initCamera(): PerspectiveCamera {
    const camera = new PerspectiveCamera(45, this.width / this.height, 1, 1000);
    camera.position.set(0, 0, 500);
    return camera;
  }

  private initScene(): Scene {
    const scene = new Scene();
    scene.background = this.color;
    return scene;
  }

  private initControls(): OrbitControls {
    const controls = new OrbitControls(this._camera, this._renderer.domElement);
    controls.minDistance = 100;
    controls.maxDistance = 500;
    return controls;
  }
}
