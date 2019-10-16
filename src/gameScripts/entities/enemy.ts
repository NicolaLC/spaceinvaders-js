import { GameObject } from '../core/class/GameObject/game-object';
import { Vector3 } from 'three';
import { EnemyBullet } from './bullets/enemy-bullet';
import { Enemies } from './enemies';
import { Explosion } from './effects/explosion';
import { Game } from '../game';
import { ShootEffect } from './effects/shoot-effect';
/**
 * PLAYER PROTOTYPE
 */
export class Enemy extends GameObject {
  parent: Enemies;
  constructor(name: string, position: Vector3, parent: Enemies) {
    super(
      name,
      { images: ['assets/images/Enemy01.png'] },
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
      Game.addToScore(100);
      go.onDestroy();
      this.destroyed = true;
      this.factory.destroy();
      this.parent.onChildrenDestroy(this);
    }
  }

  shoot() {
    const { transform } = this;
    new ShootEffect({
      position: new Vector3(
        transform.position.x,
        transform.position.y - 64,
        transform.position.z,
      ),
      rotation: new Vector3(0, 0, -Math.PI),
      scale: new Vector3(64, 64, 1),
    });
    // instantiate new bullet
    new EnemyBullet(
      'EnemyBullet',
      new Vector3(transform.position.x + 2, transform.position.y - 70, 0),
      new Vector3(0, -1, 0),
      5,
      5000,
      ['assets/images/EnemyBullet.png'],
    );
  }
}
