import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Article, PaginatedResponse } from '../../models/news';
import { News } from '../../services/news';
import { ArticleCard } from '../article-card/article-card';
import { ArticleText } from '../article-text/article-text';

@Component({
  selector: 'app-home-page',
  imports: [ArticleCard, ArticleText],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  articles = signal<PaginatedResponse<Article> | undefined>(undefined);
  private destroyRef = inject(DestroyRef);
  private newsService = inject(News);

  ngOnInit(): void {
    const subsc = this.newsService.getArticles().subscribe({
      next: (articles) => {
        this.articles.set(articles);
      },
    });
    this.destroyRef.onDestroy(() => {
      subsc.unsubscribe();
    });
  }
}
