import { createAction, props } from '@ngrx/store';
import { Article, PaginatedResponse } from '../models/news';

export const loadArticles = createAction(
  '[Articles] Load Articles',
  props<{ search?: string }>()
);

export const loadArticlesSuccess = createAction(
  '[Articles] Load Articles Success',
  props<{ data: PaginatedResponse<Article> }>()
);

export const loadArticlesFailure = createAction(
  '[Articles] Load Articles Failure',
  props<{ error: any }>()
);

export const loadArticle = createAction(
  '[Articles] Load Article',
  props<{ id: number }>()
);

export const loadArticleSuccess = createAction(
  '[Articles] Load Article Success',
  props<{ article: Article }>()
);

export const loadArticleFailure = createAction(
  '[Articles] Load Article Failure',
  props<{ error: any }>()
);
