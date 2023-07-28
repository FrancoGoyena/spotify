import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {
  errorSession:boolean=false
  formLogin:FormGroup=new FormGroup({});

  constructor(private AuthService: AuthService, private cookie:CookieService, private router:Router){}

  ngOnInit():void{
    this.formLogin=new FormGroup(
      {
        email:new FormControl('franco@franco.com',[
          Validators.required,
          Validators.email
        ]),
        password:new FormControl('12345678',[
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
      }
    )
  }

  sendLogin():void{
    const {email, password} = this.formLogin.value
    this.AuthService.sendCredentials(email,password)
    .subscribe(responseOk=>{
      console.log('Sesion iniciada correctamente', responseOk);
      const {tokenSession, data} = responseOk
      this.cookie.set('token', tokenSession, 4, '/')
      this.cookie.set('role', data.role, 4, '/')
      this.router.navigate(['/','tracks'])
    },
    err=>{
      this.errorSession=true
      console.log('Ocurrio un error con tu email o contraseña')
    })
  }
}
