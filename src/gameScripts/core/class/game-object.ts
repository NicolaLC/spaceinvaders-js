import { Transform } from '../interfaces/transform';
import { Script } from 'vm';
import { Utils } from './utils';
import { Vector3 } from './vector3';
import { MathUtils } from './math-utils';
/**
 * GameObject
 *
 * @description abstract class for game objects
 * @author      nicolacastellanidev@gmail.com
 */

export class GameObject {
  name: string;
  transform: Transform;
  scripts: Script;
  started: boolean = false;
  destroyed: boolean = false;
  htmlElement: HTMLElement;
  protected lastAnimationFrame: number = 0;

  constructor() {
    this.transform = {
      position: new Vector3(0, 0, 0),
      rotation: new Vector3(0, 0, 0),
      scale: new Vector3(0, 0, 0),
    };
    this.onAwake();
    this.render();
  }

  onAwake?() {
    Utils.log(`[${this.name}] >>> onAwake`);
  }
  onStart?() {
    Utils.log(`[${this.name}] >>> onStart`);
  }
  onUpdate?() {}
  onDestroy?() {
    Utils.log(`[${this.name}] >>> onDestroy`);
    window.cancelAnimationFrame(this.lastAnimationFrame);
    this.destroyed = true;
  }
  render?() {
    if (this.destroyed) {
      return;
    }

    if (this.htmlElement) {
      this.updatePosition();
    }

    if (this.started) {
      this.onUpdate();
    } else {
      this.started = true;
      this.onStart();
    }

    this.lastAnimationFrame = window.requestAnimationFrame(() => {
      this.render();
    });
  }

  private updatePosition() {
    /// let's animate the player using a Lerp function
    const targetPos = MathUtils.lerp(
      this.htmlElement.offsetLeft,
      this.transform.position.x,
      0.75,
    );
    /// set the player position
    this.htmlElement.style.left = `${targetPos}px`;
  }
}
