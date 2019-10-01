import { Game } from '../game';
/**
 * PLAYER PROTOTYPE
 */
export class Player {
  // constants
  PL_LIFE: number = 3;
  PL_MOVEMENT_ENUM: any = {
    LEFT: 65,
    RIGHT: 68,
    SHOOT: 32,
  };
  PL_PRESSED_KEYS: any = {
    LEFT: false,
    RIGHT: false,
    SHOOT: false,
  };
  PL_SHOOT_INTERVAL: any = null;
  TARGET_PL_POSITION: number = 0;
  destroyed: boolean = false;
  playerHTMLElement: HTMLElement = null;
  game: Game;

  constructor(game: Game) {
    this.game = game;
    this.init();
    game.utils.log('Player spawned');
  }

  checkCollision = (element: HTMLElement) => {
    const { top, left } = element.getBoundingClientRect();
    let collided = document.elementsFromPoint(left, top);
    collided = collided.filter(c => c.className.indexOf('Enemy') > -1);
    if (collided.length > 0) {
      const enemy = collided[0];
      enemy.classList.remove('Enemy');
      enemy.classList.add('Destroyed');
      enemy.innerHTML = '💥';
      setTimeout(() => {
        enemy.innerHTML = '';
      }, 1000);
    }
    return (collided || []).length > 0;
  };

  move = (direction: 1 | -1) => {
    if (this.destroyed) {
      return;
    }
    let { playerHTMLElement, game } = this;
    if (!playerHTMLElement) {
      return;
    }
    /// we need to move the plaeyr into a specific direction
    const targetMove = 50 * direction;
    /// get the player current offset left
    let { offsetLeft } = playerHTMLElement;
    /// change it according to current direction
    offsetLeft += targetMove;
    /// so set a targetPlayerPosition instead of changing it's style
    /// we need to limit the player position to the scene boundaries
    /// we need also to consider the player width
    /// 16 = 1rem - the padding of our scene
    this.TARGET_PL_POSITION = Math.min(
      game.SCENE_WIDTH - playerHTMLElement.getBoundingClientRect().width,
      Math.max(16, offsetLeft),
    );
  };

  shoot = () => {
    const { playerHTMLElement, game } = this;
    const bullet = document.createElement('div');
    bullet.classList.add('Bullet');
    bullet.style.left = `${playerHTMLElement.offsetLeft + 21.5}px`;
    bullet.style.top = `700px`;
    game.scene.appendChild(bullet);
    bullet.classList.add('Shooted');
    const thisInterval = setInterval(() => {
      const collides = this.checkCollision(bullet);
      if (collides) {
        game.scene.removeChild(bullet);
        clearInterval(thisInterval);
        return;
      }
      const bTop = bullet.getBoundingClientRect().top;
      bullet.style.top = `-${bTop}px`;
      if (bTop <= 100) {
        game.scene.removeChild(bullet);
        clearInterval(thisInterval);
      }
    }, 10);
  };

  playerEvents = () => {
    const { PL_PRESSED_KEYS, PL_MOVEMENT_ENUM } = this;
    window.addEventListener('keydown', event => {
      const { keyCode } = event;
      switch (keyCode) {
        case PL_MOVEMENT_ENUM.LEFT:
          // movePlayer(-1);
          PL_PRESSED_KEYS.LEFT = true;
          PL_PRESSED_KEYS.RIGHT = false;
          break;
        case PL_MOVEMENT_ENUM.RIGHT:
          PL_PRESSED_KEYS.RIGHT = true;
          PL_PRESSED_KEYS.LEFT = false;
          break;
        case PL_MOVEMENT_ENUM.SHOOT:
          PL_PRESSED_KEYS.SHOOT = true;
          break;
        default:
          break;
      }
    });
    window.addEventListener('keyup', event => {
      const { keyCode } = event;
      switch (keyCode) {
        case PL_MOVEMENT_ENUM.LEFT:
          // movePlayer(-1);
          PL_PRESSED_KEYS.LEFT = false;
          break;
        case PL_MOVEMENT_ENUM.RIGHT:
          PL_PRESSED_KEYS.RIGHT = false;
          break;
        case PL_MOVEMENT_ENUM.SHOOT:
          PL_PRESSED_KEYS.SHOOT = false;
          break;
        default:
          break;
      }
    });
  };
  render = () => {
    if (this.destroyed) {
      return;
    }
    let { PL_PRESSED_KEYS, playerHTMLElement, TARGET_PL_POSITION, game } = this;
    if (PL_PRESSED_KEYS.LEFT) {
      this.move(-1);
    } else if (PL_PRESSED_KEYS.RIGHT) {
      this.move(1);
    }
    if (PL_PRESSED_KEYS.SHOOT) {
      if (!this.PL_SHOOT_INTERVAL) {
        this.PL_SHOOT_INTERVAL = setInterval(() => {
          this.shoot();
        }, 250);
        this.shoot();
      }
    } else {
      if (this.PL_SHOOT_INTERVAL) {
        clearInterval(this.PL_SHOOT_INTERVAL);
      }
      this.PL_SHOOT_INTERVAL = null;
    }
    /// let's animate the player using a Lerp function
    const targetPos = game.utils.lerp(
      playerHTMLElement.offsetLeft,
      TARGET_PL_POSITION,
      0.75,
    );
    /// set the player position
    playerHTMLElement.style.left = `${targetPos}px`;
  };

  damage = () => {
    this.PL_LIFE--;
    if (this.PL_LIFE <= 0) {
      this.destroyed = true;
    }
  };

  init = () => {
    this.playerHTMLElement = document.querySelector('.Player');
    this.TARGET_PL_POSITION = this.playerHTMLElement.offsetLeft;
    this.playerEvents();
  };
}
