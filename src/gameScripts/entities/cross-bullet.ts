import { Bullet } from './bullet';
import { Vector3 } from 'three';
import { GameObject } from '../core/class/GameObject/game-object';
/**
 * PLAYER PROTOTYPE
 */
export class CrossBullet extends Bullet {
  onDestroy() {
    const { transform } = this;
    const directions = [
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: -1, y: 0 }
    ]
    for (let i = 0; i < directions.length; i++) {
      new Bullet(
        'PlayerBullet',
        new Vector3(transform.position.x, transform.position.y, 0),
        new Vector3(directions[i].x, directions[i].y, 0),
        10
      );
    }
    this.factory.destroy();
  }
}


/**
 *
    0,-1
-1, 0 | 1, 0
    0, 1
 */