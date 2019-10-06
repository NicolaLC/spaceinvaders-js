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
  constructor(name: string, checkCollisionWith: string, position: Vector3, direction: Vector3, bulletSpeed: number = 50) {
    super(
      name,
      { className: 'Bullet', images: [], parent: Game.scene },
      {
        position,
        rotation: new Vector3(0, 0, 0),
        scale: new Vector3(1, 1, 1)
      });
    this.direction = direction;
    this.checkCollisionWith = checkCollisionWith;
    this.bulletSpeed = bulletSpeed;
    this.onAwake();
    this.destroyTimeout = setTimeout(() => {
      super.onDestroy();
    }, 1000);
  }

  checkCollision() {
    const { checkCollisionWith } = this;
    const { top, left } = this.htmlElement.getBoundingClientRect();
    let collided = document.elementsFromPoint(left, top);
    collided = collided.filter(c => c.className.indexOf(checkCollisionWith) > -1);
    if (collided.length > 0) {
      const targetHTML = collided[0];
      const targetGO = Game.findGameObjectByHtml(targetHTML);
      if (targetGO && !targetGO.destroyed) {
        clearTimeout(this.destroyTimeout);
        super.onDestroy();
        targetGO.onCollisionEnter(this);
      }
    }
  };

  onUpdate() {
    this.transform.position.y += this.bulletSpeed * this.direction.y;
    this.checkCollision();
  }
}
