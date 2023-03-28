class GameObject {
  constructor(config) {
    this.id = null;
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "/images/characters/people/hero.png",
    });

    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;
  }

  mount(map) {
    console.log("mounting!");
    this.isMounted = true;
    map.addWall(this.x, this.y);

    // if behavour kick off after delay
    setTimeout(() => {
      this.doBehaviorEvent(map);
    }, 10);
  }
  update() {}

  async doBehaviorEvent(map) {
    //dont run if cutscene is playing
    if (map.isCutscenePlaying || this.behaviorLoop.length === 0) {
      return;
    }

    //setting up event with relevent info
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;

    //create event instance from next event config
    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    await eventHandler.init();

    //setting next even to fire
    this.behaviorLoopIndex += 1;
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    }
    // do it again
    this.doBehaviorEvent(map);
  }
}
