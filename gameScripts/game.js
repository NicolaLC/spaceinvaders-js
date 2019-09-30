/**
 * GAME.js
 *
 * @description this is the core logic script
 * @author      nicolacastellanidev@gmail.com
 * @version     SNAPSHOT
 */
/** ./ CORE METHODS */
/** HTML REFERENCES */
const scene = document.querySelector('.GameScene');
const enemyWrapper = document.querySelector('.Enemies');
/** ./ HTML REFERENCES */

/** GLOBALS CONST */
let player = new Player();
let enemies = new Enemies(player);
const LOG_STYLE = 'color: lawngreen';
const FPS = 1000 / 60;
const SCENE_WIDTH = scene.getBoundingClientRect().width;
/** ./ GLOBALS CONST */

/** CORE METHODS */
const _requestAnimationFrame = window.requestAnimationFrame;
const lerp = (start, end, amt) => {
  return (1 - amt) * start + amt * end
}

const restart = () => {
  /*player = new Player();
  enemies = new Enemies(player);
  init();*/
  window.location.reload();
}

const render = () => {
  /// render is the game loop
  /// we need to reach 60fps
  /// so we need to call the render method 60 times per second
  /// so 60 * 60 times per minutes (1200 times)
  /// to reach this frame gap we need to divide a second (1000 ms) into 60
  if (player.destroyed) {
    /// player destroyed
    restart();
  }
  player.render();
  enemies.render();
  setTimeout(() => {
    _requestAnimationFrame(render);
  }, FPS);
}

const init = () => {
  console.log(`%cGame core is ready ... `, LOG_STYLE);
  console.log(`%cINIT player ... `, LOG_STYLE);
  player.init();
  console.log(`%cINIT enemies ... `, LOG_STYLE);
  enemies.init();
  console.log(`%cSettings game core loop ... `, LOG_STYLE);
  render();
}

(() => {
  init();
})()


/**
 * NEXT STEPS
 * 1. Player life
 * 2. Score
 * 3. Effects
 * 4. End Game
 * 5. Intro
 */