import { Game } from "../../../game";
import { GameObject } from "./game-object";

/**
 * @description utility class for GameObject factory
 */
export interface GameObjectFactoryProperties {
  className: string;
  parent?: HTMLElement;
}
export class GameObjectFactory {
  htmlRef: HTMLElement;
  readonly properties: GameObjectFactoryProperties;

  private id: string;
  private gameObject: GameObject;

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
    this.htmlRef = document.createElement('div');
    this.htmlRef.classList.add(`${properties.className}`);
    this.htmlRef.style.left = `${gameObject.transform.position.x}px`;
    this.htmlRef.style.top = `${gameObject.transform.position.y}px`;
    this.htmlRef.id = this.id;
    this.htmlRef.innerHTML = this.gameObject.customGameObjectContent();
    (properties.parent ? properties.parent : Game.scene).appendChild(this.htmlRef);
  }

}