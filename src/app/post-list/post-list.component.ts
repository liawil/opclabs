import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';
import { Post } from '../models/post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  
  posts: Post[];
  //On crée une souscription qui nous permettra d'avoir un contrôle sur notre Subject 
  //qui se trouve dans notre service
  postSubscription: Subscription;
  
  constructor(private postService: PostService,private router:Router) {}

  ngOnInit() {
    // On observe notre Subject avec la méthode subscribe pour recupérer les données MAJ
    // pour MAJ notre array de Posts
    this.postSubscription = this.postService.postSubject.subscribe(
      (posts: Post[])=>{
        this.posts = posts;
      }
    );
    this.postService.emitPosts();
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
}
