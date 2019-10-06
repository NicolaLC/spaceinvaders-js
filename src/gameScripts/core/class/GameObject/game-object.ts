import { Transform } from '../../interfaces/transform';
import { Script } from 'vm';
import { Utils } from '../utils';
import { Vector3 } from '../vector3';
import { MathUtils } from '../math-utils';
import { GameObjectFactory, GameObjectFactoryProperties } from './game-object.factory';
import { Game } from '../../../game';
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
  id: string;
  [key: string]: any;
  protected factory: GameObjectFactory;

  constructor(name: string, settings: GameObjectFactoryProperties, transform?: Transform) {
    this.id = Utils.guid();
    this.transform = transform || {
      position: new Vector3(0, 0, 0),
      rotation: new Vector3(0, 0, 0),
      scale: new Vector3(1, 1, 1),
    };
    this.name = name;
    this.factory = new GameObjectFactory(this.id, settings, this);
    this.factory.create();
    this.htmlElement = this.factory.htmlRef;
    Game.registerGameObject(this)
    Utils.log(`[${name}] >>> spawned`);
  }

  customGameObjectContent?(): string {
    return '';
  }

  onAwake() {
    Utils.log(`[${this.name}] >>> onAwake`);
  }
  onStart?() {
    Utils.log(`[${this.name}] >>> onStart`);
  }
  onUpdate?() { }
  onCollisionEnter?(collider: GameObject) { }
  onDestroy?() {
    Utils.log(`[${this.name}] >>> onDestroy`);
    this.factory.destroy();
    window.cancelAnimationFrame(this.lastAnimationFrame);
    this.destroyed = true;
  }
  render?() {
    if (this.destroyed) {
      return;
    }
    this.factory.render();
    if (this.started) {
      this.onUpdate();
    } else {
      this.started = true;
      this.onStart();
    }
  }
}
