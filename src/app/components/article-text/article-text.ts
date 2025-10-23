import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { News } from '../../services/news';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Article } from '../../models/news';

@Component({
  selector: 'app-article-text',
  imports: [MatIconModule],
  templateUrl: './article-text.html',
  styleUrl: './article-text.scss',
})
export class ArticleText implements OnInit {
  newsService = inject(News);
  article = signal<Article | undefined>(undefined);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = +params.get('id')!;
      const subsc = this.newsService
        .getArticle(id)
        .subscribe((result) => this.article.set(result));
      this.destroyRef.onDestroy(() => {
        subsc.unsubscribe();
      });
    });
  }
  navigate() {
    this.router.navigate(['']);
  }
}
