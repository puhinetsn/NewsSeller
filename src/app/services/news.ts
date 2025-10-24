import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap, of } from 'rxjs';
import { Article, ArticleResponse, PaginatedResponse } from '../models/news';

@Injectable({
  providedIn: 'root',
})
export class News {
  private http = inject(HttpClient);

  getArticles(search?: string): Observable<PaginatedResponse<Article>> {
    return this.http
      .get<PaginatedResponse<ArticleResponse>>(
        `https://api.spaceflightnewsapi.net/v4/articles/?limit=6&title_contains_all=${search}`
      )
      .pipe(
        switchMap((resultTitle) => {
          const mapArticles = (
            res: PaginatedResponse<ArticleResponse>
          ): PaginatedResponse<Article> => ({
            ...res,
            results: res.results.map((article) => ({
              ...article,
              published_at: new Date(article.published_at),
              updated_at: new Date(article.updated_at),
            })),
          });

          if (resultTitle.results.length >= 6) {
            return of(mapArticles(resultTitle));
          }

          return this.http
            .get<PaginatedResponse<ArticleResponse>>(
              `https://api.spaceflightnewsapi.net/v4/articles/?limit=${
                6 - resultTitle.results.length
              }&summary_contains_all=${search}`
            )
            .pipe(
              map((resultSummary) => {
                const mergedResults = [
                  ...resultTitle.results,
                  ...resultSummary.results,
                ];

                return mapArticles({
                  ...resultTitle,
                  results: mergedResults,
                });
              })
            );
        })
      );
  }

  getArticle(id: number): Observable<Article> {
    return this.http
      .get<ArticleResponse>(
        `https://api.spaceflightnewsapi.net/v4/articles/${id}/`
      )
      .pipe(
        map((result) => ({
          ...result,
          published_at: new Date(result.published_at),
          updated_at: new Date(result.updated_at),
        }))
      );
  }
}
