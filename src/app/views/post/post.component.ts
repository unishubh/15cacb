import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  private base_url = 'http://13.234.109.247:3000/api/';
  private post_url = 'getPost/';
  public id: number;
  public doc:{};
  public isDisplay = false;
  public posts :any[];
  constructor(private route: ActivatedRoute, private http: Http, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        console.log(params);
        this.id = params['id'];
        this.getPost();
        this.getSimilarPosts();
      }
    );
  }

  getPost() {
    this.http.get(this.base_url + this.post_url + this.id)
    .subscribe(
      (response:Response) => {
        const resp = response.json();
        console.log(resp);
        this.doc = resp.post;
        this.isDisplay = true;
      },
      (error) => {
        alert('Some error Occured');
      }
    );
  }

  getSimilarPosts() {
    this.http.get(this.base_url + '/getBlogs/').
    subscribe(
      (response: Response) => {
        const resp = response.json();
        this.posts = resp.posts;
        this.posts = this.posts.slice(0,10);
        console.log(this.posts);
      },
      (error) => {
        alert('Some error Occured');
      }
    );
  }

  showPost(doc) {
    console.log(doc.title);
  }

}
