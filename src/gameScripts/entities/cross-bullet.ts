import { Game } from '../game';
import { GameObject } from '../core/class/GameObject/game-object';
import { Vector3 } from 'three';
import { Bullet } from './bullet';
/**
 * PLAYER PROTOTYPE
 */
export class CrossBullet extends Bullet {
  onDestroy() {
    clearTimeout(this.destroyTimeout);
    const { transform } = this;
    const directions = [
      { x: 0, y: 1 },
      { x: 0, y: -1 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
    ];
    for (let i = 0; i < directions.length; i++) {
      new Bullet(
        'PlayerBullet',
        new Vector3(transform.position.x, transform.position.y + 32, 0),
        new Vector3(directions[i].x, directions[i].y, 0),
        5,
      );
    }
    super.onDestroy();
  }
}
