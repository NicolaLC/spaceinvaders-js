import { Game } from '../game';
import { GameObject } from '../core/class/GameObject/game-object';
import { Vector3 } from '../core/class/vector3';
/**
 * PLAYER PROTOTYPE
 */
export class Bullet extends GameObject {
  // the class name of collision target object
  checkCollisionWith: string = '';
  direction: Vector3;
  bulletSpeed: number;
  destroyTimeout: any;
  constructor(
    name: string,
    checkCollisionWith: string,
    position: Vector3,
    direction: Vector3,
    bulletSpeed: number = 25,
  ) {
    super(
      name,
      {
        className: 'Bullet',
        images: ['assets/images/bullet.svg'],
        parent: Game.scene,
      },
      {
        position,
        rotation: new Vector3(0, 0, 0),
        scale: new Vector3(8, 32, 0),
      },
    );
    this.direction = direction;
    this.checkCollisionWith = checkCollisionWith;
    this.bulletSpeed = bulletSpeed;
    this.onAwake();
    this.destroyTimeout = setTimeout(() => {
      this.onDestroy();
    }, 1000);
  }

  onUpdate() {
    this.transform.position.y += this.bulletSpeed * this.direction.y;
  }

  onDestroy() {
    clearTimeout(this.destroyTimeout);
    super.onDestroy();
  }
}
