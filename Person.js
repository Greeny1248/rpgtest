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
      //more cases for starting to walk will be here
      //
      //

      // case: keyboard ready and have arrow pressed i.e not cutscene
      if (
        !state.map.isCutscenePlaying &&
        this.isPlayerControlled &&
        state.arrow
        ) {
          this.startBehavior(state, {
            type: "walk",
            direction: state.arrow,
          });
        }
        this.updateSprite(state);
      }
    }
    
    startBehavior(state, behavior) {
      //setting direction to behevaior has
      this.direction = behavior.direction;
      
      if (behavior.type === "walk") {
      //stop if space taken
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        
       behavior.retry && setTimeout(() => {
          this.startBehavior(state, behavior);
        }, 10);
        return;
      }
      //ready to walk
      state.map.moveWall(this.x, this.y, this.direction);
      this.movingProgessRemaining = 16;
      this.updateSprite(state);
    }
    if (behavior.type === "stand") {
      setTimeout(() => {
        utils.emitEvent("PersonStandComplete", {
          whoId: this.id
        })
      }, behavior.time)
    }
  }
  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    this[property] += change;
    this.movingProgessRemaining -= 1;

    if (this.movingProgessRemaining === 0) {
      //finished walk
      utils.emitEvent("PersonWalkingComplete", {
        whoId: this.id,
      });
    }
  }

  updateSprite() {
    if (this.movingProgessRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
      return;
    }
    this.sprite.setAnimation("idle-" + this.direction);
  }
}
