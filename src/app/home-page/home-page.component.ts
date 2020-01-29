import { Component, OnInit } from '@angular/core';
import {Interfaces} from '../shared/interfaces/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts: Interfaces[];

  constructor() { }

  ngOnInit() {
    console.log('OnInit');
    setTimeout(() => {
      this.posts = [
        {title: 'My first post', author: 'Roman', date: new Date('2.5.2017')},
        {title: 'Ibanez JS 24P', author: 'John', date: new Date('11.30.2019')},
        {title: 'MusicMan', author: 'Joe', date: new Date('12.25,2018')},
        {title: 'About my vocal', author: 'Grace', date: new Date('1.1.2020')}
      ];
      this.posts.sort(this.sortPosts('date'));
    }, 300);
  }

  sortPosts(field) {
    return (a, b) => {
      return a[field] < b[field] ? 1 : -1;
    };
  }
}
