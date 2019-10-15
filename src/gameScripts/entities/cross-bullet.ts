import { Game } from '../game';
import { GameObject } from '../core/class/GameObject/game-object';
import { Vector3 } from 'three';
import { Bullet } from './bullet';
/**
 * PLAYER PROTOTYPE
 */
export class CrossBullet extends GameObject {
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
  ) {
    super(
      name,
      {
        className: 'Bullet',
        images: ['assets/images/bullet.png'],
        parent: Game.scene,
      },
      {
        position,
        rotation: new Vector3(
          0,
          0,
          direction.x !== 0 ? (direction.x === -1 ? -45 : 45) : 0,
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
        'CrossBullet',
        new Vector3(transform.position.x, transform.position.y, 0),
        new Vector3(directions[i].x, directions[i].y, 0),
        10,
      );
    }
    super.onDestroy();
  }
}
