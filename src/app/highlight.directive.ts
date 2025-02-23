
import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {
  @Input() appHighlight: string = '';
  @Input() searchTerm: string = '';

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    if (!this.searchTerm || !this.appHighlight.includes(this.searchTerm)) {
      this.el.nativeElement.innerHTML = this.appHighlight;
      return;
    }

    const regex = new RegExp(this.searchTerm, 'gi');
    this.el.nativeElement.innerHTML = this.appHighlight.replace(
      regex,
      match => `<span style="background-color: yellow;">${match}</span>`
    );
  }
}