import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { Observable, of } from 'rxjs';
import { map, mergeMap, tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api

  constructor(private Http:HttpClient) {
    
   }

   private skipById(listTracks: TrackModel[], id: number): Promise<TrackModel[]>{
    return new Promise((resolve, reject)=>{
      const listTmp = listTracks.filter(a => a._id != id)
      resolve(listTmp)
    })
   }

   getAllTracks$():Observable<any>{
    return this.Http.get(`${this.URL}/tracks`)
    .pipe(
      map(({data}:any)=>{
        return data
      })
    )
  }

  getAllRandom$():Observable<any>{
    return this.Http.get(`${this.URL}/tracks`, {
    headers: new HttpHeaders({authorization: 'Bearer TOKEN'})
  })
    .pipe(
      mergeMap(({data}:any)=> this.skipById(data,1)),
      tap(data => console.log('OK',data)),
      catchError((err)=>{
        const {status, statusText} = err;
        console.log('algo paso revisame ALERTA!',[status, statusText])
        return of([])
      })
    )
  }
}