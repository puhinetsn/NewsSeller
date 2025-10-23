import { Routes } from '@angular/router';
import { HomePage } from './components/home-page/home-page';
import { ArticleText } from './components/article-text/article-text';

export const routes: Routes = [
  { path: '', component: HomePage },
  {
    path: 'article/:id',
    component: ArticleText,
  },
];
