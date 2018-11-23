import { Component,Input, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  //On fait un binding en créant une propriété post qui prendra l'instance de l'objet courant
  //qui sera liée à l'instance du component
  @Input() post: Post;

  constructor(private postService: PostService) { }

  ngOnInit() {
  }

  onLove(post: Post){
    this.postService.love(post);
  }

  onDontLove(post: Post){
    this.postService.dontLove(post);
  }

  onRemovePost(post: Post){
    this.postService.removePost(post);
  }

}
