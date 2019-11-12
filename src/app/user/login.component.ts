import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  constructor(private authService :AuthService,private router : Router) { }
  pageTitle: string = "Login";
  employee :any = { "user_name":"","password":"" };
  ngOnInit() {
  }

  login(loginForm: NgForm) {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.employee["user_name"] = userName;
      this.employee["password"] = password;
      this.authService.login(this.employee).subscribe((data)=>{  
        console.log(data);      
          if(data['employeeData'] != undefined && data['employeeData'].length > 0 )
          {            
            if(this.authService.redirectUrl)
            {
              this.router.navigateByUrl(this.authService.redirectUrl);
            } else {
              this.router.navigate(['/dashboard']);
            }
          }
          else
          {
            this.errorMessage = "Please enter valid username and password";
            console.log(this.errorMessage);
          }
      });
      // Navigate to the Product List page after log in.
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }

}
