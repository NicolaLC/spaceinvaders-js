import { GameObject } from '../../core/class/GameObject/game-object';
import { Transform } from '../../core/interfaces/transform';
/**
 * PLAYER PROTOTYPE
 */
export class ShootEffect extends GameObject {
  constructor(transform: Transform) {
    super(
      name,
      {
        images: ['assets/images/ShootEffect.png'],
      },
      transform,
    );
    setTimeout(() => {
      super.onDestroy();
    }, 50);
  }
}
