import { MathUtils, Vector3 } from 'three';

export default class RandomShape {
  private static readonly numOfPoints = 20;
  private static readonly range = 50;
  private readonly chunkSize: number;
  private readonly points: Vector3[] = [];
  constructor(
    numOfPoints = RandomShape.numOfPoints,
    range = RandomShape.range
  ) {
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
  }
}
