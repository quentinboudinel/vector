class Vector extends Array {
  static add(u: Vector, v: Vector): Vector {
    const dimension = Math.min(
      u.dimension,
      v.dimension,
    );
    const sumCoordinates = new Array(dimension)
      .fill(0);
    for (let d = 0; d < dimension; d++) {
      sumCoordinates[d] = u[d] + v[d];
    }
    const sum = new Vector(...sumCoordinates);
    return sum;
  }

  static sub(u: Vector, v: Vector): Vector {
    const dimension = Math.min(
      u.dimension,
      v.dimension,
    );
    const differenceCoordinates = new Array(dimension)
      .fill(0);
    for (let d = 0; d < dimension; d++) {
      differenceCoordinates[d] = u[d] - v[d];
    }
    const difference = new Vector(...differenceCoordinates);
    return difference;
  }

  static times(u: number | Vector, v: number | Vector): Vector {
    if (typeof u === 'number' && typeof v === 'number') {
      return new Vector(u*v);
    }
    if (typeof u === 'number' && v instanceof Vector) {
      const dimension = v.dimension;
      const productCoordinates = new Array(dimension)
        .fill(1);
      for (let d = 0; d < dimension; d++) {
        productCoordinates[d] = u*v[d];
      }
      const product = new Vector(...productCoordinates);
      return product;
    }
    if (u instanceof Vector && typeof v === 'number') {
      const dimension = u.dimension;
      const productCoordinates = new Array(dimension)
        .fill(1);
      for (let d = 0; d < dimension; d++) {
        productCoordinates[d] = v*u[d];
      }
      const product = new Vector(...productCoordinates);
      return product;
    }
    if (u instanceof Vector && v instanceof Vector) {
      const dimension = Math.min(
        u.dimension,
        v.dimension,
      );
      const productCoordinates = new Array(dimension)
        .fill(1);
      for (let d = 0; d < dimension; d++) {
        productCoordinates[d] = u[d]*v[d];
      }
      const product = new Vector(...productCoordinates);
      return product;
    }
    throw new Error('Arguments must be of type number or Vector');
  }

  static dot(u: Vector, v: Vector): number {
    const dimension = Math.min(
      u.dimension,
      v.dimension,
    );
    let dotProduct = 0;
    for (let d = 0; d < dimension; d++) {
      dotProduct += u.coordinates[d]*v.coordinates[d];
    } 
    return dotProduct;
  }

  static cross(u: Vector, v: Vector): Vector {
    const dimension = Math.min(
      u.dimension,
      v.dimension,
    );
    if (dimension < 3) {
      throw new Error('Both vectors must be of at least dimension 3 for cross product');
    }
    const crossProduct = new Vector(
      u[1]*v[2] - u[2]*v[1],
      u[2]*v[0] - u[0]*v[2],
      u[0]*v[1] - u[1]*v[0],
    );
    return crossProduct;
  }

  static sum(...vectors: Array<Vector>): Vector {
    let sum: Vector = Vector.add(
      vectors[0],
      vectors[1],
    );
    for (let i = 2; i < vectors.length; i++) {
      sum = Vector.add(
        sum,
        vectors[i],
      );
    }
    return sum;
  }

  coordinates: Array<number> = [];

  constructor(...coordinates: Array<number>) {
    super(...coordinates);
  }

  add(u: Vector): void {
    const dimension = Math.min(
      this.dimension,
      u.dimension,
    );
    for (let d = 0; d < dimension; d++) {
      this[d] += u[d];
    }
  }

  sub(u: Vector): void {
    const dimension = Math.min(
      this.dimension,
      u.dimension,
    );
    for (let d = 0; d < dimension; d++) {
      this[d] -= u[d];
    }
  }

  times(multiplicand: number | Vector): void {
    if (typeof multiplicand === 'number') {
      for (let d = 0; d < this.dimension; d++) {
        this[d] *= multiplicand;
      }
    } else if (multiplicand instanceof Vector) {
      const dimension = Math.min(
        this.dimension,
        multiplicand.dimension,
      );
      for (let d = 0; d < dimension; d++) {
        this[d] *= multiplicand[d];
      }
    } else {
      throw new Error('Multiplicand must be of type number or Vector');
    }
  }

  get dimension() {
    return this.length;
  }
}

export default Vector;
