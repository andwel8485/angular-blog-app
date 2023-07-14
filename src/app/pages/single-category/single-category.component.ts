import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css'],
})
export class SingleCategoryComponent implements OnInit {
  /**
   *
   */

  singleCategoryPosts: Array<any> = [];
  categoryId: string = '';
  categoryName: string = '';
  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.categoryId = val['id'];
      this.categoryName = val['category'];
      this.postService
        .loadSingleCategoryPost(val['id'], 6)
        .subscribe((posts) => {
          this.singleCategoryPosts = posts;
        });
    });
  }
}
