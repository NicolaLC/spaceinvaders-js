import { Transform } from '../interfaces/transform';
import { Script } from 'vm';
import { Utils } from '../utils';
import { Vector3 } from './vector3';
/**
 * GameObject
 *
 * @description abstract class for game objects
 * @author      nicolacastellanidev@gmail.com
 */

export class GameObject {
  name?: string;
  transform?: Transform;
  scripts?: Script;
  utils?: Utils = new Utils();
  started?: boolean = false;
  destroyed?: boolean = false;
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
    this.utils.log(`[${this.name}] >>> onAwake`);
  }
  onStart?() {
    this.utils.log(`[${this.name}] >>> onStart`);
  }
  onUpdate?() {}
  onDestroy?() {
    this.utils.log(`[${this.name}] >>> onDestroy`);
    window.cancelAnimationFrame(this.lastAnimationFrame);
    this.destroyed = true;
  }
  render?() {
    if (this.destroyed) {
      return;
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
}
