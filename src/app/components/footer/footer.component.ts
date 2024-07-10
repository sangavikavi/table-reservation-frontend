import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  email: string = '';

  onSubscribe() {
    console.log('Subscribed with email:', this.email);
    // Add your subscription logic here
  }
}
