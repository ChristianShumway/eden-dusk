import { Component } from '@angular/core';
import { SharedNewsLetterComponent } from '../../../../shared/components/news-letter/news-letter.component';
@Component({
  selector: 'home-news-letter',
  standalone: true,
  imports: [
    SharedNewsLetterComponent
  ],
  templateUrl: './news-letter.component.html'
})

export class NewsLetterComponent {

}
