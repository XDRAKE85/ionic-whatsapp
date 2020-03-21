export class User {
    uid: string;
    phoneNumber: string;
    displayName: string;
    photoURL: string;
    estado: string;
    last_connection: Date;

    constructor(userData?: any){
        if( userData){
            Object.keys( userData).forEach( key => {
                this[key]= userData[key];
            });
            if( !userData.photoURL){
                this.photoURL= 'assets/default-avatar.png';
            }
        }
        
    }
}