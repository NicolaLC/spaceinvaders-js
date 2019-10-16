import { Game } from '../game';
import { GameObject } from '../core/class/GameObject/game-object';
import { KEYS, InputManager } from '../core/class/keyboard-events';
import { MathUtils } from '../core/class/math-utils';
import { Vector3 } from 'three';
import { UI } from '../ui';
import { Bullet } from './bullet';
import { CrossBullet } from './cross-bullet';

/**
 * PLAYER PROTOTYPE
 */
export class Player extends GameObject {
  // constants
  shootInterval: any = null;

  // player props
  private shield = 100;
  private shieldRestoreTimeout: any = null;
  private life = 100;

  constructor(name: string) {
    super(
      name,
      {
        className: 'Player',
        images: ['assets/images/SpaceShip.svg'],
      },
      {
        position: new Vector3(0, -document.body.clientHeight / 2 + 150, 0),
        rotation: new Vector3(0, 0, 0),
        scale: new Vector3(64, 64, 1),
      },
    );
    UI.updateShieldAmount(`${this.shield}%`);
    UI.updateLifeAmount(`${this.life}%`);
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

  onCollisionEnter(go: GameObject) {
    if (go.name === 'EnemyBullet') {
      this.damage();
      Game.shakeCamera();
      go.onDestroy();
    }
  }

  public damage() {
    if (this.shield <= 0) {
      this.life -= 25;
      if (this.life <= 0) {
        super.onDestroy();
        Game.restart();
      }
    } else {
      this.shield -= 25;
    }
    clearInterval(this.shieldRestoreTimeout);
    this.shieldRestoreTimeout = setTimeout(() => {
      this.shield = 100;
      UI.updateShieldAmount(`${this.shield}%`);
    }, 5000);
    UI.updateShieldAmount(`${this.shield}%`);
    UI.updateLifeAmount(`${this.life}%`);
  }

  private move(direction: 1 | -1) {
    const targetMove = 10 * direction;
    this.transform.position.x += targetMove;
    this.transform.position.x = MathUtils.lerp(
      this.transform.position.x,
      this.transform.position.x + targetMove,
      0.1,
    );
    if (
      this.transform.position.x <= -Game.SCENE_WIDTH / 6 ||
      this.transform.position.x >= Game.SCENE_WIDTH / 6
    ) {
      UI.setBottomUIOpacity('.1');
    } else {
      UI.setBottomUIOpacity('1');
    }
  }

  private shoot() {
    const { transform } = this;
    // instantiate new bullet
    new CrossBullet(
      'PlayerBullet',
      new Vector3(transform.position.x, transform.position.y + 60, 0),
      new Vector3(0, 1, 0),
      15,
      1500,
    );
  }
}
