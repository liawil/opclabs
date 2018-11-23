import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){
    const config = {
      apiKey: "AIzaSyC3I9zBYXEa8DjNnQYVX_tSExUwDZ-COZ0",
      authDomain: "exo-app-blog.firebaseapp.com",
      databaseURL: "https://exo-app-blog.firebaseio.com",
      projectId: "exo-app-blog",
      storageBucket: "",
      messagingSenderId: "687476696841"
    };
    firebase.initializeApp(config);
  }
}
