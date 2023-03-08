import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
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

  // Below method creates a deep clone method passed in.
  // Taken from https://javascript.plainenglish.io/deep-clone-an-object-and-preserve-its-type-with-typescript-d488c35e5574
  static clone<T>(source: T): T {
    return Array.isArray(source) ? source.map(item => this.clone(item)) as T
      : source instanceof Date ? new Date(source.getTime()) as T
        : (source && typeof source === 'object') ?
          Object.getOwnPropertyNames(source)
            .reduce((o: T, prop: string) => {
                Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop)!);
                //@ts-ignore
                o[prop] = this.clone((source as { [key: string]: any })[prop]);
                return o;
              }, Object.create(Object.getPrototypeOf(source))
            ) as T
          : source as T;
  }
}
