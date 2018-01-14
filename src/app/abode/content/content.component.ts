import { Component, Input, OnInit } from '@angular/core';

interface OuterStyles {
  top: any;
  bottom: any;
  left: any;
  right: any;
  height: any;
  width: any;
  background: any;
  overflow: any;
}

interface InnerStyles {
  textAlign: any;
  verticalAlign: any;
  fontSize: any;
  color: any;
  textShadow: any;
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  outerStyles: OuterStyles;
  innerStyles: InnerStyles;

  /* Outer Styles */
  @Input() top: any;
  @Input() bottom: any;
  @Input() left: any;
  @Input() right: any;
  @Input() height: any;
  @Input() width: any;
  @Input() background: any;
  @Input() overflow: any;

  /* Inner Style Inputs */
  @Input() align: any;
  @Input() valign: any;
  @Input() size: any;
  @Input() color: any;
  @Input() shadow: any;

  constructor() {
  }

  ngOnInit() {
    this.outerStyles = {
      top: undefined,
      bottom: undefined,
      left: undefined,
      right: undefined,
      height: undefined,
      width: undefined,
      background: undefined,
      overflow: undefined
    };

    this.innerStyles = {
      textAlign: undefined,
      verticalAlign: undefined,
      fontSize: undefined,
      color: undefined,
      textShadow: undefined
    };

    if (this.top) { this.outerStyles.top = (this.top.indexOf('%') === -1) ? this.top + 'em' : this.top; }
    if (this.bottom) { this.outerStyles.bottom = (this.bottom.indexOf('%') === -1) ? this.bottom + 'em' : this.bottom; }
    if (this.left) { this.outerStyles.left = (this.left.indexOf('%') === -1) ? this.left + 'em' : this.left; }
    if (this.right) { this.outerStyles.right = (this.right.indexOf('%') === -1) ? this.right + 'em' : this.right; }
    if (this.height) { this.outerStyles.height = (this.height.indexOf('%') === -1) ? this.height + 'em' : this.height; }
    if (this.width) { this.outerStyles.width = (this.width.indexOf('%') === -1) ? this.width + 'em' : this.width; }
    if (this.background) { this.outerStyles.background = this.background; }
    if (this.overflow) { this.outerStyles.overflow = this.overflow || 'hidden'; }

    if (this.align) { this.innerStyles.textAlign = this.align; }
    if (this.valign) { this.innerStyles.verticalAlign = this.valign; }
    if (this.size) { this.innerStyles.fontSize = this.size + 'em'; }
    if (this.color) { this.innerStyles.color = this.color; }
    if (this.shadow) { this.innerStyles.textShadow = this.shadow; }
  }

}
