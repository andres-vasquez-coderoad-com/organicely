import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

 constructor(private router: Router, private authService: AuthService) { 
  }

  error = false;

  ngOnInit() {
    if(this.authService.verifyLogged()){
      this.router.navigate(['../pages/home']);
    }
  }

  onLogin(form : any){
    this.error = false;
    //console.log('Form',form.value);
    this.authService.login({
      email: form.value.email,
      password: form.value.password,
      returnSecureToken: true
    }).subscribe(
      res => {
        //console.log('LOGIN RESPONSE: ', res);
        this.router.navigate(['../pages/home']);
      },
      err => {
        this.error=true;
        //console.log('LOGIN ERROR: ');
      }
    ) 
  }

  onRegister(){
    this.router.navigate(['/login/register']);
  }
}