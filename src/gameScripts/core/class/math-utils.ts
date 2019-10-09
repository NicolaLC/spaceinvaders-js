import { Transform } from '../interfaces/transform';
export class MathUtils {
  static lerp = (start: number, end: number, amt: number) => {
    return (1 - amt) * start + amt * end;
  };

  static checkColisionBetween(transform1: Transform, transform2: Transform) {
    return (
      transform1.position.x < transform2.position.x + transform2.scale.x &&
      transform1.position.x + transform1.scale.x > transform2.position.x &&
      transform1.position.y < transform2.position.y + transform2.scale.y &&
      transform1.position.y + transform1.scale.y > transform2.position.y
    );
  }
}
