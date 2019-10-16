import { Vector3 } from 'three';
import { CrossBulletExplosionEffect } from '../effects/cross-bullet-explosion-effect';
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
        1000,
      );
    }
    new CrossBulletExplosionEffect({
      position: new Vector3(transform.position.x, transform.position.y + 32, 0),
      rotation: new Vector3(0, 0, 0),
      scale: new Vector3(512, 512, 1),
    });
    clearTimeout(this.destroyTimeout);
    super.onDestroy();
  }
}
