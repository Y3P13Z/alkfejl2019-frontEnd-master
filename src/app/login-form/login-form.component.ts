import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router, private auth: AuthService) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    
  }

  async onSubmit() {
    try {
      this.submitted = true;
      if (this.loginForm.invalid) {
        return;
      }
      this.success = true;
      var username: String = this.loginForm.controls.username.value;
      var password: String = this.loginForm.controls.password.value;

      //this.httpClient.post("http://localhost:8080/login", loginRequest).subscribe();
      var user = await this.auth.login(username, password);
      console.log(user);
      this.router.navigate(['/order']);
    } catch (e) {
      console.log("Can't believe");
    }
  }




}
