import { Component, Input } from '@angular/core';
import { HighlightDirective } from '../../../directives/highlight.directive';
import { Product } from '../../../interfaces/product';
import { TitleTruncatePipe } from '../../../pipes/title-truncate.pipe';

@Component({
  selector: 'app-card-product-item',
  standalone: true,
  imports: [HighlightDirective,TitleTruncatePipe],
  templateUrl: './card-product-item.component.html',
  styleUrl: './card-product-item.component.css',
})
export class CardProductItemComponent {
  @Input() product?: Product;
  randomNumber: number = Math.floor(Math.random() * 10) + 1;
}
