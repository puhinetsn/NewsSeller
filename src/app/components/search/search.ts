import { Component, DestroyRef, inject, OnInit, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search',
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
  standalone: true,
})
export class Search implements OnInit {
  searchControl = new FormControl('');
  searchChanged = output<string>();
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map((value) => (value ?? '').trim()),
        filter((value) => value.length === 0 || value.length >= 2),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => {
        this.searchChanged.emit(value);
      });
  }
}
