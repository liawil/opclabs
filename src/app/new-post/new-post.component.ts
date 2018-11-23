import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  //On déclare un FormGroup qui va nous permettre de construire notre formulaire
  postForm: FormGroup;

  constructor(private postService: PostService,private router:Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  //On utilise la méthode réactive; On initialise donc notre formulaire grâce à FormBuilder
  initForm(){
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  //La methode qui va permettre la soumission d'un post
  onSavePost() {
    //On recupère la value du title saisie dans le formulaire
    const title = this.postForm.get('title').value;
    //On recupère la value du content saisie dans le formulaire
    const content = this.postForm.get('content').value;
    //On crée une nouvelle instance de Post grâce aux valeurs recupérées
    const newPost = new Post(title,content);
    //On sauvegarde le post dans la BD à l'aide de la methode createNewPost de notre  PostService
    this.postService.createNewPost(newPost);
    //On rédirige l'utilisateur vers la page qui affiche la liste des posts
    this.router.navigate(['/posts']);
  }

}
