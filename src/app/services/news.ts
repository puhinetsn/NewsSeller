import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Article, ArticleResponse, PaginatedResponse } from '../models/news';

@Injectable({
  providedIn: 'root',
})
export class News {
  private http = inject(HttpClient);
  getArticles(): Observable<PaginatedResponse<Article>> {
    return this.http
      .get<PaginatedResponse<ArticleResponse>>(
        'https://api.spaceflightnewsapi.net/v4/articles/?limit=6'
      )
      .pipe(
        map((result) => {
          const articles = result.results;
          const newArticles = articles.map((article) => {
            const mappedArticle: Article = {
              ...article,
              published_at: new Date(),
              updated_at: new Date(),
            };
            mappedArticle.published_at = new Date(article.published_at);
            mappedArticle.updated_at = new Date(article.updated_at);
            return mappedArticle;
          });
          return { ...result, results: newArticles };
        })
      );
  }

  getArticle(id: number): Observable<Article> {
    return this.http
      .get<ArticleResponse>(
        `https://api.spaceflightnewsapi.net/v4/articles/${id}/`
      )
      .pipe(
        map((result) => {
          const editableArticle = {
            ...result,
            published_at: new Date(),
            updated_at: new Date(),
          };

          editableArticle.published_at = new Date(editableArticle.published_at);
          editableArticle.updated_at = new Date(editableArticle.updated_at);
          return editableArticle;
        })
      );
  }
}
