export class MathUtils {
  static lerp = (start: number, end: number, amt: number) => {
    return (1 - amt) * start + amt * end;
  };
}
