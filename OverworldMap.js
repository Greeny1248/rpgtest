class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;

    this.isCutscenePlaying = false;
  }

  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }

  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }
  isSpaceTaken(currentX, CurrentY, direction) {
    const { x, y } = utils.nextPosition(currentX, CurrentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach((key) => {
      let object = this.gameObjects[key];
      object.id = key;
      //todo mounting options
      object.mount(this);
    });
  }

  async startCutscene(events) {
    this.isCutscenePlaying = true;
    //start loop of async events

    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      });
      await eventHandler.init();
    }
    this.isCutscenePlaying = false;
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true;
  }

  removeWall(x, y) {
    delete this.walls[`${x},${y}`];
  }

  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const { x, y } = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }
}

window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: "/images/maps/DemoLower.png",
    upperSrc: "/images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(6),
      }),
      npcA: new Person({
        x: utils.withGrid(7),
        y: utils.withGrid(9),
        src: "/images/characters/people/npc1.png",
        behaviorLoop: [
          { type: "stand", direction: "left", time: 400 },
          { type: "stand", direction: "down", time: 800 },
          { type: "stand", direction: "right", time: 1300 },
          { type: "stand", direction: "down", time: 800 },
        ],
      }),
      npcB: new Person({
        x: utils.withGrid(3),
        y: utils.withGrid(7),
        src: "/images/characters/people/npc2.png",
        behaviorLoop: [
          { type: "walk", direction: "up" },
          { type: "stand", direction: "up", time: 800 },
          { type: "walk", direction: "up" },
          { type: "stand", direction: "up", time: 800 },
          { type: "walk", direction: "up" },
          { type: "stand", direction: "up", time: 7000 },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "right" },
          { type: "stand", direction: "right", time: 800 },
          //{ type: "stand", direction: "down", time: 800 },
          { type: "walk", direction: "down" },
          { type: "stand", direction: "down", time: 800 },
          { type: "walk", direction: "down" },
          { type: "stand", direction: "down", time: 800 },
          { type: "walk", direction: "left" },
          { type: "stand", direction: "left", time: 800 },
        ],
      }),
      npcC: new Person({
        x: utils.withGrid(6),
        y: utils.withGrid(9),
        src: "/images/characters/people/npc3.png",
        behaviorLoop: [
          { type: "stand", direction: "left", time: 400 },
          { type: "walk", direction: "up" },
          { type: "stand", direction: "down", time: 800 },
          { type: "stand", direction: "right", time: 1300 },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "stand", direction: "right", time: 1300 },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "down" },
          { type: "stand", direction: "down", time: 800 },
        ],
      }),
    },
    walls: {
      //this is the counter
      //"16,16":true
      [utils.asGridCoord(7, 6)]: true,
      [utils.asGridCoord(8, 6)]: true,
      [utils.asGridCoord(7, 7)]: true,
      [utils.asGridCoord(8, 7)]: true,
    },
  },
  Kitchen: {
    lowerSrc: "/images/maps/KitchenLower.png",
    upperSrc: "/images/maps/KitchenUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(6),
      }),
      npc1: new Person({
        x: utils.withGrid(7),
        y: utils.withGrid(9),
        src: "/images/characters/people/npc1.png",
      }),

      npc2: new Person({
        x: utils.withGrid(10),
        y: utils.withGrid(4),
        src: "/images/characters/people/npc2.png",
      }),
      npc3: new Person({
        x: utils.withGrid(4),
        y: utils.withGrid(5),
        src: "/images/characters/people/npc3.png",
      }),
    },
    walls: {
      //this is the counter
      //Back Wall
      [utils.asGridCoord(1, 3)]: true,
      [utils.asGridCoord(2, 3)]: true,
      [utils.asGridCoord(3, 3)]: true,
      [utils.asGridCoord(4, 3)]: true,
      [utils.asGridCoord(5, 3)]: true,
      [utils.asGridCoord(6, 3)]: true,
      [utils.asGridCoord(7, 3)]: true,
      [utils.asGridCoord(8, 3)]: true,
      [utils.asGridCoord(9, 3)]: true,
      [utils.asGridCoord(10, 3)]: true,
      [utils.asGridCoord(11, 4)]: true,
      [utils.asGridCoord(12, 4)]: true,
      //Left Wall
      [utils.asGridCoord(0, 4)]: true,
      [utils.asGridCoord(1, 5)]: true,
      [utils.asGridCoord(1, 6)]: true,
      [utils.asGridCoord(1, 7)]: true,
      [utils.asGridCoord(0, 8)]: true,
      [utils.asGridCoord(0, 9)]: true,
      //Bottom Wall
      [utils.asGridCoord(1, 9)]: true,
      [utils.asGridCoord(2, 9)]: true,
      [utils.asGridCoord(3, 10)]: true,
      [utils.asGridCoord(4, 10)]: true,
      [utils.asGridCoord(5, 11)]: true,
      [utils.asGridCoord(6, 10)]: true,
      [utils.asGridCoord(7, 10)]: true,
      [utils.asGridCoord(8, 10)]: true,
      [utils.asGridCoord(9, 9)]: true,
      [utils.asGridCoord(10, 9)]: true,
      [utils.asGridCoord(11, 10)]: true,
      [utils.asGridCoord(12, 10)]: true,
      //Right Wall
      [utils.asGridCoord(13, 4)]: true,
      [utils.asGridCoord(13, 5)]: true,
      [utils.asGridCoord(13, 6)]: true,
      [utils.asGridCoord(13, 7)]: true,
      [utils.asGridCoord(13, 8)]: true,
      [utils.asGridCoord(13, 9)]: true,
      //Central objects
      [utils.asGridCoord(10, 7)]: true,
      [utils.asGridCoord(9, 7)]: true,
      [utils.asGridCoord(7, 7)]: true,
      [utils.asGridCoord(6, 7)]: true,
    },
  },  
  TestTown: {
    lowerSrc: "/images/maps/testtown.png",
    upperSrc: "/images/maps/DemoUpper.png",
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(10),
      }),
      npcA: new Person({
        x: utils.withGrid(5),
        y: utils.withGrid(16),
        src: "/images/characters/people/npc1.png",
        behaviorLoop: [
          { type: "stand", direction: "left", time: 400 },
          { type: "stand", direction: "down", time: 800 },
          { type: "stand", direction: "right", time: 1300 },
          { type: "stand", direction: "down", time: 800 },
        ],
      }),
      npcB: new Person({
        x: utils.withGrid(25),
        y: utils.withGrid(30),
        src: "/images/characters/people/npc2.png",
        behaviorLoop: [
          { type: "walk", direction: "up" },
          { type: "stand", direction: "up", time: 800 },
          { type: "walk", direction: "up" },
          { type: "stand", direction: "up", time: 800 },
          { type: "walk", direction: "up" },
          { type: "stand", direction: "up", time: 7000 },
          { type: "walk", direction: "down" },
          { type: "walk", direction: "right" },
          { type: "stand", direction: "right", time: 800 },
          //{ type: "stand", direction: "down", time: 800 },
          { type: "walk", direction: "down" },
          { type: "stand", direction: "down", time: 800 },
          { type: "walk", direction: "down" },
          { type: "stand", direction: "down", time: 800 },
          { type: "walk", direction: "left" },
          { type: "stand", direction: "left", time: 800 },
        ],
      }),
      npcC: new Person({
        x: utils.withGrid(28),
        y: utils.withGrid(30),
        src: "/images/characters/people/npc3.png",
        behaviorLoop: [
          { type: "stand", direction: "left", time: 400 },
          { type: "walk", direction: "up" },
          { type: "stand", direction: "down", time: 800 },
          { type: "stand", direction: "right", time: 1300 },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "walk", direction: "left" },
          { type: "stand", direction: "right", time: 1300 },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "down" },
          { type: "stand", direction: "down", time: 800 },
        ],
      }),
    },
    walls: {
      //this is the counter
      //"16,16":true
       [utils.asGridCoord(1, 9)]: true,
       [utils.asGridCoord(2, 9)]: true,
       [utils.asGridCoord(3, 9)]: true,
       [utils.asGridCoord(4, 9)]: true,
       [utils.asGridCoord(5, 9)]: true,
       [utils.asGridCoord(6, 9)]: true,
       [utils.asGridCoord(7, 9)]: true,
       [utils.asGridCoord(8, 9)]: true,
       [utils.asGridCoord(9, 9)]: true,
       [utils.asGridCoord(10, 9)]: true,
       [utils.asGridCoord(11, 9)]: true,
       [utils.asGridCoord(12, 9)]: true,
       [utils.asGridCoord(13, 9)]: true,
       [utils.asGridCoord(14, 9)]: true,
       [utils.asGridCoord(15, 9)]: true,
       [utils.asGridCoord(16, 9)]: true,
       [utils.asGridCoord(17, 9)]: true,
       [utils.asGridCoord(18, 9)]: true,
       [utils.asGridCoord(19, 9)]: true,
       [utils.asGridCoord(20, 9)]: true,
      // [utils.asGridCoord(8, 6)]: true,
      // [utils.asGridCoord(7, 7)]: true,
      // [utils.asGridCoord(8, 7)]: true,
    },
  },
};
