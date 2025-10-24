import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Article, PaginatedResponse } from '../../models/news';
import { News } from '../../services/news';
import { ArticleCard } from '../article-card/article-card';
import { Search } from '../search/search';

@Component({
  selector: 'app-home-page',
  imports: [ArticleCard, Search],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  articles = signal<PaginatedResponse<Article> | undefined>(undefined);
  private destroyRef = inject(DestroyRef);
  private newsService = inject(News);
  searchTerm = signal('');

  ngOnInit(): void {
    const subsc = this.newsService.getArticles(this.searchTerm()).subscribe({
      next: (articles) => {
        this.articles.set(articles);
      },
    });
    this.destroyRef.onDestroy(() => {
      subsc.unsubscribe();
    });
  }

  onSearch(term: string) {
    this.searchTerm.set(term);
    this.changeList();
  }

  changeList() {
    this.newsService.getArticles(this.searchTerm()).subscribe((articles) => {
      this.articles.set(articles);
    });
  }
}
