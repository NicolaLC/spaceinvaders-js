import { Enemies } from './entities/enemies';
import { Player } from './entities/player';
import { GameObject } from './core/class/GameObject/game-object';
import {
  WebGLRenderer,
  Scene,
  OrthographicCamera,
  Texture,
  TextureLoader,
} from 'three';
/**
 * GAME.js
 *
 * @description this is the core logic script
 * @author      nicolacastellanidev@gmail.com
 * @version     SNAPSHOT
 */

export class Game {
  // new three js management
  static camera: OrthographicCamera;
  static mainScene: any;
  static renderer: any;
  static textureLoader: TextureLoader = new TextureLoader();
  // HTML REFERENCES
  static scene: HTMLCanvasElement = document.querySelector('.GameScene canvas');
  static sceneContext: CanvasRenderingContext2D;
  static SCENE_WIDTH: number = window.innerWidth;
  // GAME OBJECTS
  // @todo define player and enemy class
  static gameObjects: GameObject[] = [];

  constructor() {
    this.init();
  }

  render() {
    const { gameObjects } = Game;
    // Game.sceneContext.clearRect(0, 0, Game.scene.width, Game.scene.height);
    Game.renderer.clear();
    Game.renderer.clearDepth();
    Game.renderer.render(Game.mainScene, Game.camera);
    gameObjects.map((go: GameObject) => {
      go.checkCollision();
      go.render();
    });
    Game.renderer.render(Game.mainScene, Game.camera);
    window.requestAnimationFrame(() => {
      this.render();
    });
  }

  init() {
    this.initScene();
    new Player('SpaceShip');
    new Enemies('Invaders');
  }

  initScene() {
    Game.mainScene = new Scene();
    var width = window.innerWidth;
    var height = window.innerHeight;
    Game.camera = new OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      1,
      10,
    );
    Game.camera.position.z = 10;
    Game.renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    Game.renderer.setPixelRatio(window.devicePixelRatio);
    Game.renderer.setSize(width, height);
    Game.renderer.autoClear = true;
    Game.renderer.setClearColor(0x000000, 0); // the default
    document.querySelector('.GameScene').appendChild(Game.renderer.domElement);
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
