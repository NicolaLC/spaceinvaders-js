import { Transform } from '../../interfaces/transform';
import { Script } from 'vm';
import { Utils } from '../utils';
import { MathUtils } from '../math-utils';
import {
  GameObjectFactory,
  GameObjectFactoryProperties,
} from './game-object.factory';
import { Game } from '../../../game';
import { Vector3 } from 'three';
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

  constructor(
    name: string,
    settings: GameObjectFactoryProperties,
    transform?: Transform,
  ) {
    this.id = Utils.guid();
    this.transform = transform || {
      position: new Vector3(0, 0, 0),
      rotation: new Vector3(0, 0, 0),
      scale: new Vector3(1, 1, 0),
    };
    this.name = name;
    this.factory = new GameObjectFactory(this.id, settings, this);
    this.factory.create();
    this.htmlElement = this.factory.htmlRef;
    Game.registerGameObject(this);
  }

  customGameObjectContent?(): string {
    return '';
  }

  checkCollision() {
    if (!this.onCollisionEnter) {
      return;
    }
    const { id } = this;
    Game.gameObjects.map(go => {
      if (go.id !== id) {
        const collides = MathUtils.checkColisionBetween(
          go.transform,
          this.transform,
        );
        if (collides) {
          this.onCollisionEnter(go);
        }
      }
    });
  }

  onAwake() {}

  onStart?() {}

  onUpdate?() {}
  onCollisionEnter?(collider?: GameObject) {}
  onDestroy?() {
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
