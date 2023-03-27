class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }

  startGameLoop() {
    const step = () => {
      //clears canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      //Camera  movement
      const cameraPerson = this.map.gameObjects.hero;
      // updates all objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        });
      });

      //drawing lower layer
      this.map.drawLowerImage(this.ctx, cameraPerson);

      // Draw Game objs
      Object.values(this.map.gameObjects).forEach((object) => {
        object.sprite.draw(this.ctx, cameraPerson);
      });

      //drawing Upperlayer
      this.map.drawUpperImage(this.ctx, cameraPerson);

      requestAnimationFrame(() => {
        step(); //calls step once per frame so no infinite loop
      });
    };
    step();
  }
  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    this.directionInput = new DirectionInput();
    this.directionInput.init();
    this.startGameLoop();
  }
}
