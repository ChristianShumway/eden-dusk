import { Component } from '@angular/core';
import { SharedNewsLetterComponent } from '../../../../shared/components/news-letter/news-letter.component';
@Component({
  selector: 'blog-newsletter-sidebar',
  standalone: true,
  imports: [
    SharedNewsLetterComponent
  ],
  templateUrl: './newsletter-sidebar.component.html'
})
export class NewsletterSidebarComponent {

}
