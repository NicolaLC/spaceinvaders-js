import { Transform } from '../interfaces/transform';
import { Script } from 'vm';
import { Utils } from '../utils';
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
  utils: Utils = new Utils();

  protected started: boolean = false;
  protected destroyed: boolean = false;
  protected lastAnimationFrame: number = 0;
  constructor() {
    this.onAwake();
  }

  onAwake() {
    this.utils.log(`[${this.name}] >>> onAwake`);
    window.requestAnimationFrame(this.render);
  }
  onStart() {
    this.utils.log(`[${this.name}] >>> onStart`);
  }
  onUpdate() {}
  onDestroy() {
    this.utils.log(`[${this.name}] >>> onDestroy`);
    window.cancelAnimationFrame(this.lastAnimationFrame);
    this.destroyed = true;
  }
  render() {
    if (this.destroyed) {
      return;
    }
    if (this.started) {
      this.onUpdate();
    } else {
      this.started = true;
      this.onStart();
    }

    this.lastAnimationFrame = window.requestAnimationFrame(this.render);
  }
}
