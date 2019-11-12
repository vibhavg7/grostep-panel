import { Component } from '@angular/core';
import { AuthService } from './user/auth.service';
import { Router,Event,NavigationStart,NavigationEnd,NavigationError,NavigationCancel } from '@angular/router';
import { slideInAnimation } from './app.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[slideInAnimation]
})
export class AppComponent {
  pageTitle : string = 'Grostep Panel';
  loading = true;
  constructor(private authService : AuthService,private router :Router) {
    router.events.subscribe((routerevent:Event)=>{
      this.checkRouterEvent(routerevent);
    })
  }

  ngOnInit()
  {
    
  }

  checkRouterEvent(navigatorEvent:Event) {
    // console.log('checkRouterEvent');
    if(navigatorEvent instanceof NavigationStart)
    {
      // console.log('hhhhhhhhhhhhh');
      this.loading = true;
    }
    if(navigatorEvent instanceof NavigationEnd ||
       navigatorEvent instanceof NavigationError ||
       navigatorEvent instanceof NavigationCancel)
    {
      this.loading = false;
    }
  }


  get isLoggedIn()
  {
    return this.authService.isLoggedIn;
  }

  get userName()
  {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return (currentUser)?currentUser.username: '';
  }
 
  logOut()
  {
    this.authService.logout();
    this.router.navigateByUrl('/welcome');
  }
}
