import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {}
