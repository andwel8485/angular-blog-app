import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { increment } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private fs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}
  loadFeaturedPost() {
    return this.fs
      .collection('post', (ref) => ref.where('isFeatured', '==', true).limit(3))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          })
        )
      );
  }

  loadLatestPost() {
    return this.fs
      .collection('post', (ref) => ref.orderBy('createdAt').limit(6))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          })
        )
      );
  }

  loadSingleCategoryPost(id: string, numberOfPosts: number) {
    return this.fs
      .collection('post', (ref) =>
        ref.where('category.categoryId', '==', id).limit(numberOfPosts)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a: any) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          })
        )
      );
  }

  loadSinglePost(id: string) {
    return this.fs.collection('post').doc(id).valueChanges();
  }

  incrementViews(id: string) {
    const updatedViews = {
      views: increment(1),
    };
    this.fs
      .collection('post')
      .doc(id)
      .update(updatedViews)
      .then(() => {});
  }
}
