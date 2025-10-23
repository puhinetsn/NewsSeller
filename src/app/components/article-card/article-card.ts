import { Component, input } from '@angular/core';
import { Article } from '../../models/news';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-article-card',
  imports: [MatIconModule, DatePipe, SlicePipe],
  templateUrl: './article-card.html',
  styleUrl: './article-card.scss',
})
export class ArticleCard {
  article = input.required<Article>();
}
