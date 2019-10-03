import { EventEmitter } from 'events';
export enum KEYS {
  LEFT = 65,
  RIGHT = 68,
  SPACEBAR = 32,
}
export class Input {
  onKeyDown: EventEmitter = new EventEmitter();
  onKeyUp: EventEmitter = new EventEmitter();

  protected KEYS_PRESSED: { [key: string]: boolean } = {
    LEFT: false,
    RIGHT: false,
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
          this.KEYS_PRESSED.LEFT = true;
          this.KEYS_PRESSED.RIGHT = false;
          break;
        case KEYS.RIGHT:
          this.KEYS_PRESSED.RIGHT = true;
          this.KEYS_PRESSED.LEFT = false;
          break;
        case KEYS.SPACEBAR:
          this.KEYS_PRESSED.SPACEBAR = true;
          break;
        default:
          break;
      }
      this.onKeyDown.emit(`${keyCode}`);
    });
    window.addEventListener('keyup', event => {
      const { keyCode } = event;
      switch (keyCode) {
        case KEYS.LEFT:
          this.KEYS_PRESSED.LEFT = false;
          break;
        case KEYS.RIGHT:
          this.KEYS_PRESSED.RIGHT = false;
          break;
        case KEYS.SPACEBAR:
          this.KEYS_PRESSED.SPACEBAR = false;
          break;
        default:
          break;
      }
      this.onKeyUp.emit(`${keyCode}`);
    });
  }

  public keyPressed(keyCode: KEYS): boolean {
    return this.KEYS_PRESSED[KEYS[keyCode]];
  }
}
