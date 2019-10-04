import { Game } from '../game';
import { GameObject } from '../core/class/GameObject/game-object';
import { KEYS, InputManager } from '../core/class/keyboard-events';
import { Vector3 } from '../core/class/vector3';
import { Bullet } from './bullet';
/**
 * PLAYER PROTOTYPE
 */
export class Player extends GameObject {
  // constants
  currentLife: number = 3;
  shootInterval: any = null;

  constructor(name: string) {
    super(name, { className: 'Player' }, new Vector3(Game.SCENE_WIDTH / 2 - 24, 700, 0));
    this.onAwake();
  }

  onUpdate() {
    let { htmlElement } = this;
    if (!htmlElement) {
      return;
    }
    if (InputManager.keyPressed(KEYS.LEFT)) {
      this.move(-1);
    } else if (InputManager.keyPressed(KEYS.RIGHT)) {
      this.move(1);
    }
    if (InputManager.keyPressed(KEYS.SPACEBAR)) {
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
  }

  public damage() {
    this.currentLife--;
    if (this.currentLife <= 0) {
      Game.restart();
      super.onDestroy();
    }
  }

  private move(direction: 1 | -1) {
    let { htmlElement } = this;
    const targetMove = 50 * direction;
    let { offsetLeft } = htmlElement;
    offsetLeft += targetMove;
    this.transform.position.x = Math.min(
      Game.SCENE_WIDTH - htmlElement.getBoundingClientRect().width,
      Math.max(16, offsetLeft),
    );
  }

  private shoot() {
    const { htmlElement } = this;
    // instantiate new bullet
    new Bullet('Bullet', 'Enemy', new Vector3(htmlElement.offsetLeft + 21.5, 700, 0), new Vector3(0, -1, 0));
  }
}
