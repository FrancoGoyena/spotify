// import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

// export const roleGuard: CanActivateFn = (route, state) => {
//   return true;
// };
@Injectable({

  providedIn: 'root'

})

export class roleGuard implements CanActivate {

  constructor(private router: Router, private cookie: CookieService) { }
  canActivate(

    route: ActivatedRouteSnapshot,

    state: RouterStateSnapshot):boolean {

    return this.checkCookieSession();

  }

  checkCookieSession(): boolean {

    

      const role: string = this.cookie.get('role');

      console.log('Eexiste token', role)

      if(role=="admin")
      {
        return true;
      }
      else{
        this.router.navigate(['/tracks'])
        return false
      }
        

    }

  }







