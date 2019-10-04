import { Enemies } from './entities/enemies';
import { Player } from './entities/player';
import { GameObject } from './core/class/GameObject/game-object';
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
    const { gameObjects } = Game;
    gameObjects.map((go: GameObject) => {

      go.render();
    });
    window.requestAnimationFrame(() => {
      this.render();
    });
  }

  init() {
    new Player('SpaceShip')
    new Enemies('Invaders');
    this.render();
  }

  static registerGameObject(go: GameObject) {
    this.gameObjects.push(go);
  }

  static unregisterGameObject(go: GameObject) {
    const indexOf = this.gameObjects.indexOf(go);
    this.gameObjects.splice(indexOf, 1);
  }

  static restart() {
    window.location.reload();
  }

  static findGameObject(withName: string) {
    const founded = Game.gameObjects.filter(g => g.name === withName);
    return founded ? founded[0] : null;
  }

  static findGameObjectByHtml(htmlElement: Element): GameObject | null {
    const { id } = htmlElement;
    const result = this.gameObjects.filter(go => !go.destroyed && go.id === id)
    return result && result.length ? result[0] : null;
  }
}
