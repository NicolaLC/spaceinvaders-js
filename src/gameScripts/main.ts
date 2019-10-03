import { Game } from './game';
import { InputManager } from './core/class/keyboard-events';

document.addEventListener('DOMContentLoaded', (event: Event) => {
  new InputManager();
  new Game();
});
