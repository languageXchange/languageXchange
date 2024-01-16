import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-oauth2',
  templateUrl: './oauth2.component.html',
  styleUrls: ['./oauth2.component.scss'],
})
export class Oauth2Component implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  signInWithGoogle() {
    Browser.open({
      url: 'https://app.languageXchange.net/auth/provider/google',
    });
    // this.authService.signInWithGoogle();
  }

  signInWithFacebook() {
    this.authService.signInWithFacebook();
  }

  signInWithApple() {
    // TODO: #313  🚀 [Feature] : Native sing-in-with-apple
    this.authService.signInWithApple();
  }
}
