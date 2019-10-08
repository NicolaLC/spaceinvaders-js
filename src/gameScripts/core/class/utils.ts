import { Guid } from 'guid-typescript';

export class Utils {
  static LOG_STYLE: string = 'color: lawngreen; background: #4a4a4a;padding: .25rem;';
  static log = (message: string) => {
    console.log(`%c${message}`, Utils.LOG_STYLE);
  };
  static guid = () => {
    return Guid.create().toString();
  }
}
