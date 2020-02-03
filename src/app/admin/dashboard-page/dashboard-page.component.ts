import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {AuthService} from '../shared/services/auth.service';
import {Post} from '../../shared/interfaces/interfaces';
import {PostsService} from '../../shared/services/posts.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

//postSubscription - переменная для результата вызова в ngOnInit метода getAllPosts(observable), что бы в ngOnDestroy отписаться, во избежание утечек памяти
  pSub: Subscription;
  removeSub: Subscription;
  posts: Post[] = [];
  searchStr = '';
  constructor(
    private auth: AuthService,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.pSub = this.postsService.getAllPosts().subscribe((posts) => {
        console.log('Dashboard-page: ', posts);
        this.posts = posts;
      })
  }

  remove(id: string) {
    this.removeSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter((post) => {
        return post.id !== id;
      })
    })
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if (this.removeSub) {
      this.removeSub.unsubscribe()
    }
  }
}
