import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubscribeService } from '../services/subscribe.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css'],
})
export class SubscriptionFormComponent {
  /**
   *
   */
  constructor(private subService: SubscribeService) {}
  onSubmit(form: NgForm) {
    const subsData = {
      email: form.value.email,
      name: form.value.name,
    };
    this.subService.checkSubs(subsData.email).subscribe((val) => {
      if (val.empty) {
        this.subService.addSubs(subsData);
      } else {
        console.log('Email Already Exist');
      }
    });
    // this.subService.addSubs(subsData);
  }
}
