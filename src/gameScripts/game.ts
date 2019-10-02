import { Utils } from './core/utils';
import { Enemies } from './entities/enemies.prototype';
import { Player } from './entities/player.prototype';
/**
 * GAME.js
 *
 * @description this is the core logic script
 * @author      nicolacastellanidev@gmail.com
 * @version     SNAPSHOT
 */

export class Game {
  // HTML REFERENCES
  scene: HTMLElement = document.querySelector('.GameScene');
  enemyWrapper: HTMLElement = document.querySelector('.Enemies');
  // GAME OBJECTS
  // @todo define player and enemy class
  player: Player;
  enemies: Enemies;
  // CONSTANTS
  utils: Utils = new Utils();
  FPS: number = 1000 / 60;
  SCENE_WIDTH: number = this.scene.getBoundingClientRect().width;
  requestAnimationFrame: (callback: FrameRequestCallback) => number =
    window.requestAnimationFrame;

  constructor() {
    debugger;
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
    player.render();
    enemies.render();
    setTimeout(() => {
      requestAnimationFrame(render);
    }, FPS);
  };

  init = () => {
    const { render, utils } = this;
    utils.log(`%cGame core is ready ... `);
    utils.log(`%cINIT player ... `);
    this.player = new Player(this);
    this.player.init();
    utils.log(`%cINIT enemies ... `);
    this.enemies = new Enemies(this.player, this);
    this.enemies.init();
    utils.log(`%cSettings game core loop ... `);
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
