import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective implements OnInit {
  @Input() randomNumber: number | undefined;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    if (this.randomNumber === 1) {
      this.el.nativeElement.style.backgroundColor = '#65c3c8';
      this.el.nativeElement.addEventListener('mouseenter', () => {
        this.el.nativeElement.style.backgroundColor = '#83cfd3';
      });
      this.el.nativeElement.addEventListener('mouseleave', () => {
        this.el.nativeElement.style.backgroundColor = '#65c3c8';
      });
      this.renderer.setProperty(
        this.el.nativeElement,
        'textContent',
        'Destacado'
      );
    } else if (this.randomNumber === 2) {
      this.el.nativeElement.style.backgroundColor = '#ef9fbc';
      this.el.nativeElement.addEventListener('mouseenter', () => {
        this.el.nativeElement.style.backgroundColor = '#f2b2c9';
      });
      this.el.nativeElement.addEventListener('mouseleave', () => {
        this.el.nativeElement.style.backgroundColor = '#ef9fbc';
      });
      this.renderer.setProperty(
        this.el.nativeElement,
        'textContent',
        'Para ti'
      );
    } else {
    }
  }
}
