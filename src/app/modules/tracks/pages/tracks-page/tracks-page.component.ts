import { Component, OnDestroy, OnInit } from '@angular/core';
//import * as dataRaw from '../../../../data/tracks.json'
import { TrackModel } from '@core/models/tracks.models';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy{
tracksTrending:Array<TrackModel>=[]
tracksRandom:Array<TrackModel>=[]

listObservers$:Array<Subscription>=[]
constructor(private trackService:TrackService){}

ngOnInit(): void{
  this.loadDataAll()
  this.loadDataRandom()
  
}

loadDataAll():void{
  this.trackService.getAllTracks$()
  .subscribe((response: TrackModel[]) =>{
    this.tracksTrending=response
  })
}

loadDataRandom():void{
  this.trackService.getAllRandom$()
  .subscribe((response: TrackModel[]) =>{
    this.tracksRandom=response
  })
}

ngOnDestroy():void{
}
}
