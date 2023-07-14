import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from '../models/subscription';

@Injectable({
  providedIn: 'root',
})
export class SubscribeService {
  constructor(private fs: AngularFirestore) {}

  addSubs(subs: Subscription) {
    this.fs
      .collection('subscriber')
      .add(subs)
      .then((ref) => {
        console.log('Subscription Added');
      });
  }

  checkSubs(email: string) {
    return this.fs
      .collection('subscriber', (ref) => ref.where('email', '==', email))
      .get();
  }
}
