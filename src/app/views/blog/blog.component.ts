import { Component, OnInit } from '@angular/core';
import { PagerService } from '../../pager.service'
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {



  constructor(private pagerService: PagerService, private http: Http, private router: Router) { }
  public pager: any = {};
  public pagedItems: any = [];
  public posts = [];
  public base_url = 'http://13.234.109.247:3000/api';
  ngOnInit() {
    this.setPage(1);

  }

  setPage(page: number) {
    this.http.get(this.base_url + '/getBlogs/').
      subscribe(
        (response: Response) => {
          const resp = response.json();
          this.posts = resp.posts;
          this.pager = this.pagerService.getPager(this.posts.length, page);
          console.log(this.pager);
          this.pagedItems = this.posts.slice(this.pager.startIndex, this.pager.endIndex + 1);
          console.log(this.pagedItems);
        },
        (error) => {
          // tslint:disable-next-line: quotemark
          alert("Can't fetch posts this time");
        }
      );

  }

  displayBlog(doc) {
    console.log(doc);
    this.router.navigate(['/getPost/', doc.id]);
  }

}
