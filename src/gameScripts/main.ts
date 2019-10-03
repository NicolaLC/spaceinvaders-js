import { Game } from './game';
import { Input } from './core/class/keyboard-events';

document.addEventListener('DOMContentLoaded', (event: Event) => {
  new Game(new Input());
});
