import { Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class SceneComponents {
  private readonly container: HTMLDivElement;
  private readonly _color: Color;
  private readonly _renderer: WebGLRenderer;
  private readonly _camera: PerspectiveCamera;
  private readonly _scene: Scene;
  private readonly _controls: OrbitControls;
  private _width: number;
  private _height: number;

  constructor(container: HTMLDivElement, color: Color | string | number) {
    this.container = container;
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._color = new Color(color);
    this._renderer = this.initRenderer();
    this._camera = this.initCamera();
    this._scene = this.initScene();
    this._controls = this.initControls();
  }

  public get camera() {
    return this._camera;
  }
  public get scene() {
    return this._scene;
  }

  public handleResize(width: number, height: number) {
    this._width = width;
    this._height = height;
    this._renderer.setSize(width, height);
    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();
    this.render();
  }

  public render() {
    this._renderer.render(this._scene, this._camera);
  }

  private initRenderer(): WebGLRenderer {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.append(renderer.domElement);
    return renderer;
  }

  private initCamera(): PerspectiveCamera {
    const camera = new PerspectiveCamera(
      45,
      this._width / this._height,
      1,
      1000
    );
    camera.position.set(0, 0, 500);
    return camera;
  }

  private initScene(): Scene {
    const scene = new Scene();
    scene.background = this._color;
    return scene;
  }

  private initControls(): OrbitControls {
    const controls = new OrbitControls(this._camera, this._renderer.domElement);
    controls.minDistance = 100;
    controls.maxDistance = 500;
    return controls;
  }
}
