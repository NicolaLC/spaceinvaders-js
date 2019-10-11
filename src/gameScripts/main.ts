import { Game } from './game';
import { InputManager } from './core/class/keyboard-events';

document.addEventListener('DOMContentLoaded', (event: Event) => {
  new InputManager();
  document.body.classList.add('InGame');
  new Game();
});

/*document.getElementById('play').addEventListener('click', () => {
  document.body.classList.add('InGame');
  setTimeout(() => {
    new Game();
  }, 3000);
});*/
