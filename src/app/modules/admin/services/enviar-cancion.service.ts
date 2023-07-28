import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnviarCancionService {

  private readonly URL = environment.api
  constructor(private http: HttpClient) { }

  sendSong(name:string,album:string,cover:string,artist:string):Observable<any>{

    const body = {
      name,
      album,
      cover,
      artist
    }
    return this.http.post(`${this.URL}/tracks/add`,body)
  }

  getSongs(name:string,album:string,cover:string,artist:string):Observable<any>{
    
    return this.http.get(`${this.URL}/tracks`)
  }

  editSong(id:string | number,name:string,album:string,cover:string,artist:string):Observable<any>{

    const body = {
      name,
      album,
      cover,
      artist
    }
    return this.http.put(`${this.URL}/tracks/edit/${id}`,body)
  }

  deleteSong(id:string | number):Observable<void>{
    return this.http.delete<void>(`${this.URL}/tracks/delete/${id}`)
  }
}
