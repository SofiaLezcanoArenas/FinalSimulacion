class FlowField {
  constructor(spacing) {
    this.spacing = spacing;
    this.cols = floor(width / spacing);
    this.rows = floor(height / spacing);
    this.field = this.make2DArray(this.cols, this.rows);
    this.zoff = 0;
    this.init();
  }

  init() {
    // Reseed noise for a new flow field each time
    noiseSeed(random(10000));
    let xoff = 0;
    for (let i = 0; i < this.cols; i++) {
      let yoff = 0;
      for (let j = 0; j < this.rows; j++) {
        //{.code-wide} In this example, use Perlin noise to create the vectors.
        let angle = map(noise(xoff, yoff), 0, 1, 0, TWO_PI);
        this.field[i][j] = p5.Vector.fromAngle(angle);
        yoff += 0.1;
      }
      xoff += 0.1;
    }
  }
  
  make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < cols; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  }

 
  update() {
    this.zoff += 0.001;
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        let angle = noise(x * 0.05, y * 0.05, this.zoff) * TWO_PI * 2;
        this.field[x][y] = p5.Vector.fromAngle(angle).mult(-0.5); // sin sesgo hacia abajo
      }
    }
  }

  lookup(lookup) {
    let column = floor(constrain(lookup.x / this.spacing, 0, this.cols - 1));
    let row = floor(constrain(lookup.y / this.spacing, 0, this.rows - 1));
    return this.field[column][row].copy();
  }
}
