import { Game } from '../game';
import { GameObject } from '../core/class/game-object';
import { Input, KEYS } from '../core/class/keyboard-events';
import { Vector3 } from '../core/class/vector3';
/**
 * PLAYER PROTOTYPE
 */
export class Player extends GameObject {
  // constants
  currentLife: number = 3;
  shootInterval: any = null;
  htmlElement: HTMLElement;
  game: Game;
  inputManager: Input;

  constructor(game: Game) {
    super();
    this.game = game;
    this.inputManager = game.inputManager;
  }

  checkCollision = (element: HTMLElement) => {
    const { top, left } = element.getBoundingClientRect();
    let collided = document.elementsFromPoint(left, top);
    collided = collided.filter(c => c.className.indexOf('Enemy') > -1);
    if (collided.length > 0) {
      const enemy = collided[0];
      enemy.classList.remove('Enemy');
      enemy.classList.add('Destroyed');
      enemy.innerHTML = '💥';
      setTimeout(() => {
        enemy.innerHTML = '';
      }, 1000);
    }
    return (collided || []).length > 0;
  };

  onStart() {
    this.htmlElement = document.querySelector('.Player');
    this.transform.position = new Vector3(
      this.htmlElement.offsetLeft,
      this.htmlElement.offsetTop,
      0,
    );
  }

  onUpdate() {
    let { htmlElement, game, inputManager } = this;
    if (!htmlElement) {
      return;
    }
    if (inputManager.keyPressed(KEYS.LEFT)) {
      this.move(-1);
    } else if (inputManager.keyPressed(KEYS.RIGHT)) {
      this.move(1);
    }
    if (inputManager.keyPressed(KEYS.SPACEBAR)) {
      if (!this.shootInterval) {
        this.shootInterval = setInterval(() => {
          this.shoot();
        }, 100);
        this.shoot();
      }
    } else {
      if (this.shootInterval) {
        clearInterval(this.shootInterval);
      }
      this.shootInterval = null;
    }
    /// let's animate the player using a Lerp function
    const targetPos = game.utils.lerp(
      htmlElement.offsetLeft,
      this.transform.position.x,
      0.75,
    );
    /// set the player position
    htmlElement.style.left = `${targetPos}px`;
  }

  public damage() {
    this.currentLife--;
    if (this.currentLife <= 0) {
      super.onDestroy();
    }
  }

  private move(direction: 1 | -1) {
    let { htmlElement, game } = this;
    if (!htmlElement) {
      return;
    }
    /// we need to move the plaeyr into a specific direction
    const targetMove = 50 * direction;
    /// get the player current offset left
    let { offsetLeft } = htmlElement;
    /// change it according to current direction
    offsetLeft += targetMove;
    /// so set a targetPlayerPosition instead of changing it's style
    /// we need to limit the player position to the scene boundaries
    /// we need also to consider the player width
    /// 16 = 1rem - the padding of our scene
    this.transform.position.x = Math.min(
      game.SCENE_WIDTH - htmlElement.getBoundingClientRect().width,
      Math.max(16, offsetLeft),
    );
  }

  private shoot() {
    const { htmlElement, game } = this;
    const bullet = document.createElement('div');
    bullet.classList.add('Bullet');
    bullet.style.left = `${htmlElement.offsetLeft + 21.5}px`;
    bullet.style.top = `700px`;
    game.scene.appendChild(bullet);
    bullet.classList.add('Shooted');
    const thisInterval = setInterval(() => {
      const collides = this.checkCollision(bullet);
      if (collides) {
        game.scene.removeChild(bullet);
        clearInterval(thisInterval);
        return;
      }
      const bTop = bullet.getBoundingClientRect().top;
      bullet.style.top = `-${bTop}px`;
      if (bTop <= 100) {
        game.scene.removeChild(bullet);
        clearInterval(thisInterval);
      }
    }, 10);
  }
}
