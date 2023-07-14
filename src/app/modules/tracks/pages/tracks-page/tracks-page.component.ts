import { Component } from '@angular/core';
import * as dataRaw from '../../../../data/tracks.json'
import { TrackModel } from '@core/models/tracks.models';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent {
tracksTrending:Array<TrackModel>=[]
tracksRandom:Array<TrackModel>=[]

listObservers$:Array<Subscription>=[]
constructor(private trackService:TrackService){}

ngOnInit(): void{
  const Observer1$ = this.trackService.dataTracksTrending$
  .subscribe(response=>{
    this.tracksTrending = response
    this.tracksRandom=response
    console.log('canciones trending', response);
  })

  const Observer2$ = this.trackService.dataTracksRandom$
  .subscribe(response=>{
    this.tracksRandom=[... this.tracksRandom, ... response]
    console.log('canciones random entrando', response);
  })

  this.listObservers$=[Observer1$, Observer2$]
}

ngOnDestroy():void{
  this.listObservers$.forEach(u=>u.unsubscribe())
}
}
