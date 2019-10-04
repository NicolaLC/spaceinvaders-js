import { Transform } from '../../interfaces/transform';
import { Script } from 'vm';
import { Utils } from '../utils';
import { Vector3 } from '../vector3';
import { MathUtils } from '../math-utils';
import { GameObjectFactory, GameObjectFactoryProperties } from './game-object.factory';
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
  [key: string]: any;
  protected id: string;
  protected lastAnimationFrame: number = 0;
  protected factory: GameObjectFactory;

  constructor(name: string, settings: GameObjectFactoryProperties, position?: Vector3) {
    this.id = Utils.guid();
    this.transform = {
      position: position || new Vector3(0, 0, 0),
      rotation: new Vector3(0, 0, 0),
      scale: new Vector3(0, 0, 0),
    };
    this.name = name;
    this.factory = new GameObjectFactory(this.id, settings, this);
    this.htmlElement = this.factory.htmlRef;
    Utils.log(`[${name}] >>> spawned`);
  }

  onAwake() {
    Utils.log(`[${this.name}] >>> onAwake`);
    this.render();
  }

  onStart?() {
    Utils.log(`[${this.name}] >>> onStart`);
  }
  onUpdate?() { }
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
    const targetPosX = MathUtils.lerp(
      this.htmlElement.offsetLeft,
      this.transform.position.x,
      0.75,
    );
    const targetPosY = MathUtils.lerp(
      this.htmlElement.offsetTop,
      this.transform.position.y,
      0.75,
    );
    /// set the player position
    this.htmlElement.style.left = `${targetPosX}px`;
    this.htmlElement.style.top = `${targetPosY}px`;
  }
}
