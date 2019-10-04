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

  constructor(name: string, checkCollisionWith: string, position: Vector3, direction: Vector3, bulletSpeed: number = 100) {
    super(name, { className: 'Bullet', parent: Game.scene }, position);
    this.direction = direction;
    this.checkCollisionWith = checkCollisionWith;
    this.bulletSpeed = bulletSpeed;
    this.onAwake();
  }

  checkCollision() {
    const { checkCollisionWith } = this;
    const { top, left } = this.htmlElement.getBoundingClientRect();
    let collided = document.elementsFromPoint(left, top);
    collided = collided.filter(c => c.className.indexOf(checkCollisionWith) > -1);
    if (collided.length > 0) {
      const target = collided[0];
      target.classList.remove(checkCollisionWith);
      target.classList.add('Destroyed');
      Game.scene.removeChild(this.htmlElement);

      setTimeout(() => {
        Game.scene.removeChild(target);
      }, 500)
    }
  };

  onUpdate() {
    this.transform.position.y += this.bulletSpeed * this.direction.y;
    this.checkCollision();
  }
}
