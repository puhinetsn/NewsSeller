import { AfterViewInit, Component, inject, input, OnInit } from '@angular/core';
import { Article } from '../../models/news';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, SlicePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-card',
  imports: [MatIconModule, DatePipe, SlicePipe],
  templateUrl: './article-card.html',
  styleUrl: './article-card.scss',
})
export class ArticleCard implements OnInit {
  article = input.required<Article>();
  private router = inject(Router);
  term = input.required<string>();

  highlightedTitle = '';
  highlightedSummary = '';

  ngOnInit(): void {
    const keywords = this.term()
      .split(',')
      .map((k) => k.trim().toLowerCase());
    let title = this.article().title;
    let summary = this.article().summary;

    if (keywords && keywords.length > 0) {
      for (const keyword of keywords) {
        if (keyword) {
          const regex = new RegExp(`(${keyword})`, 'gi');
          title = title.replace(regex, `<span class="highlight">$1</span>`);
          summary = summary.replace(regex, `<span class="highlight">$1</span>`);
        }
      }
    }

    this.highlightedTitle = title;
    this.highlightedSummary = summary;
  }

  navigate(articleId: number) {
    this.router.navigate(['/article', articleId]);
  }
}
