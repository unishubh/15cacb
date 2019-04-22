import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  constructor(private http: Http) { }
  public editorContent;
  public fd = new FormData();
  public name;
  public title;
  public base_url = 'http://localhost:3000/api/';

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.editorContent);
    this.fd.append('title', this.title);
    this.fd.append('text', this.editorContent);
    this.http.post(this.base_url + '/newBlog/', this.fd).
      subscribe(
        (response: Response) => {
          const resp = response.json();
          alert(resp.message);
        },
        (error) => {
          alert('Something went wrong');
        }
      );

  }

  onFileChange(event) {
    const file = <File>event.target.files[0];
    const ex = file.name.indexOf('.');
    this.name = file.name.substring(0, ex);
    const extension = file.name.substring(ex);
    this.fd.append('file', file, this.name + extension);
    this.fd.append('image', this.name + extension);
  }


}
