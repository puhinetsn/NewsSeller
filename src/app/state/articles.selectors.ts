import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticlesState } from './article.reducer';

export const selectArticlesState =
  createFeatureSelector<ArticlesState>('articles');

export const selectArticles = createSelector(
  selectArticlesState,
  (state) => state.articles
);

export const selectSelectedArticle = createSelector(
  selectArticlesState,
  (state) => state.selectedArticle
);

export const selectLoading = createSelector(
  selectArticlesState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectArticlesState,
  (state) => state.error
);
