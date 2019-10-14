import { Enemies } from './entities/enemies';
import { Player } from './entities/player';
import { GameObject } from './core/class/GameObject/game-object';
import { WebGLRenderer, Scene, OrthographicCamera, TextureLoader } from 'three';
import { MathUtils } from './core/class/math-utils';
import { UI } from './ui';
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
  static cameraIsShaking = false;

  static score: number = 0;

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
    Game.SCENE_WIDTH = width;
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

    window.addEventListener('resize', () => {
      var width = window.innerWidth;
      var height = window.innerHeight;
      Game.renderer.setSize(width, height);
      Game.camera.left = -width / 2;
      Game.camera.right = width / 2;
      Game.camera.top = -height / 2;
      Game.camera.bottom = height / 2;
      Game.SCENE_WIDTH = width;
    });
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

  static shakeCamera() {
    if (Game.cameraIsShaking) {
      return;
    }
    const { position } = Game.camera;
    const originalPosition = Object.assign({}, position);
    Game.cameraIsShaking = true;
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        if (i === 5) {
          Game.camera.position.set(
            originalPosition.x,
            originalPosition.y,
            originalPosition.z,
          );
          Game.cameraIsShaking = false;
        } else {
          position.y = MathUtils.lerp(
            position.y,
            position.y + 100 * (i % 2 === 0 ? 1 : -1),
            0.1,
          );
          position.x = MathUtils.lerp(
            position.y,
            position.y + 100 * (i % 2 === 0 ? -1 : 1),
            0.1,
          );
        }
      }, 50 * i);
    }
  }

  static addToScore(what: number) {
    Game.score += what;
    UI.setScoreUI(`${Game.score}`);
  }
}
