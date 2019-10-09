import { GameObject } from '../core/class/GameObject/game-object';
import { Bullet } from './bullet';
import { Vector3 } from 'three';
import { EnemyBullet } from './enemyBullet';
import { Enemies } from './enemies';
/**
 * PLAYER PROTOTYPE
 */
export class Enemy extends GameObject {
  parent: Enemies;
  constructor(name: string, position: Vector3, parent: Enemies) {
    super(
      name,
      { className: 'Enemy', images: ['assets/images/enemy01.svg'] },
      {
        position,
        rotation: new Vector3(0, 0, 0),
        scale: new Vector3(64, 64, 1),
      },
    );
    this.parent = parent;
    super.onAwake();
  }

  onCollisionEnter(go: GameObject) {
    if (go.name === 'PlayerBullet') {
      this.destroyed = true;
      this.factory.destroy();
      this.parent.onChildrenDestroy(this);
      go.onDestroy();
    }
  }

  shoot() {
    const { transform } = this;
    // instantiate new bullet
    new EnemyBullet(
      'EnemyBullet',
      new Vector3(transform.position.x + 2, transform.position.y - 60, 0),
      new Vector3(0, -1, 0),
      1,
    );
  }
}
