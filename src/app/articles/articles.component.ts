import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit, OnDestroy {
  posts: ScullyRoute[] = [];
  private routeSub!: Subscription;

  constructor(private scullyService: ScullyRoutesService) {}

  ngOnInit(): void {
    this.routeSub = this.scullyService.available$.subscribe((posts) => {
      console.log('[18:articles] posts response =>', posts);
      this.posts = posts.filter((post) => {
        console.log('post:', post);
        return post.title;
      });
      console.log('[20:articles] this.posts =>', this.posts);
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}
