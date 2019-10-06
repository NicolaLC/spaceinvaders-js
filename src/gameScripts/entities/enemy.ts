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
        scale: new Vector3(64, 64, 0)
      });
    super.onAwake();
  }

  onCollisionEnter(go: GameObject) {
    if (go instanceof Bullet) {
      this.destroyed = true;
      this.htmlElement.classList.add('DestroyedEnemy');
      this.transform.position = new Vector3(1.5, 1.5, 0);
      setTimeout(() => {
        this.htmlElement.innerHTML = '';
        this.htmlElement.classList.remove('Enemy');
        this.htmlElement.classList.remove('DestroyedEnemy');
        Game.unregisterGameObject(this);
      }, 500);
    }
  }
}
