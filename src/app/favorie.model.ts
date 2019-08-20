import { AdresseModel } from './adresse.model';
import { HttpClient } from '@angular/common/http';
import { Pointdinteret } from './pointInteret.model';

export class FavorieModel extends AdresseModel{

public httpclient:HttpClient;

    constructor (public designation: string,
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
                public nomFavorie:string,
                public idFavorie:number){
                super(designation,description,lieu,longitude,latitude,pointDinterer,userId,adresseId,nomLieu,adresseNote,descriptionId)
                }
    editFavorie(){
        return new Promise((resolve, reject) => {
            this.httpclient.get<any>('http://somewhere.ifcad.info/favoris/update.php',{
                params: {
                id: this.idFavorie+'',
                nom: this.nomFavorie,
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

    delFavorie(){
        return new Promise((resolve, reject) => {
            this.httpclient.get<any>('http://somewhere.ifcad.info/favoris/delete.php',{
                params: {
                id: this.idFavorie+''
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

    addFavorie(){
        return new Promise((resolve, reject) => {
            this.httpclient.get<any>('http://somewhere.ifcad.info/favoris/create.php',{
                params: {
                adresse: this.adresseId+'',
                nom: this.nomFavorie,
                user:this.userId+''
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