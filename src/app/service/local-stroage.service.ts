import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ICache { [key: string]: BehaviorSubject<any>; }
// type serializable = object | Object;

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private cache: ICache;

    constructor() {
        this.cache = Object.create(null);
    }

    setItem(key: string, value: any): BehaviorSubject<any> {
        localStorage.setItem(key, JSON.stringify(value));

        if (this.cache[key]) {
            this.cache[key].next(value);
            return this.cache[key];
        }

        return this.cache[key] = new BehaviorSubject(value);
    }

    getItem(key: string): BehaviorSubject<any> {
        if (this.cache[key])
            return this.cache[key];
        else
            return this.cache[key] = new BehaviorSubject(JSON.parse(localStorage.getItem(key)!));
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
        if (this.cache[key])
            this.cache[key].next(undefined);
    }
    public clear() {
        localStorage.clear();
    }
}



// import { Injectable } from '@angular/core';
// @Injectable({
//     providedIn: 'root'
// })
// export class LocalStorageService {
//   constructor() { }
//   public setItem(key: string, value: any) {
//     localStorage.setItem(key, value);
//   }
    
//   public getItem(key: string) { 
//     return localStorage.getItem(key)
//   }
//   public removeItem(key:string) {
//     localStorage.removeItem(key);
//   }
//   public clear(){
//     localStorage.clear(); 
//   }
// }











// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// interface MyData {
//     data: string;
// }

// @Injectable({
//     providedIn: 'root'
// })
// export class LocalStorageService {

//   private _myData$ = new BehaviorSubject<MyData>(null!);
//   myData$ = this._myData$.asObservable();

//   constructor() { }
//   public setItem(key: string, value: any) {
//     const jsonData = JSON.stringify(value);
//     localStorage.setItem(key, jsonData);
//     this._myData$.next(value);
//   }
    
//   public getItem(key: string) { 
//     const data = JSON.parse(localStorage.getItem(key)!);
//     this._myData$.next(data);
//   }
//   public removeItem(key:string) {
//     localStorage.removeItem(key);
//     this._myData$.next(null!);
//   }
//   public clear(){
//     localStorage.clear();
//     this._myData$.next(null!);
//   }
// }