import DSU from '../utils/DataStructureUtils';
import MU from '../utils/MathUtils';
import {
  BufferGeometry,
  CatmullRomCurve3,
  MathUtils,
  Mesh,
  MeshLambertMaterial,
  Scene,
  Vector3,
} from 'three';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export default class RandomShape {
  private static readonly numOfPoints = 20;
  private static readonly range = 50;
  private readonly scene: Scene;
  private readonly chunkSize: number;
  private readonly points: Vector3[] = [];
  private readonly chunkPoints: Vector3[][] = [];
  private readonly geometry: BufferGeometry;
  private readonly material: MeshLambertMaterial;
  private readonly object: Mesh<BufferGeometry, MeshLambertMaterial>;

  constructor(
    scene: Scene,
    numOfPoints = RandomShape.numOfPoints,
    range = RandomShape.range
  ) {
    const geometries: ConvexGeometry[] = [];
    this.scene = scene;
    for (let i = 0; i < numOfPoints; i++) {
      this.points.push(
        new Vector3(
          MathUtils.randFloat(-range, range),
          MathUtils.randFloat(-range, range),
          MathUtils.randFloat(-range, range)
        )
      );
    }
    this.chunkSize = MathUtils.randInt(2, 10);
    this.chunkPoints = DSU.chunk([...this.points], this.chunkSize);
    for (let i = 0; i < this.chunkPoints.length; i++) {
      geometries.push(
        new ConvexGeometry(
          new CatmullRomCurve3(this.chunkPoints[i], true).getPoints(50)
        )
      );
    }
    this.geometry = BufferGeometryUtils.mergeBufferGeometries(geometries);
    this.material = new MeshLambertMaterial({
      color: MU.generateRandomHexadecimal(),
      wireframe: false,
    });
    this.object = new Mesh(this.geometry, this.material);
    this.scene.add(this.object);
  }
}
