import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlDirective } from './safe-html.directive';
import { MarkdownDirective } from './markdown.directive';


@NgModule({
  declarations: [
    SafeHtmlDirective,
    MarkdownDirective,
  ],
  imports: [
    CommonModule,
  ],
})
export class DirectivesModule {
}
