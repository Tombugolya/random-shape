import DSU from '../utils/DataStructureUtils';
import MU from '../utils/MathUtils';
import {
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  MathUtils,
  Mesh,
  MeshLambertMaterial,
  Scene,
  Vector3,
} from 'three';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export default class RandomShape {
  private static readonly divisions = 50;
  private readonly numOfPoints: number;
  private readonly chunkSize: number;
  private readonly range: number;
  private readonly scene: Scene;
  private color: Color;
  private object: Mesh<BufferGeometry, MeshLambertMaterial>;
  private points: Vector3[] = [];
  private chunkPoints: Vector3[][] = [];

  constructor(
    scene: Scene,
    numOfPoints?: number,
    range?: number,
    chunkSize?: number
  ) {
    this.scene = scene;
    this.color = new Color(MU.generateRandomHexadecimal());
    this.numOfPoints = numOfPoints || 20;
    this.range = numOfPoints || 50;
    this.chunkSize = chunkSize || MathUtils.randInt(4, 7);
    this.object = this.generateShape();
    window.addEventListener('keydown', this.onKeyDown);
    this.scene.add(this.object);
  }

  public generateShape(
    tension: number = MathUtils.randFloat(0, 1)
  ): Mesh<BufferGeometry, MeshLambertMaterial> {
    this.points = this.generatePoints();
    this.chunkPoints = DSU.chunk([...this.points], this.chunkSize);
    const material = new MeshLambertMaterial();
    material.color = this.color;
    return new Mesh(this.generateGeometry(tension), material);
  }

  public updateTension(tension: number): void {
    this.object.geometry.dispose();
    this.object.geometry = this.generateGeometry(tension);
  }

  private generatePoints(): Vector3[] {
    const points: Vector3[] = [];
    for (let i = 0; i < this.numOfPoints; i++) {
      points.push(
        new Vector3(
          MathUtils.randFloat(-this.range, this.range),
          MathUtils.randFloat(-this.range, this.range),
          MathUtils.randFloat(-this.range, this.range)
        )
      );
    }
    return points;
  }

  private generateGeometry(tension: number): BufferGeometry {
    const geometries: ConvexGeometry[] = [];
    for (let i = 0; i < this.chunkPoints.length; i++) {
      geometries.push(
        new ConvexGeometry(
          new CatmullRomCurve3(
            this.chunkPoints[i],
            true,
            'catmullrom',
            tension
          ).getPoints(RandomShape.divisions)
        )
      );
    }
    return BufferGeometryUtils.mergeBufferGeometries(geometries);
  }

  private generateNewShape(): void {
    this.object.geometry.dispose();
    this.object.material.dispose();
    this.scene.remove(this.object);
    this.object = this.generateShape();
    this.scene.add(this.object);
  }

  private generateNewColor(): void {
    this.color = new Color(MU.generateRandomHexadecimal());
    this.object.material.color = this.color;
  }

  private onKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case 'r':
      case 'R':
        this.generateNewShape();
        break;
      case 'c':
      case 'C':
        this.generateNewColor();
        break;
    }
  };
}
