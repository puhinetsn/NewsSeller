import { createReducer, on } from '@ngrx/store';
import * as ArticlesActions from './articles.actions';
import { Article, PaginatedResponse } from '../models/news';

export interface ArticlesState {
  articles: PaginatedResponse<Article> | null;
  selectedArticle: Article | null;
  loading: boolean;
  error: any;
}

export const initialState: ArticlesState = {
  articles: null,
  selectedArticle: null,
  loading: false,
  error: null,
};

export const articlesReducer = createReducer(
  initialState,

  on(ArticlesActions.loadArticles, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ArticlesActions.loadArticlesSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    articles: data,
  })),

  on(ArticlesActions.loadArticlesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(ArticlesActions.loadArticle, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ArticlesActions.loadArticleSuccess, (state, { article }) => ({
    ...state,
    loading: false,
    selectedArticle: article,
  })),

  on(ArticlesActions.loadArticleFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
