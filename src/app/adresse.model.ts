import { HttpClient } from '@angular/common/http';
import { Pointdinteret } from './pointInteret.model';

export class AdresseModel {

    public httpclient:HttpClient;

    
    constructor(public designation: string,
                public description: string,
                public lieu: number,
                public longitude: string,
                public latitude: string,
                public pointDinterer: Pointdinteret,
                public userId: number,
                public adresseId: number,
                public nomLieu: string,
                public adresseNote:string,
                public descriptionId:string,
                public isFavoris?:Boolean,
                ){
 
    }

  

    editAdresse(){
        return new Promise((resolve, reject) => {
            this.httpclient.get<any>('http://somewhere.ifcad.info/adresse/update.php',{
                params: {
                    designation     : this.description+'',
                    precision_lieu  : this.lieu+'',
                    description     : this.description+'',
                    user            : this.userId+'',
                    contrat         : "XYZ",
                    latitude        : this.latitude+'',
                    longitude       : this.longitude+'',
                    p_interet       : this.pointDinterer+'',
                    id              : this.adresseId+'',
                },
            }).subscribe(
            (res) => {
                resolve((res))
            },
            (error) => {
            reject(error)
            }
            );
        });
    }

    delAdresse(){
        return new Promise((resolve, reject) => {
            this.httpclient.get<any>('http://somewhere.ifcad.info/adresse/delete.php',{
                params: {
                id: this.adresseId+''
                },
            }).subscribe(
            (res) => {
                resolve((res))
            },
            (error) => {
            reject(error)
            }
            );
        });
    }
    
    addAdresse(){
        return new Promise((resolve, reject) => {
            this.httpclient.get<any>('http://somewhere.ifcad.info/adresse/create.php',{
                params: {
                    designation     : this.description+'',
                    precision_lieu  : this.lieu+'',
                    description     : this.description+'',
                    user            : this.userId+'',
                    contrat         : "XYZ",
                    latitude        : this.latitude+'',
                    longitude       : this.longitude+'',
                    p_interet       : this.pointDinterer+''
                },
            }).subscribe(
            (res) => {
                resolve((res))
            },
            (error) => {
                reject(error)
            }
            );
        });
    }


 
}