import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrackModel } from '@core/models/tracks.models';
import { EnviarCancionService } from '@modules/admin/services/enviar-cancion.service';
import { SearchService } from '@modules/history/services/search.service';
import { TrackService } from '@modules/tracks/services/track.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent {
  listResults$:Observable<any>=of([])
  constructor(private trackService:TrackService, private searchService:SearchService,private enviarcancion: EnviarCancionService,private editarcancion: EnviarCancionService){}
  receiveData(event:string){
    if (event.trim()===''){
      this.tracksFilter=this.tracks
    }
    else{
      this.tracksFilter=this.tracks.filter(track => track.name.toLowerCase().includes(event.toLowerCase()))
      this.listResults$=this.searchService.searchTracks$(event)
    }
    this.listResults$=of(this.tracksFilter)
  }
  errorSession:boolean=false
  formSong:FormGroup=new FormGroup({});
  formEditSong:FormGroup=new FormGroup({});
  tracks: TrackModel[]=[]
  trackToEdit:any;
  tracksFilter:any;

  LoadSongs(){
    this.searchService.searchTracks$('').subscribe(
      (data:any[])=>{
        this.tracks=data;
        this.tracksFilter=data;
        this.listResults$=of(this.tracksFilter);
      }
    )
  }

  ngOnInit():void{
    this.LoadSongs()
    this.trackService.getAllTracks$().subscribe(tracks=>{
      this.tracks=tracks;
      console.log("TRACKS", tracks)
    });
    this.formSong=new FormGroup(
      {
        name:new FormControl('',[
          Validators.required
        ]),
        album:new FormControl('',[
          Validators.required
        ]),
        cover:new FormControl('',[
          Validators.required
        ]),
        artist:new FormControl('',[
          Validators.required
        ])
      }
    )
    this.formEditSong=new FormGroup(
      {
        name:new FormControl('',[
          Validators.required
        ]),
        album:new FormControl('',[
          Validators.required
        ]),
        cover:new FormControl('',[
          Validators.required
        ]),
        artist:new FormControl('',[
          Validators.required
        ])
      }
    )
  }

  getSongs(){
    const {name, album,cover,artist} = this.formEditSong.value
    this.enviarcancion.getSongs(name,album,cover,artist).subscribe(
      (data)=>{
        this.getSongs=data;
      },
      (error)=>{
        console.log("error al obtener las canciones", error)
      }
    )
  }

  sendASong():void{
    const {name, album,cover,artist} = this.formSong.value
    this.enviarcancion.sendSong(name,album,cover,artist)
    .subscribe(responseOk=>{
      console.log('Cancion enviada correctamente', responseOk);
      this.LoadSongs()
    })
  }
  mostrarForm:boolean=false;
  mostrarOcultarFormulario(track:any){
    this.mostrarForm=!this.mostrarForm;
    this.trackToEdit=track;
  }

  editASong(track:any):void{
    const {name, album,cover,artist} = this.formEditSong.value
    this.editarcancion.editSong(track.uid,name,album,cover,artist)
    .subscribe(responseOk=>{
      console.log('Cancion editada correctamente', responseOk);
      this.mostrarForm=false
      this.LoadSongs()
    },
    (error)=>{
      console.log("error al editar la cancion", error)
    })
  }

  deleteSong(track:any){
    console.log("id aca", track)
    this.enviarcancion.deleteSong(track.uid).subscribe(
      ()=>{
        console.log("Cancion eliminada con exito")
        this.LoadSongs()
      },
      (error)=>{
        console.log("error al eliminar la cancion", error)
      }
    )
  }
}
