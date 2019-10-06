import { Game } from '../game';
import { GameObject } from '../core/class/GameObject/game-object';
import { KEYS, InputManager } from '../core/class/keyboard-events';
import { Vector3 } from '../core/class/vector3';
import { Bullet } from './bullet';
import { MathUtils } from '../core/class/math-utils';
/**
 * PLAYER PROTOTYPE
 */
export class Player extends GameObject {
  // constants
  currentLife: number = 3;
  shootInterval: any = null;

  constructor(name: string) {
    super(name,
      {
        className: 'Player',
        images: ['assets/images/spaceship.svg']
      },
      {
        position: new Vector3(Game.scene.width / 2 - 32, Game.scene.height - 64, 0),
        rotation: new Vector3(0, 0, 0),
        scale: new Vector3(64, 64, 0)
      }
    );
    this.onAwake();
  }

  onUpdate() {
    if (InputManager.keyPressed(KEYS.LEFT)) {
      this.move(-1);
    } else if (InputManager.keyPressed(KEYS.RIGHT)) {
      this.move(1);
    }
    if (InputManager.keyPressed(KEYS.SPACEBAR)) {
      if (!this.shootInterval) {
        this.shootInterval = setInterval(() => {
          this.shoot();
        }, 500);
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
    const targetMove = 50 * direction;
    // this.transform.position.x += targetMove;
    this.transform.position.x = MathUtils.lerp(this.transform.position.x, this.transform.position.x + targetMove, .1);
  }

  private shoot() {
    const { transform } = this;
    // instantiate new bullet
    new Bullet('Bullet', 'Enemy', new Vector3(transform.position.x - transform.scale.x / 2, 700, 0), new Vector3(0, -1, 0));
  }
}
