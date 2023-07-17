import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback:EventEmitter<any>=new EventEmitter<any>()
  myObservable1$:Observable<any>=new Observable()
  public audio!:HTMLAudioElement
  public trackInfo$:BehaviorSubject<any>= new BehaviorSubject(undefined)
  
  constructor() {}
}
