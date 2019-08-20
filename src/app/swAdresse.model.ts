import { HttpClient } from '@angular/common/http';
import { Reference } from './reference.model';

export class SwAdresseModel {

    public httpclient:HttpClient;

    
    constructor(public description: string,
                public quartier: string,
                public commune: string,
                public lat: string,
                public lng: string,
                public utilisateur: string,
                public voiture: string,
                public moto: string,
                public piedton: string,
                public picture: string,
                public reference: Reference[],
                public id?: string,
                public designation?: string,
                ){
 
    }
    
    addAdresse(){
            this.httpclient.post<any>('https://somewhereapp.fr/API/adresse/create.php',{
                params: {
                    lat : this.lat,
                    lng : this.lng,
                    user : this.utilisateur,
                    voiture : this.voiture,
                    moto : this.moto,
                    pieton : this.piedton,
                    references : this.reference,
                    id : this.id,
                },
            }).subscribe(
            (res) => {
                return true;
            },
            (error) => {
                return false;
            }
            );
    }


 
}