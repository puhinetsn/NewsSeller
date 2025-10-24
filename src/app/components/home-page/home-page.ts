import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { ArticleCard } from '../article-card/article-card';
import { Search } from '../search/search';
import { loadArticles } from '../../state/articles.actions';
import { selectArticles, selectLoading } from '../../state/articles.selectors';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ArticleCard, Search],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  private store = inject(Store);

  private $articles = this.store.select(selectArticles);
  private $loading = this.store.select(selectLoading);

  searchTerm = signal('');
  articles = toSignal(this.$articles);
  loading = toSignal(this.$loading);

  resultsCount = computed(() => this.articles()?.results?.length ?? 0);

  ngOnInit(): void {
    this.store.dispatch(loadArticles({ search: '' }));
  }

  onSearch(term: string) {
    this.searchTerm.set(term);
    this.store.dispatch(loadArticles({ search: term }));
  }
}
