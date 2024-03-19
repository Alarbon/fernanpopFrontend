import { Component, Input } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { HighlightDirective } from '../../../directives/highlight.directive';
import { TraduceStatusPipe } from '../../../pipes/traduce-status.pipe';

@Component({
  selector: 'app-item-search-product',
  standalone: true,
  imports: [HighlightDirective,TraduceStatusPipe],
  templateUrl: './item-search-product.component.html',
  styleUrl: './item-search-product.component.css'
})
export class ItemSearchProductComponent {
  @Input() product?: Product;
  randomNumber: number = Math.floor(Math.random() * 10) + 1;

}
