import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  selectSelectedArticle,
  selectLoading,
} from '../../state/articles.selectors';
import { loadArticle } from '../../state/articles.actions';
import { Article } from '../../models/news';

@Component({
  selector: 'app-article-text',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './article-text.html',
  styleUrl: './article-text.scss',
})
export class ArticleText implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private $article = this.store.select(selectSelectedArticle);
  article = toSignal(this.$article);
  loading = toSignal(this.store.select(selectLoading));

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = +params.get('id')!;
      if (!isNaN(id)) {
        this.store.dispatch(loadArticle({ id }));
      }
    });
  }

  navigate() {
    this.router.navigate(['']);
  }
}
