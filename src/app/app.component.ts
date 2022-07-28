import { Component } from '@angular/core';
import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SignInWithGoogleAngularFRONT';

 user: SocialUser | null;

  constructor(private authService: SocialAuthService) {
    this.user = null;
    this.authService.authState.subscribe((user: SocialUser) => {
      console.log(user);
      this.user = user;
    });
  }

  signInWithGoogle(): void {
   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((x: any) => console.log(x));
  }

  signOut(): void {
   this.authService.signOut();
  }
} 