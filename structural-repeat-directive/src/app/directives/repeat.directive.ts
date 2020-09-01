import { Directive, TemplateRef, ViewContainerRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[ngRepeat]'
})
export class RepeatDirective implements OnInit {
    @Input() ngRepeat: number;

    constructor( private templateRef: TemplateRef<any>,
                private viewRef: ViewContainerRef) { }

    ngOnInit(): void {
        this.viewRef.clear();
        for( let i = 0; i < this.ngRepeat; i++ ) {
            this.viewRef.createEmbeddedView( this.templateRef );
        }
    }
}
