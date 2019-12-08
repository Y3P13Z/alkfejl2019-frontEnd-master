import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService, httpOptions } from '../auth.service';
import { User } from '../User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder, private httpClient : HttpClient, private router: Router, private auth: AuthService) {
    this.registerForm = formBuilder.group({
      username:['', Validators.required],
      password:['', Validators.required],
      confirmPassword:['', Validators.required]
    })
   }

  ngOnInit() { 
  }

  async onSubmit(): Promise<User>{
    try{
    this.submitted = true;
    if(this.registerForm.invalid){
      return;
    }
    
    var registerRequest = {
      username: String = this.registerForm.controls.username.value,
      password: String = this.registerForm.controls.password.value,
      confirmPassword: String = this.registerForm.controls.confirmPassword.value
    }
    console.log(httpOptions);
    var user = await this.httpClient.post<User>("http://localhost:8080/register", registerRequest, httpOptions).toPromise();
    this.success = true; 
    console.log(this.auth.user.username)
    console.log(user);
    return Promise.resolve(user as User);
    
  }catch(e){
    Promise.reject();
    console.log(e);
  }finally{
    this.router.navigate(['/order']);
  }

 }
}
