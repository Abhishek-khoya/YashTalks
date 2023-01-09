import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  UserCredential,
  User,
} from '@angular/fire/auth';
import { concatMap, from, Observable, of, switchMap,pipe } from 'rxjs'
import { user } from '@angular/fire/auth';
import { SignInUser, SignUpUser } from '../models/user';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  currentUser$ = authState(this.auth);
  userFireList!:AngularFireList<any>;
  userFireObject!:AngularFireObject<any>;

  constructor(private auth: Auth) {}
  signUp({email,password,displayName}:SignUpUser) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({user})=>updateProfile(user,{displayName}))
    );
  }

  login({email,password}:SignInUser) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }
}
