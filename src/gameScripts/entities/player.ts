import { Game } from '../game';
import { GameObject } from '../core/class/GameObject/game-object';
import { KEYS, InputManager } from '../core/class/keyboard-events';
import { Bullet } from './bullet';
import { MathUtils } from '../core/class/math-utils';
import { Vector3 } from 'three';
import { EnemyBullet } from './enemyBullet';
/**
 * PLAYER PROTOTYPE
 */
export class Player extends GameObject {
  // constants
  currentLife: number = 3;
  shootInterval: any = null;

  constructor(name: string) {
    super(
      name,
      {
        className: 'Player',
        images: ['assets/images/spaceship.svg'],
      },
      {
        position: new Vector3(0, -window.screen.height / 2 + 128, 0),
        rotation: new Vector3(0, 0, 0),
        scale: new Vector3(64, 64, 1),
      },
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

  onCollisionEnter(go: GameObject) {
    if (go.name === 'EnemyBullet') {
      Game.restart();
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
    const targetMove = 10 * direction;
    this.transform.position.x += targetMove;
    this.transform.position.x = MathUtils.lerp(
      this.transform.position.x,
      this.transform.position.x + targetMove,
      0.1,
    );
  }

  private shoot() {
    const { transform } = this;
    // instantiate new bullet
    new Bullet(
      'PlayerBullet',
      new Vector3(transform.position.x + 2, transform.position.y + 60, 0),
      new Vector3(0, 1, 0),
    );
  }
}
