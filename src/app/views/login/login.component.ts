import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private http: Http, private router: Router) { }
  private base_url = 'http://13.234.109.247:3000/api/';
  private url_register = 'register';

  ngOnInit() {

  }

  onRegister(values) {
    console.log(values);
    // tslint:disable-next-line: prefer-const
    let headers = new Headers();
    const contents = new URLSearchParams();
    contents.set('name', values.name);
    contents.set('pan', values.pan);
    contents.set('email', values.email);
    contents.set('phone', values.phone);
    contents.set('company', values.company);
    // headers.append('Authorization', `Bearer ${this.token}`);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    this.http.post(this.base_url + this.url_register, contents.toString(), { headers: headers }).
      subscribe(
        (response: Response) => {
          const resp = response.json();
          console.log(resp);
          const details = resp.details;
          alert('Successfully Registered, you will be informed your password via email shortly');
          this.router.navigate(['dashboard']);
        },
        (error) => {
          alert('Something Went Wrong');
        }
      );
  }

  onLogin(values) {
    console.log(values);
    // tslint:disable-next-line: no-var-keyword
    // tslint:disable-next-line: prefer-const
    let headers = new Headers();
    const contents = new URLSearchParams();
    contents.set('name', values.name);
    contents.set('password', values.password);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    this.http.post(this.base_url + 'login/', contents.toString(), { headers: headers }).
      subscribe(
        (response: Response) => {
          const resp = response.json();
          console.log(resp);
          const details = resp.details;
          if (resp.message === 'Logged In Successfully') {
            const token = resp.token;
            const type = resp.type;
            const id = resp.id;
            localStorage.setItem('token', token);
            localStorage.setItem('type', type);
            localStorage.setItem('id', id);
            alert(resp.message);
            this.router.navigate(['dashboard']);
          } else {
            alert(resp.message);
          }
        },
        (error) => {
          alert('Something Went Wrong');
        }
      );
  }
}
