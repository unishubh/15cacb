import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {

  constructor(private http: Http, private router: Router) { }
  public fd = new FormData();
  public isMaster = localStorage.getItem('type') === 'master' ? true : false;
  private base_url = 'http://13.234.109.247:3000/api/';
  private url_pending_login = 'getPendingLogins';
  public logs: any = [1, 2, 3, 4, 5];
  public test: string;
  public password;
  public show = false;
  public length = 0;
  public extension: string;
  public name;
  public id = localStorage.getItem('id');
  public docs: any[] = [];
  ngOnInit() {
    this.getDocs();
    const type = localStorage.getItem('type');
    console.log(type);
    if (type === 'client') {
      console.log('if', type);
      this.isMaster = false;

    } else {
      console.log('else', type);
      this.isMaster = true;
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Access-Control-Allow-Origin', '*');
      this.http.get(this.base_url + this.url_pending_login, { headers: headers }).
        subscribe(
          (response: Response) => {
            const resp = response.json();
            this.logs = resp.data;
            this.length = this.logs.length;
            console.log(this.logs, this.length);
            this.show = true;
          },
          (error) => {
            alert('Some error occured while fetching logins');
          }
        );
    }

  }
  onFileChange(event, type = 'req') {
    const file = <File>event.target.files[0];
    const ex = file.name.indexOf('.');
    this.name = file.name.substring(0, ex);
    this.extension = file.name.substring(ex);
    this.fd.append('file', file, this.name + '_' + type + '_' + this.extension);
    this.fd.append('download_name', this.name + '_' + type + '_' + this.extension);
    console.log(file.name, this.id);

  }

  onFile(values) {
    this.fd.append('remarks', values.remarks);
    this.fd.append('id', this.id);
    this.fd.append('name', this.name + this.extension);
    const headers = new Headers();
    this.http.post(this.base_url + 'upload_client/', this.fd).
      subscribe(
        (response: Response) => {
          console.log(response);
          alert('File Uploaded successfully');
        },
        (error) => {
          alert('Something went wrong');
        }
      );

  }

  setPassword(id, password) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    const contents = new URLSearchParams();
    contents.set('password', this.password);
    contents.set('id', id);
    this.http.post(this.base_url + 'setPassword/', contents.toString(), { headers: headers }).
      subscribe(
        (response: Response) => {
          const resp = response.json();
          alert(resp.message);
          window.location.reload();
        },
        (error) => {
          alert('Some error occured while fetching logins');
        }
      );
  }
  showButton(password) {
    if (password == null) {
      return true;
    } else {
      return false;
    }
  }

  getDocs() {


    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    const contents = new URLSearchParams();
    // contents.set('id', this.id);
    let query;
    console.log(this.isMaster);
    if (this.isMaster != true) {
      query = this.base_url + 'getDocs/' + this.id;
    }
    else {
      query = this.base_url + 'getDocs/0';
    }
    this.http.get(query).
      subscribe(
        (response: Response) => {
          const resp = response.json();
          this.docs = resp.data;
          console.log(this.docs);
        },
        (error) => {
          console.log(error);
          const resp = error.json();
          alert(resp.message);
        }
      );
  }

  save(acknowledgement, tracking, udin, id) {
    console.log("in save");
    console.log(acknowledgement, tracking, udin, id);
    this.fd.append('acknowledgement', acknowledgement);
    this.fd.append('tracking', tracking);
    this.fd.append('udin', udin);
    this.fd.append('id', id);
    this.http.post(this.base_url + 'saveDetails/', this.fd).
      subscribe(
        (response: Response) => {
          const resp = response.json();
          alert(resp.message);
          // window.location.reload();
        },
        (error) => {
          alert('Some error occured while fetching logins');
        }
      );
  }

  submitDetails(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    const contents = new URLSearchParams();
    contents.set('id', id);
    console.log("Id is", id);
    this.http.post(this.base_url + 'submitDetails/', contents.toString(), { headers: headers }).
      subscribe(
        (response: Response) => {
          const resp = response.json();
          alert(resp.message);
          // window.location.reload();
        },
        (error) => {
          alert('Some error occured while fetching logins');
        }
      );
  }

  createBlog() {
    this.router.navigate(['newPost']);
  }

  createFaq() {
    this.router.navigate(['createFaq']);
  }
}
