export class Utils {
  LOG_STYLE: string = 'color: lawngreen';
  lerp = (start: number, end: number, amt: number) => {
    return (1 - amt) * start + amt * end;
  };
  log = (message: string) => {
    console.log(`%c${message}`, this.LOG_STYLE);
  };
}
