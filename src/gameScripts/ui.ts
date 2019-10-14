/**
 * UI.js
 *
 * @description this is the core ui script
 * @author      nicolacastellanidev@gmail.com
 * @version     1.0.0.0
 */

export class UI {
  static readonly scoreUI: HTMLElement = document.getElementById('scoreLabel');
  static scoreUIAnimationTimeout: any = null;

  static readonly bottomUI: HTMLElement = document.querySelector('.UI .Bottom');
  static readonly shieldUI: HTMLElement = document.getElementById('Shield');
  static readonly lifeUI: HTMLElement = document.getElementById('Life');

  static setScoreUI = (text: string) => {
    UI.scoreUI.innerHTML = text;
    clearTimeout(UI.scoreUIAnimationTimeout);
    UI.scoreUI.classList.add('Shake');
    UI.scoreUIAnimationTimeout = setTimeout(() => {
      UI.scoreUI.classList.remove('Shake');
    }, 1000);
  };

  static setBottomUIOpacity = (opacity: string) => {
    UI.bottomUI.style.opacity = opacity;
  };

  static updateShieldAmount(amount: string) {
    let bar = UI.shieldUI.querySelector('.Bar') as HTMLElement;
    let label = UI.shieldUI.querySelector('b') as HTMLElement;
    bar.style.width = amount;
    label.innerHTML = `[${amount}]`;
  }

  static updateLifeAmount(amount: string) {
    let bar = UI.lifeUI.querySelector('.Bar') as HTMLElement;
    let label = UI.lifeUI.querySelector('b') as HTMLElement;
    bar.style.width = amount;
    label.innerHTML = `[${amount}]`;
  }
}
