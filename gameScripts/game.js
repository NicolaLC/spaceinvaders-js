/**
 * GAME.js
 *
 * @description this is the core logic script
 * @author      nicolacastellanidev@gmail.com
 * @version     SNAPSHOT
 */

/** HTML REFERENCES */
const scene = document.querySelector('.GameScene');
const player = document.querySelector('.Player');
const enemyWrapper = document.querySelector('.Enemies');
/** ./ HTML REFERENCES */

/** GLOBALS CONST */
const LOG_STYLE = 'color: lawngreen';
const FPS = 1000 / 60;
const PL_MOVEMENT_ENUM = {
  LEFT: 65,
  RIGHT: 68,
  SHOOT: 32
}
const PL_PRESSED_KEYS = {
  LEFT: false,
  RIGHT: false,
  SHOOT: false
}
let PL_SHOOT_INTERVAL = null;
let TARGET_PL_POSITION = player.offsetLeft;
let TARGET_ENEMIES_POSITION = {
  left: enemyWrapper.offsetLeft,
  top: enemyWrapper.offsetTop
};
let ENEMIES_DIRECTION = 1;
let ENEMIES_SPEED = 2000;
const SCENE_WIDTH = scene.getBoundingClientRect().width;
/** ./ GLOBALS CONST */

/** CORE METHODS */
const _requestAnimationFrame = window.requestAnimationFrame;
const lerp = (start, end, amt) => {
  return (1 - amt) * start + amt * end
}
const checkCollision = (element) => {
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
}
const renderPlayer = () => {
  if (PL_PRESSED_KEYS.LEFT) {
    movePlayer(-1);
  } else if (PL_PRESSED_KEYS.RIGHT) {
    movePlayer(1)
  }
  if (PL_PRESSED_KEYS.SHOOT) {
    if (!PL_SHOOT_INTERVAL) {
      PL_SHOOT_INTERVAL = setInterval(() => { shoot() }, 500);
      shoot();
    };
  } else {
    if (PL_SHOOT_INTERVAL) { clearInterval(PL_SHOOT_INTERVAL) };
    PL_SHOOT_INTERVAL = null;
  }
  /// let's animate the player using a Lerp function
  const targetPos = lerp(player.offsetLeft, TARGET_PL_POSITION, .75);
  /// set the player position
  player.style.left = `${targetPos}px`;
}

const renderEnemies = () => {
  /// the enemies must be rendered in a simple way
  /// moving them from left to right and viceversa
  /// let's start with the simplest case - move to left each {x} seconds 
  let targetPosLeft = lerp(enemyWrapper.offsetLeft, TARGET_ENEMIES_POSITION.left, .25);
  let targetPosTop = lerp(enemyWrapper.offsetTop, TARGET_ENEMIES_POSITION.top, .25);
  enemyWrapper.style.left = `${targetPosLeft}px`;
  enemyWrapper.style.top = `${targetPosTop}px`;
}

const render = () => {
  /// render is the game loop
  /// we need to reach 60fps
  /// so we need to call the render method 60 times per second
  /// so 60 * 60 times per minutes (1200 times)
  /// to reach this frame gap we need to divide a second (1000 ms) into 60
  renderPlayer();
  renderEnemies();
  setTimeout(() => {
    _requestAnimationFrame(render);
  }, FPS);
}


const movePlayer = (direction) => {
  /// we need to move the plaeyr into a specific direction
  const targetMove = 100 * direction;
  /// get the player current offset left
  let { offsetLeft } = player;
  /// change it according to current direction
  offsetLeft += targetMove;
  /// so set a targetPlayerPosition instead of changing it's style
  /// we need to limit the player position to the scene boundaries
  /// we need also to consider the player width
  /// 16 = 1rem - the padding of our scene
  TARGET_PL_POSITION = Math.min(SCENE_WIDTH - player.getBoundingClientRect().width, Math.max(16, offsetLeft));
}

const shoot = () => {
  const bullet = document.createElement('div');
  bullet.classList.add('Bullet');
  bullet.style.left = `${player.offsetLeft + 20}px`;
  bullet.style.top = `700px`;
  scene.appendChild(bullet);
  bullet.classList.add('Shooted');
  const thisInterval = setInterval(() => {
    const collides = checkCollision(bullet);
    if (collides) {
      scene.removeChild(bullet);
      clearInterval(thisInterval);
      return;
    }
    const bTop = bullet.getBoundingClientRect().top;
    bullet.style.top = `-${bTop}px`;
    if (bTop <= 100) {
      scene.removeChild(bullet);
      clearInterval(thisInterval);
    }
  }, 10);
}

const playerMovement = () => {
  if (!player) {
    throw new Error('NO PLAYER SET - severity: HIGH');
  }
  window.addEventListener('keydown', (event) => {
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
      default: break;
    }
  });
  window.addEventListener('keyup', (event) => {
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
      default: break;
    }
  });
}

const enemiesMovement = () => {
  /// we need to move the plaeyr into a specific direction
  const targetMove = 25 * ENEMIES_DIRECTION;
  const MAX = SCENE_WIDTH - enemyWrapper.getBoundingClientRect().width;
  const MIN = 16;
  /// get the player current offset left
  let { offsetLeft } = enemyWrapper;
  /// change it according to current direction
  offsetLeft += targetMove;
  TARGET_ENEMIES_POSITION.left = Math.min(MAX, Math.max(MIN, offsetLeft));
  if (TARGET_ENEMIES_POSITION.left >= MAX - 25 || TARGET_ENEMIES_POSITION.left <= MIN + 25) {
    ENEMIES_DIRECTION *= -1;
    setTimeout(() => {
      TARGET_ENEMIES_POSITION.top += 16 * 3;
      ENEMIES_SPEED -= ENEMIES_SPEED / 4;
      ENEMIES_SPEED = Math.max(1000, ENEMIES_SPEED);
    }, ENEMIES_SPEED / 2);
  }
  setTimeout(() => {
    enemiesMovement();
  }, ENEMIES_SPEED);
}

/** ./ CORE METHODS */

(() => {
  console.log(`%cGame core is ready ... `, LOG_STYLE);
  console.log(`%cSettings game core loop ... `, LOG_STYLE);
  render();
  console.log(`%cSettings player movement ... `, LOG_STYLE);
  playerMovement();
  console.log(`%cSettings enemies movement ... `, LOG_STYLE);
  enemiesMovement();
})()


/**
 * NEXT STEPS
 *
 * 1. Player shoot
 * 2. Componentization
 * 3. Score
 */