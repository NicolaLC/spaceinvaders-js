import { GameObject } from '../core/class/GameObject/game-object';
import { Bullet } from './bullet';
import { Game } from '../game';
import { Vector3 } from '../core/class/vector3';
/**
 * PLAYER PROTOTYPE
 */
export class Enemy extends GameObject {
  constructor(name: string, parentRefElement: HTMLElement) {
    super(name, { className: 'Enemy', parent: parentRefElement });
    super.onAwake();
  }

  customGameObjectContent() {
    return `<span class="icon-enemy01"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span class="path20"></span><span class="path21"></span></span>`;
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
