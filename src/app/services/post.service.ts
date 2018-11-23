import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[] = [];
  postSubject = new Subject<any[]>();

  constructor() {
    this.getPosts();
  }

  // La méthode qui permet d'emettre pour mettre à jour les données grace au subject.
  emitPosts() {
    this.postSubject.next(this.posts);
  }

  createNewPost(newPost: Post) {
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts();
  }

  savePosts() {
    // la méthode firebase qui peret de sauvegarder une donnée dans la database
    //  la référence du noeud est passée comme paramète dans la methode ref('/posts')
    //  et on passe en paramètre dans la méthode set() l'instance du post qu'on veut sauvegarder
    firebase.database().ref('/posts').set(this.posts);
  }

  removePost(post: Post) {
    const postIndexToRemove = this.posts.findIndex(
      (postEl) => {
        if (postEl === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }

  getPosts() {
    firebase.database().ref('/posts')
      .on('value', (data: Datasnapshot) => {
          this.posts = data.val() ? data.val() : [];
          this.emitPosts();
        }
      );
  }

  getSinglePost(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/posts/' + id).once('value').then(
          (data: Datasnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  love(post: Post) {
    post.loveIts++;
    // On sauvegarde les changements dans le service et on emet les MAJ
    this.savePosts();
    this.emitPosts();
  }

  dontLove(post: Post) {
    post.loveIts--;
    // On sauvegarde les changements dans le service et on emet les MAJ
    this.savePosts();
    this.emitPosts();
  }
}
