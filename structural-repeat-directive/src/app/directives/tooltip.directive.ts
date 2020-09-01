import { Directive, Input, ComponentFactoryResolver, ElementRef, OnInit, ViewContainerRef, HostListener, Renderer2 } from '@angular/core';
import { TooltipComponent } from '../components/tooltip/tooltip.component';

@Directive({
  selector: '[epTooltip]'
})
export class TooltipDirective {
    @Input() epTooltipContent: string;

    constructor( private componentFactoryResolver: ComponentFactoryResolver,
                 private elementRef: ElementRef,
                 private viewContainerRef: ViewContainerRef,
                 private renderer: Renderer2 ) { }

    @HostListener( 'mouseover' )
        onmouseover(): void {
            this.viewContainerRef.clear();
            this.renderer.setStyle( this.elementRef.nativeElement, 'cursor', 'pointer' );

            const position = this.elementRef.nativeElement.getBoundingClientRect();
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory( TooltipComponent );
            const componentRef = this.viewContainerRef.createComponent<TooltipComponent>( componentFactory );
            componentRef.instance.parentPosition = {
                top: +position.top,
                right: +position.right,
                bottom: +position.bottom,
                left: +position.left,
                width: +position.width,
            }
        }
    
    @HostListener( 'mouseleave' )
        onmouseleave(): void {
            this.viewContainerRef.clear();
        }
}
