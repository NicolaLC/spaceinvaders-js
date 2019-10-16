import { GameObject } from '../../core/class/GameObject/game-object';
import { Transform } from '../../core/interfaces/transform';
/**
 * PLAYER PROTOTYPE
 */
export class Explosion extends GameObject {
  constructor(transform: Transform) {
    super(
      name,
      {
        images: ['assets/images/explosion.png'],
      },
      transform,
    );
    setTimeout(() => {
      super.onDestroy();
    }, 1000);

    setInterval(() => {
      this.transform.scale.x /= 1.1;
      this.transform.scale.y /= 1.1;
    }, 100 / 60);
  }
}
