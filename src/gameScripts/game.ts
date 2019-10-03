import { Enemies } from './entities/enemies';
import { Player } from './entities/player';
import { GameObject } from './core/class/game-object';
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
  // GAME OBJECTS
  // @todo define player and enemy class
  static gameObjects: GameObject[] = [];

  constructor() {
    this.init();
  }

  render() {
    const { render } = this;
    window.requestAnimationFrame(() => {
      this.render();
    });
  }

  init() {
    Game.gameObjects.push(new Player('SpaceShip'), new Enemies('Invaders'));
    this.render();
  }

  static restart() {
    window.location.reload();
  }

  static findGameObject(withName: string) {
    const founded = Game.gameObjects.filter(g => g.name === withName);
    return founded ? founded[0] : null;
  }
}
