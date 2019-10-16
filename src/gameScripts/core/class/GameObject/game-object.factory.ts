import { Game } from '../../../game';
import { GameObject } from './game-object';
import { TextureLoader, SpriteMaterial, Sprite, Texture } from 'three';
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
    if (!this.sprite) {
      return;
    }
    this.sprite.material.dispose();
    this.sprite.geometry.dispose();
    Game.mainScene.remove(this.sprite);
    this.sprite.remove();
    Game.unregisterGameObject(this.gameObject);
    this.sprite = null;
  }

  create() {
    const { properties, gameObject } = this;
    const { transform } = gameObject;
    if (properties.images) {
      Game.textureLoader.load(properties.images[0], (texture: Texture) => {
        var material = new SpriteMaterial({
          map: texture,
          rotation: transform.rotation.z,
        });
        let sprite = new Sprite(material);
        sprite.scale.set(
          transform.scale.x,
          transform.scale.y,
          transform.scale.z,
        );
        sprite.position.set(
          transform.position.x,
          transform.position.y,
          transform.position.z,
        );

        sprite.rotation.set(
          transform.rotation.x,
          transform.rotation.y,
          transform.rotation.z,
        );
        Game.mainScene.add(sprite);
        this.sprite = sprite;
      });
    }
  }

  render() {
    if (this.gameObject.destroyed) return;
    const { gameObject, sprite } = this;
    const { transform } = gameObject;
    if (sprite) {
      sprite.position.set(
        transform.position.x,
        transform.position.y,
        transform.position.z,
      );
      sprite.rotation.set(
        transform.rotation.x,
        transform.rotation.y,
        transform.rotation.z,
      );
      sprite.scale.set(transform.scale.x, transform.scale.y, transform.scale.z);
    }
  }
}
