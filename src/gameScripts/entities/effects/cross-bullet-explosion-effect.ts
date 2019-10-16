import { GameObject } from '../../core/class/GameObject/game-object';
import { Transform } from '../../core/interfaces/transform';
/**
 * PLAYER PROTOTYPE
 */
export class CrossBulletExplosionEffect extends GameObject {
  constructor(transform: Transform) {
    super(
      name,
      {
        images: ['assets/images/CrossBulletExplosionEffect.png'],
      },
      transform,
    );
    setTimeout(() => {
      super.onDestroy();
    }, 1000);
  }
}
