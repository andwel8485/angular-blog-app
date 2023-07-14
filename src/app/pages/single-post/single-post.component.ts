import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  /**
   *
   */
  postId: string = '';
  post: any;
  similarPosts: Array<any> = [];
  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.postId = val['id'];
      this.postService.incrementViews(this.postId);
      this.postService.loadSinglePost(this.postId).subscribe((val) => {
        this.post = val;
        this.loadSimilarPost(this.post.category.categoryId);
      });
    });
  }

  loadSimilarPost(categoryId: string) {
    this.postService.loadSingleCategoryPost(categoryId, 3).subscribe((val) => {
      this.similarPosts = val;
      console.log(this.similarPosts);
    });
  }
}
