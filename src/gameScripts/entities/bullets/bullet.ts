import { Vector3 } from 'three';
import { Explosion } from '../effects/explosion';
import { GameObject } from '../../core/class/GameObject/game-object';
/**
 * PLAYER PROTOTYPE
 */
export class Bullet extends GameObject {
  // the class name of collision target object
  direction: Vector3;
  bulletSpeed: number;
  lifeTime: number = 2000;
  destroyTimeout: any;
  constructor(
    name: string,
    position: Vector3,
    direction: Vector3,
    bulletSpeed: number = 25,
    lifeTime: number = 2000,
    images?: string[],
  ) {
    super(
      name,
      {
        images: images || ['assets/images/bullet.png'],
      },
      {
        position,
        rotation: new Vector3(
          0,
          0,
          direction.x !== 0
            ? direction.x > 0
              ? -Math.PI / 2
              : Math.PI / 2
            : direction.y < 0
            ? -Math.PI
            : 0,
        ),
        scale: new Vector3(8, 32, 1),
      },
    );
    this.direction = direction;
    this.bulletSpeed = bulletSpeed;
    this.onAwake();
    this.destroyTimeout = setTimeout(() => {
      this.onDestroy();
    }, lifeTime);
  }

  onUpdate() {
    this.transform.position.y += this.bulletSpeed * this.direction.y;
    this.transform.position.x += this.bulletSpeed * this.direction.x;
  }

  onDestroy() {
    new Explosion({
      position: this.transform.position,
      rotation: new Vector3(0, 0, 0),
      scale: new Vector3(128, 128, 1),
    });
    clearTimeout(this.destroyTimeout);
    super.onDestroy();
  }
}
