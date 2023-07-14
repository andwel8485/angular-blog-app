import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  /**
   *
   */

  featuredPosts: Array<any> = [];
  latestPosts: Array<any> = [];
  constructor(private postService: PostService) {}
  ngOnInit(): void {
    this.postService.loadFeaturedPost().subscribe((posts) => {
      this.featuredPosts = posts;
      console.log(posts);
    });
    this.postService.loadLatestPost().subscribe((posts) => {
      this.latestPosts = posts;
      console.log(posts);
    });
  }
}
