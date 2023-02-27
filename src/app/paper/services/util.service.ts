import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class UtilService {
  /**
   * UUID generation is a complex topic. The reason I chose the implementation
   * shown below, refer to this answer on stackoverflow:
   * https://stackoverflow.com/a/21963136/454477
   * and the reference fiddle here: http://jsfiddle.net/jcward/7hyaC/3/
   */
  static uuid(): string {
    return Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
  }

  static getRandomInt(min = 0, max = 1000_000_000): number {
    if (max < min) {
      let temp = min;
      min = max;
      max = temp;
    }
    return min + Math.floor(Math.random() * (max + 1 - min));
  }
}
