import { GameObject } from '../core/class/GameObject/game-object';
import { Vector3 } from 'three';
import { EnemyBullet } from './enemyBullet';
import { Enemies } from './enemies';
import { Explosion } from './explosion';
import { Game } from '../game';
/**
 * PLAYER PROTOTYPE
 */
export class Enemy extends GameObject {
  parent: Enemies;
  constructor(name: string, position: Vector3, parent: Enemies) {
    super(
      name,
      { className: 'Enemy', images: ['assets/images/Enemy01.png'] },
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
      new Explosion(this.transform);
      Game.addToScore(100);
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
      5,
    );
  }
}
