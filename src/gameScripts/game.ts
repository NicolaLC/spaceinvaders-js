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
  static scene: HTMLCanvasElement = document.querySelector('.GameScene canvas');
  static sceneContext: CanvasRenderingContext2D;
  static SCENE_WIDTH: number = Game.scene.getBoundingClientRect().width;
  // GAME OBJECTS
  // @todo define player and enemy class
  static gameObjects: GameObject[] = [];

  constructor() {
    this.init();
  }

  render() {
    const { gameObjects } = Game;
    Game.sceneContext.clearRect(0, 0, Game.scene.width, Game.scene.height);
    gameObjects.map((go: GameObject) => {
      go.checkCollision();
      go.render();
    });
    window.requestAnimationFrame(() => {
      this.render();
    });
  }

  init() {
    Game.sceneContext = Game.scene.getContext('2d');
    //get DPI
    let dpi = window.devicePixelRatio;
    //get context
    //get CSS height
    //the + prefix casts it to an integer
    //the slice method gets rid of "px"
    let style_height = +getComputedStyle(Game.scene)
      .getPropertyValue('height')
      .slice(0, -2);
    //get CSS width
    let style_width = +getComputedStyle(Game.scene)
      .getPropertyValue('width')
      .slice(0, -2);
    //scale the canvas
    Game.scene.setAttribute('height', '' + style_height * dpi);
    Game.scene.setAttribute('width', '' + style_width * dpi);
    new Player('SpaceShip');
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
    const result = this.gameObjects.filter(go => !go.destroyed && go.id === id);
    return result && result.length ? result[0] : null;
  }
}
