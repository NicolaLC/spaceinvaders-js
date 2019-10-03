import { Utils } from './core/class/utils';
import { Enemies } from './entities/enemies';
import { Player } from './entities/player';
/**
 * GAME.js
 *
 * @description this is the core logic script
 * @author      nicolacastellanidev@gmail.com
 * @version     SNAPSHOT
 */

export class Game {
  // HTML REFERENCES
  static scene: HTMLElement = document.querySelector('.GameScene');
  static SCENE_WIDTH: number = Game.scene.getBoundingClientRect().width;
  enemyWrapper: HTMLElement = document.querySelector('.Enemies');
  // GAME OBJECTS
  // @todo define player and enemy class
  player: Player;
  enemies: Enemies;
  // CONSTANTS
  FPS: number = 1000 / 60;
  requestAnimationFrame: (callback: FrameRequestCallback) => number =
    window.requestAnimationFrame;

  constructor() {
    this.init();
  }

  restart = () => {
    window.location.reload();
  };

  render = () => {
    const {
      player,
      enemies,
      FPS,
      requestAnimationFrame,
      restart,
      render,
    } = this;
    /// render is the game loop
    /// we need to reach 60fps
    /// so we need to call the render method 60 times per second
    /// so 60 * 60 times per minutes (1200 times)
    /// to reach this frame gap we need to divide a second (1000 ms) into 60
    if (player.destroyed) {
      /// player destroyed
      restart();
    }
    enemies.render();
    setTimeout(() => {
      requestAnimationFrame(render);
    }, FPS);
  };

  init = () => {
    const { render } = this;
    Utils.log(`Game core is ready ... `);
    Utils.log(`INIT player ... `);
    this.player = new Player();
    Utils.log(`INIT enemies ... `);
    this.enemies = new Enemies(this.player, this);
    Utils.log(`Settings game core loop ... `);
    render();
  };
}

/**
 * NEXT STEPS
 * 1. Player life
 * 2. Score
 * 3. Effects
 * 4. End Game
 * 5. Intro
 */
