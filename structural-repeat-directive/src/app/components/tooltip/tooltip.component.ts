import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { off } from 'process';

interface IParentPosition {
    top: number
    right: number
    bottom: number
    left: number
    width: number
}

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
    @Input() parentPosition: IParentPosition;
    @ViewChild( 'tooltip', { static: true } ) tooltipEl: ElementRef;
    isAbove = false;

    constructor( private renderer: Renderer2 ) { }

    ngOnInit(): void {
        const postition = this.tooltipEl.nativeElement.getBoundingClientRect();
        const { top, bottom, left, width } = this.parentPosition;
        const offset = 8;
        let elTop = bottom + offset;
        let elLeft = left + ( width - Number ( postition.width ) ) / 2;

        if( bottom + ( +postition.height ) > window.innerHeight  ) {
            this.isAbove = true;
            elTop = top - ( +postition.height ) - offset;
        }

        this.renderer.setStyle( this.tooltipEl.nativeElement, 'top', `${elTop}px` );
        this.renderer.setStyle( this.tooltipEl.nativeElement, 'left', `${elLeft}px` );
    }

}
