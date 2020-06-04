import { Component } from '@angular/core';
import { BreakpointService } from 'src/app/cores/services/breakpoint.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(public readonly breakpointService: BreakpointService) {}
}
