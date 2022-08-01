import { IsAuthorizedResponse } from './models/isAuthorizedResponse';
import { Component } from '@angular/core';
import { SocialUser, SocialAuthService } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'SignInWithGoogleAngularFRONT';

  private isAuthorizedURL = 'https://localhost:5001/api/Secured'

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };

  user: SocialUser | null;

  $isAuthorized: Observable<IsAuthorizedResponse> = this.http.get<IsAuthorizedResponse>(this.isAuthorizedURL);

  constructor(private authService: SocialAuthService, private http: HttpClient) {
    this.user = null;
    this.authService.authState.subscribe((user: SocialUser) => {
      console.log(user);
      if (user) {
        this.http.post<any>('https://localhost:5001/api/user/authenticate', { idToken: user.idToken }).subscribe((authToken: any) => {
          console.log(authToken);
          localStorage.setItem("jwt", authToken.authToken);
        })
      }
      this.user = user;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((x: any) => console.log(x));
  }

  signOut(): void {
    this.authService.signOut();
  }

  hasApiAccess(): boolean {
    const token = localStorage.getItem("jwt");
    return token != undefined;
  }

  // get isAuthorized(): Observable<IsAuthorizedResponse> {
  //   return this.http.get<IsAuthorizedResponse>(this.isAuthorizedURL);
  // }

} 