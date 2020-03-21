import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user:any;
  constructor( private firestore: AngularFirestore, private afAuth: AngularFireAuth) { 
    this.user =this.afAuth.auth.currentUser
  }

  addUser(uid,user){
    return this.firestore.collection('users').doc(uid).set( user);
  }
  getUsers(){
    return this.firestore.collection('users').snapshotChanges();
  }
  updateUser(uid, userData){
    this.user.updateProfile(userData);
    return this.firestore.collection('users').doc(uid).update(userData);
  }
  getUserByPhone(phone:string){
    phone=phone.replace(/\s/g,'')
    console.log(phone)
    return this.firestore.collection('users', ref => ref.where('phoneNumber','==',phone)).snapshotChanges()
  }
  getUserById(id:string){
    return this.firestore.collection('users').doc(id).snapshotChanges()
  }
}
