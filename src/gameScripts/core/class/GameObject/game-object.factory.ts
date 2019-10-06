import { Game } from "../../../game";
import { GameObject } from "./game-object";

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

  constructor(id: string, properties: GameObjectFactoryProperties, gameObject: GameObject) {
    this.id = id;
    this.properties = properties;
    this.gameObject = gameObject;
  }

  destroy() {
    this.htmlRef.parentElement.removeChild(this.htmlRef);
  }

  create() {
    const { properties, gameObject } = this;
    const { transform } = gameObject;
    if (properties.images) {
      var spriteImage = new Image();
      spriteImage.src = properties.images[0];
      this.currentImage = spriteImage;
      spriteImage.onload = function () {
        Game.sceneContext.drawImage(spriteImage, transform.position.x, transform.position.y, transform.scale.x, transform.scale.y);
      };
    }
  }

  render() {
    const { gameObject, currentImage, properties } = this;
    const { transform } = gameObject;
    if (properties.images) {
      Game.sceneContext.drawImage(currentImage, transform.position.x, transform.position.y, transform.scale.x, transform.scale.y);
    }
  }

}