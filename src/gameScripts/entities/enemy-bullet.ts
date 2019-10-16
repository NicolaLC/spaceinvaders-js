import { Bullet } from './bullet';
import { Vector3 } from 'three';
/**
 * PLAYER PROTOTYPE
 */
export class EnemyBullet extends Bullet {
  constructor(
    name: string,
    position: Vector3,
    direction: Vector3,
    bulletSpeed: number = 25,
    lifeTime: number = 2000,
    images?: string[],
  ) {
    super(name, position, direction, bulletSpeed, lifeTime, images);
  }
}
