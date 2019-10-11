/**
 * UI.js
 *
 * @description this is the core ui script
 * @author      nicolacastellanidev@gmail.com
 * @version     1.0.0.0
 */

export class UI {
  static readonly scoreUI: HTMLElement = document.getElementById('Score');
  static scoreUIAnimationTimeout: any = null;
  static setScoreUI = (text: string) => {
    UI.scoreUI.innerHTML = text;
    clearTimeout(UI.scoreUIAnimationTimeout);
    UI.scoreUI.classList.add('Shake');
    UI.scoreUIAnimationTimeout = setTimeout(() => {
      UI.scoreUI.classList.remove('Shake');
    }, 1000);
  };
}
