import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { News } from '../services/news';
import * as ArticlesActions from './articles.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ArticlesEffects {
  private actions$ = inject(Actions);
  private newsService = inject(News);

  loadArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticlesActions.loadArticles),
      mergeMap(({ search }) =>
        this.newsService.getArticles(search).pipe(
          map((data) => ArticlesActions.loadArticlesSuccess({ data })),
          catchError((error) =>
            of(ArticlesActions.loadArticlesFailure({ error }))
          )
        )
      )
    )
  );

  loadArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticlesActions.loadArticle),
      mergeMap(({ id }) =>
        this.newsService.getArticle(id).pipe(
          map((article) => ArticlesActions.loadArticleSuccess({ article })),
          catchError((error) =>
            of(ArticlesActions.loadArticleFailure({ error }))
          )
        )
      )
    )
  );
}
