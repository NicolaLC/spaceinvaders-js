import { GameObject } from '../core/class/GameObject/game-object';
import { Bullet } from './bullet';
import { Game } from '../game';
import { Vector3 } from '../core/class/vector3';
/**
 * PLAYER PROTOTYPE
 */
export class Enemy extends GameObject {
  constructor(name: string, position: Vector3) {
    super(
      name,
      { className: 'Enemy', images: ['assets/images/enemy01.svg'] },
      {
        position,
        rotation: new Vector3(0, 0, 0),
        scale: new Vector3(0.064, 0.064, 1),
      },
    );
    super.onAwake();
  }

  onCollisionEnter(go: GameObject) {
    if (go instanceof Bullet) {
      console.log(1111);
      this.destroyed = true;
      this.factory.destroy();
      go.onDestroy();
    }
  }
}
