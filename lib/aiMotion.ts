'use client';

export class AIMotionEngine {
  private current = 0;
  private target = 0;
  private velocity = 0;
  private acceleration = 0;
  private lastTime = 0;
  private lastTarget = 0;
  private lastVelocity = 0;

  // Configuration params
  private baseDamping = 0.08; // Damping factor for smooth interpolation
  private anticipationFactor = 0.28; // Lookahead multiplier based on velocity

  constructor(initialVal = 0) {
    this.current = initialVal;
    this.target = initialVal;
    this.lastTarget = initialVal;
    this.lastTime = typeof window !== 'undefined' ? performance.now() : 0;
  }

  public setTarget(newTarget: number) {
    this.target = newTarget;
  }

  /**
   * Updates the physics simulation and returns the anticipated scroll value.
   * @param deltaTimeMs time elapsed since last frame
   */
  public update(deltaTimeMs?: number): {
    current: number;
    velocity: number;
    anticipated: number;
  } {
    const now = typeof window !== 'undefined' ? performance.now() : 0;
    const dt = (deltaTimeMs || (now - this.lastTime)) / 1000; // in seconds
    this.lastTime = now;

    if (dt <= 0) {
      return {
        current: this.current,
        velocity: this.velocity,
        anticipated: this.current,
      };
    }

    // 1. Calculate input velocity & acceleration
    const deltaTarget = this.target - this.lastTarget;
    const targetVelocity = deltaTarget / dt;
    this.acceleration = (targetVelocity - this.lastVelocity) / dt;
    
    this.lastTarget = this.target;
    this.lastVelocity = targetVelocity;

    // 2. Adaptive Damping (Decrease damping when speed is high to feel more responsive, increase to damp wobble)
    const speed = Math.abs(this.velocity);
    const adaptiveDamping = Math.max(
      0.03,
      Math.min(0.2, this.baseDamping + speed * 0.05)
    );

    // 3. Interpolate current value (classic spring/damping approach)
    const prevCurrent = this.current;
    this.current += (this.target - this.current) * (adaptiveDamping * (dt * 60)); // normalize to 60fps
    
    // 4. Calculate actual output velocity
    this.velocity = (this.current - prevCurrent) / dt;

    // 5. Motion Anticipation (Camera moves ahead based on velocity and positive acceleration)
    // If user is accelerating, we add a predictive offset
    const accelAnticipation = this.acceleration > 0 ? this.acceleration * 0.005 : 0;
    const predictedOffset = this.velocity * this.anticipationFactor + accelAnticipation;

    // Bound the anticipated output within a safe margin of [0, 1] if input is normalized
    let anticipated = this.current + predictedOffset;
    
    // Clamp to make sure we don't shoot past borders excessively
    anticipated = Math.max(-0.05, Math.min(1.05, anticipated));

    return {
      current: this.current,
      velocity: this.velocity,
      anticipated: anticipated,
    };
  }

  public getVelocity() {
    return this.velocity;
  }
}
