import { EventEmitter } from 'events';
export enum KEYS {
  LEFT = 65,
  RIGHT = 68,
  UP = 87,
  SPACEBAR = 32,
}
export class InputManager {
  static onKeyDown: EventEmitter = new EventEmitter();
  static onKeyUp: EventEmitter = new EventEmitter();

  protected static KEYS_PRESSED: { [key: string]: boolean } = {
    LEFT: false,
    RIGHT: false,
    UP: false,
    SPACEBAR: false,
  };

  constructor() {
    this.initEvents();
  }

  initEvents() {
    window.addEventListener('keydown', event => {
      const { keyCode } = event;
      switch (keyCode) {
        case KEYS.LEFT:
          InputManager.KEYS_PRESSED.LEFT = true;
          InputManager.KEYS_PRESSED.RIGHT = false;
          break;
        case KEYS.RIGHT:
          InputManager.KEYS_PRESSED.RIGHT = true;
          InputManager.KEYS_PRESSED.LEFT = false;
          break;
        case KEYS.UP:
          InputManager.KEYS_PRESSED.UP = true;
          break;
        case KEYS.SPACEBAR:
          InputManager.KEYS_PRESSED.SPACEBAR = true;
          break;
        default:
          break;
      }
      InputManager.onKeyDown.emit(`${keyCode}`);
    });
    window.addEventListener('keyup', event => {
      const { keyCode } = event;
      switch (keyCode) {
        case KEYS.LEFT:
          InputManager.KEYS_PRESSED.LEFT = false;
          break;
        case KEYS.RIGHT:
          InputManager.KEYS_PRESSED.RIGHT = false;
          break;
        case KEYS.UP:
          InputManager.KEYS_PRESSED.UP = false;
          break;
        case KEYS.SPACEBAR:
          InputManager.KEYS_PRESSED.SPACEBAR = false;
          break;
        default:
          break;
      }
      InputManager.onKeyUp.emit(`${keyCode}`);
    });
  }

  public static keyPressed(keyCode: KEYS): boolean {
    return InputManager.KEYS_PRESSED[KEYS[keyCode]];
  }
}
