class Person extends GameObject {
  constructor(config) {
    super(config);
    this.movingProgessRemaining = 0;

    this.isPlayerControlled = config.isPlayerControlled || false;

    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }
  update(state) {
    if (this.movingProgessRemaining > 0) {
      this.updatePosition();
    } else {
    }
    this.updateSprite(state);

    if (
      this.isPlayerControlled &&
      this.movingProgessRemaining === 0 &&
      state.arrow
    ) {
      this.startBehavior(state, {
        type: "walk",
        direction: state.arrow,
      });
    }
  }

  startBehavior(state, behavior) {
    this.direction = behavior.direction;
    if (behavior.type === "walk") {
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        return;
      }
      this.movingProgessRemaining = 16;
    }
  }
  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    this[property] += change;
    this.movingProgessRemaining -= 1;
  }

  updateSprite(state) {
    if (
      this.isPlayerControlled &&
      this.movingProgessRemaining === 0 &&
      !state.arrow
    ) {
      this.sprite.setAnimation("idle-" + this.direction);
      return;
    }

    if (this.movingProgessRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
    }
  }
}
