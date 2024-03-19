import { Injectable, inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from '@angular/fire/auth';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../interfaces/user-profile';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = this.auth.currentUser;
  private _userProfile?: UserProfile;

  private http = inject(HttpClient);

  private urlBackend = `${environment.urlBackend}/auth`;
  constructor(private auth: Auth) {}

  async getUser() {
    return await this.auth
      .setPersistence(browserLocalPersistence)
      .then(async () => {
        return this.auth.currentUser;
      });
  }
  get userProfile() {
    if (!this._userProfile) this.loginBackend();
    return this._userProfile;
  }

  public async registerEmail(email: string, password: string, name: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
        updateProfile(this.user, { displayName: name });
        this.registerBackend();
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  public async loginEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
        this.loginBackend();
        return true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        return false;
      });
  }

  public async loginGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((userCredential) => {
        this.user = userCredential.user;
        this.loginBackend();
        return true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        return true;
      });
  }

  async logout() {
    try {
      await this.auth.signOut();
      this.user = null;
      this._userProfile = undefined;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  editName(name: string) {
    updateProfile(this.user!, { displayName: name });
  }



  editPhoto(photoUrl: string) {
    updateProfile(this.user!, { photoURL: photoUrl });
  }

  private async registerBackend() {
    console.log('registerBackend');

    const id = this.user?.uid;

    console.log(this.urlBackend + `/register/${id}`);

    return this.http
      .get<UserProfile>(this.urlBackend + `/register/${id}`)
      .subscribe(
        (res) => {
          this._userProfile = res;
          console.log('registerBackend');

          console.log(this._userProfile);

          //borro token localstorage
          localStorage.removeItem('token');

          //guardar token en localstorage
          localStorage.setItem('token', this._userProfile.token);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  private async loginBackend() {
    const id = this.user?.uid;
    return this.http
      .get<UserProfile>(this.urlBackend + `/login/${id}`)
      .subscribe(
        (res) => {
          res;
          this._userProfile = res;

          if (this._userProfile.statusCode == 400) this.registerBackend();

          //borro token localstorage
          localStorage.removeItem('token');

          //guardar token en localstorage
          localStorage.setItem('token', this._userProfile.token);
        },
        (error) => {
          this.registerBackend();
        }
      );
  }

  async checkUserProfileJWT() {
    const token = localStorage.getItem('token');
    if (token) {
      return this.http
        .get<UserProfile>(this.urlBackend + `/check-jwt`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .subscribe(
          (res) => {
            this._userProfile = res;
          },
          (error) => {
            console.log(error);
          }
        );
    }
    return null;
  }
}
