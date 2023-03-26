class Person extends GameObject {
    constructor(config){
        super(config);
        this.movingProgessRemaining = 16;

        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }
update(state){
    this.updatePosition();

    if (this.movingProgessRemaining === 0  && state.arrow){
        this.direction = state.arrow
        this.movingProgessRemaining = 16;

    }
}
    updatePosition(){
        if (this.movingProgessRemaining> 0){
            const [property, change] = this.directionUpdate[this.direction];
            this[property]+= change;
            this.movingProgessRemaining -= 1;
        }
    }
}