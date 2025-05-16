class Root {
  constructor(x, y, flowfield) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(0.5); // Más variedad inicial
    this.acc = createVector(0, 0);
    this.r = 10;
    this.flowfield = flowfield;

    // Interpolación entre verde lima y verde bosque
    let c1 = color(103, 68, 80); // Equivale a #9bc90b en HSB
    let c2 = color(235, 54, 80); // Equivale a #30a55e en HSB
    this.baseColor = lerpColor(c1, c2, random());
  }

  update(speed) {
    let force = this.flowfield.lookup(this.pos);
    this.acc.add(force);
    this.vel.add(this.acc);
    this.vel.limit(speed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.r *= 0.995;
  }

  display(brightness) {
    let c = color(
      hue(this.baseColor),
      saturation(this.baseColor),
      brightness,
      200
    );
    fill(c);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

  isDead() {
    return (
      this.r < 0.5 ||
      this.pos.x < -10 || this.pos.x > width + 10 ||
      this.pos.y < -10 || this.pos.y > height + 10
    );
  }
}
