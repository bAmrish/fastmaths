import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class StorageService {
  save(key: string, object: any): void {
    const objectString = JSON.stringify(object)
    localStorage.setItem(key, objectString);
  }

  get(key: string): any | null {
    const objectString = localStorage.getItem(key)
    if(!objectString) return null;

    return JSON.parse(objectString);
  }
}
