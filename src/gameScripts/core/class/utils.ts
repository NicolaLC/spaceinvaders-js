export class Utils {
  static LOG_STYLE: string = 'color: lawngreen';
  static log = (message: string) => {
    console.log(`%c${message}`, Utils.LOG_STYLE);
  };
}
