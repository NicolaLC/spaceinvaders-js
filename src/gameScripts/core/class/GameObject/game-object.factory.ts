import { Game } from '../../../game';
import { GameObject } from './game-object';
import { TextureLoader, SpriteMaterial, Sprite } from 'three';
/**
 * @description utility class for GameObject factory
 */
export interface GameObjectFactoryProperties {
  className: string;
  images?: any[];
  parent?: HTMLElement;
}
export class GameObjectFactory {
  htmlRef: HTMLElement;
  readonly properties: GameObjectFactoryProperties;

  private id: string;
  private gameObject: GameObject;
  private currentImage = new Image();
  private sprite: Sprite;

  constructor(
    id: string,
    properties: GameObjectFactoryProperties,
    gameObject: GameObject,
  ) {
    this.id = id;
    this.properties = properties;
    this.gameObject = gameObject;
  }

  destroy() {
    Game.unregisterGameObject(this.gameObject);
    delete this.gameObject;
  }

  create() {
    const { properties, gameObject } = this;
    const { transform } = gameObject;
    if (properties.images) {
      var map = (new TextureLoader() as any).load(properties.images[0]);
      var material = new SpriteMaterial({ map: map, color: 0xffffff });
      var sprite = new Sprite(material);
      sprite.scale.set(transform.scale.x, transform.scale.y, transform.scale.z);
      sprite.position.set(
        transform.position.x,
        transform.position.y,
        transform.position.z,
      );
      Game.mainScene.add(sprite);
      this.sprite = sprite;
    }
  }

  render() {
    const { gameObject, sprite, properties } = this;
    const { transform } = gameObject;
    if (sprite) {
      sprite.position.set(
        transform.position.x,
        transform.position.y,
        transform.position.z,
      );
    }
  }
}
