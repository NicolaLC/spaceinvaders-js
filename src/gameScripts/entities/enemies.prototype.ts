import { Game } from '../game';
/**
 * PLAYER PROTOTYPE
 */
export class Enemies {
  player: any;
  game: Game;
  enemiesWrapper: HTMLElement = null;
  TARGET_ENEMIES_POSITION: { top: number; left: number } = {
    left: 0,
    top: 0,
  };
  ENEMIES_DIRECTION: number = 1;
  ENEMIES_SPEED: number = 2000;
  SCENE_WIDTH: number = 0;
  // CONSTANTS
  constructor(player: any, game: Game) {
    this.player = player;
    this.game = game;
    this.SCENE_WIDTH = game.SCENE_WIDTH;
    this.init();
    game.utils.log('Enemies spawned');
  }

  checkCollision = (element: HTMLElement) => {
    const { top, left } = element.getBoundingClientRect();
    let collided = document.elementsFromPoint(left, top);
    collided = collided.filter(
      (c: HTMLElement) => c.className.indexOf('Player') > -1,
    );
    if (collided.length > 0) {
      const playerElement = collided[0];
      this.player.damage();
      playerElement.classList.add('Damaged');
      setTimeout(() => {
        playerElement.classList.remove('Damaged');
      }, 500);
    }
    return (collided || []).length > 0;
  };

  move = () => {
    let { enemiesWrapper, SCENE_WIDTH } = this;
    /// we need to move the plaeyr into a specific direction
    const targetMove = 25 * this.ENEMIES_DIRECTION;
    const MAX = SCENE_WIDTH - enemiesWrapper.getBoundingClientRect().width;
    const MIN = 16;
    /// get the player current offset left
    let { offsetLeft } = enemiesWrapper;
    /// change it according to current direction
    offsetLeft += targetMove;
    this.TARGET_ENEMIES_POSITION.left = Math.min(
      MAX,
      Math.max(MIN, offsetLeft),
    );
    if (
      this.TARGET_ENEMIES_POSITION.left >= MAX ||
      this.TARGET_ENEMIES_POSITION.left <= MIN
    ) {
      this.ENEMIES_DIRECTION *= -1;
      setTimeout(() => {
        this.TARGET_ENEMIES_POSITION.top += 16 * 3;
        this.ENEMIES_SPEED -= this.ENEMIES_SPEED / 8;
        this.ENEMIES_SPEED = Math.max(500, this.ENEMIES_SPEED);
      }, this.ENEMIES_SPEED - 10);
    }

    setTimeout(() => {
      this.move();
    }, this.ENEMIES_SPEED);
  };
  render = () => {
    const { enemiesWrapper, TARGET_ENEMIES_POSITION, game } = this;
    const { lerp } = game.utils;
    /// the enemies must be rendered in a simple way
    /// moving them from left to right and viceversa
    /// let's start with the simplest case - move to left each {x} seconds
    let targetPosLeft = lerp(
      enemiesWrapper.offsetLeft,
      TARGET_ENEMIES_POSITION.left,
      0.25,
    );
    let targetPosTop = lerp(
      enemiesWrapper.offsetTop,
      TARGET_ENEMIES_POSITION.top,
      0.25,
    );
    enemiesWrapper.style.left = `${targetPosLeft}px`;
    enemiesWrapper.style.top = `${targetPosTop}px`;
  };
  shoot = () => {
    const { enemiesWrapper, game } = this;
    const bullet = document.createElement('div');
    const enemies = enemiesWrapper.querySelectorAll('.Enemy');
    const randomEnemy =
      enemies[Math.floor(Math.random() * enemies.length - 1) + 1];
    if (!randomEnemy) {
      return;
    }
    const { offsetLeft, offsetTop } = randomEnemy as any;
    bullet.classList.add('EnemyBullet');
    bullet.style.left = `${offsetLeft + enemiesWrapper.offsetLeft + 21.5}px`;
    bullet.style.top = `${offsetTop + enemiesWrapper.offsetTop + 48}px`;
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
      bullet.style.top = `${bTop}px`;
      if (bTop >= 900) {
        game.scene.removeChild(bullet);
        clearInterval(thisInterval);
      }
    }, 10);
  };
  spawnRandom = () => {
    let result = '';
    for (let i = 0; i < Math.floor(Math.random() * 6 + 3); i++) {
      for (let j = 0; j < 18; j++) {
        result += `<div class="Enemy">${
          Math.floor(Math.random() * 3) > 1 ? '👽' : '👾'
        }</div>`;
      }
    }
    this.enemiesWrapper.innerHTML = result;
  };

  init = () => {
    this.enemiesWrapper = document.querySelector('.Enemies');
    this.TARGET_ENEMIES_POSITION = {
      left: this.enemiesWrapper.offsetLeft,
      top: this.enemiesWrapper.offsetTop,
    };
    this.spawnRandom();
    this.move();
    setInterval(() => {
      this.shoot();
    }, 1000);
  };
}
