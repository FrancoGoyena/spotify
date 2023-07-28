import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  mainMenu:{defaultOptions: Array<any>,accessLink: Array<any>} = {defaultOptions:[], accessLink:[]}

  customOptions: Array<any> = []
  constructor(private router:Router, private cookieService:CookieService){}


  ngOnInit(): void{
    const role: string = this.cookieService.get('role')
    this.mainMenu.defaultOptions=[
      {
        name:'Home',
        icon:'uil uil-estate',
        router:['/','auth']
      },
      {
        name:'Buscar',
        icon:'uil uil-search',
        router:['/','history']
      },
      {
        name:'Tu biblioteca',
        icon:'uil uil-chart',
        router:['/','favorites']
      }
    ]
    if(role=='admin'){
      this.mainMenu.defaultOptions.push({
        name:'Administracion',
        icon:'uil uil-padlock',
        router:['/','admin'],
      })
    }
    this.mainMenu.accessLink=[
      {
        name:'Crear lista',
        icon:'uil-plus-square'
      },
      {
        name:'Canciones que te gustan',
        icon:'uil-heart-medical'
      }
    ]

    this.customOptions=[
      {
        name:'Mi lista °1',
        router:['/']
      },
      {
        name:'Mi lista °2',
        router:['/']
      },
      {
        name:'Mi lista °3',
        router:['/']
      },
      {
        name:'Mi lista °4',
        router:['/']
      }
    ]
    //this.trackService.dataTracksRandom$
    //.subscribe((response: any) =>{
    //  this.customOptions.push({
    //    name: response[0].name,
    //    router:[]
    //  })
    //})

  }
  
  goTo($event: any): void {
    this.router.navigate(['/', 'favorites'], {
      queryParams: {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3'
      }
    })
    console.log($event)
  }
}
