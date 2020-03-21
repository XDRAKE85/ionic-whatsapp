export class Chat {
    id: string;
    displayName: string = 'Chat sin nombre';
    email: string;
    emailVerified: string;
    phoneNumber: string;
    photoURL: string = 'assets/default-avatar.png';
    estado: string;

    constructor(chatData?: any){
        if( chatData){
            Object.keys( chatData).forEach( key => {
                if( chatData[key] ){
                    this[key]= chatData[key];
                }
                
            });
        }
    }
}