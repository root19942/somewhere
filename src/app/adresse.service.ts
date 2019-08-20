import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdresseModel } from './adresse.model';
import { Subject } from 'rxjs';
import { FavorieModel } from './favorie.model';
import { Pointdinteret } from './pointInteret.model';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {
  
  public adresseSubject = new Subject<AdresseModel[]>();
  public favoriesSubject = new Subject<AdresseModel[]>();
  public mesAdressesList :AdresseModel[] = [new AdresseModel('','',0,'','', new Pointdinteret("","",0,"","","","",0),0,0,'','','')];
  public mesFavoriesList :FavorieModel[] = [new FavorieModel('','',0,'','',new Pointdinteret("","",0,"","","","",0),0,0,'','','','',0)];
  
  constructor(public httpclient:HttpClient) { 
    
    this.getMyadresses().then(
      (response)=>{
        this.mesAdressesList = <AdresseModel []> response;
        this.emitAdresses();
      }
    )

    this.getFavorisOfUser().then(
      (response)=>{
        this.mesFavoriesList = <FavorieModel []> response;
        this.emitFavorites();
      }
    )
  }

  searchadresse(query){
    return new Promise((resolve, reject) => {
      this.httpclient.get<any>('http://somewhere.ifcad.info/adresse/search.php',{
          params: {
            q: query
          },
        }).subscribe(
        (res) => {
          resolve((<AdresseModel []> res.records.map(adresse_item => new AdresseModel(adresse_item.designation,adresse_item.description,adresse_item.precision_lieu,adresse_item.longitude,adresse_item.latitude,new Pointdinteret(adresse_item.Point_interet.designation,adresse_item.Point_interet.description,adresse_item.Point_interet.id_lieu_parent,adresse_item.Point_interet.longitude,adresse_item.Point_interet.latitude,adresse_item.Point_interet.cote,adresse_item.Point_interet.type,adresse_item.Point_interet.id),adresse_item.user,adresse_item.id,adresse_item.Chemin,adresse_item.descriptionScore,adresse_item.descriptionId,false))))
        },
      (error) => {
        reject(error)
      }
      );
    });
  }

  emitAdresses() {
    this.adresseSubject.next(this.mesAdressesList.slice())
  }
  emitFavorites() {
    this.favoriesSubject.next(this.mesFavoriesList.slice())
  }

  getMyadresses(){
    return new Promise((resolve, reject) => {
      this.httpclient.get<any>('http://somewhere.ifcad.info/user/read_adresse.php',{
          params: {
            id: '1'
          },
        }).subscribe(
        (res) => {
          resolve((<AdresseModel []> res.records.map(adresse_item => new AdresseModel(adresse_item.designation,adresse_item.description,adresse_item.precision_lieu,adresse_item.pointB,adresse_item.pointA,new Pointdinteret(adresse_item.Point_interet.designation,adresse_item.Point_interet.description,adresse_item.Point_interet.id_lieu_parent,adresse_item.Point_interet.longitude,adresse_item.Point_interet.latitude,adresse_item.Point_interet.cote,adresse_item.Point_interet.type,adresse_item.Point_interet.id),adresse_item.Point_interet,adresse_item.Point_interet,adresse_item.Point_interet,adresse_item.Point_interet,adresse_item.Point_interet,false))))
        },
      (error) => {
        reject(error)
      }
      );
    });
  }

  getFavorisOfUser(){
    return new Promise((resolve, reject) => {
      this.httpclient.get<any>('http://somewhere.ifcad.info/favoris/readFavorisOfUser.php',{
          params: {
            user: '1'
          },
        }).subscribe(
        (res) => {
          resolve((<FavorieModel []> res.records.map(adresse_item => new FavorieModel(adresse_item.designation,adresse_item.description,adresse_item.precision_lieu,adresse_item.pointB,adresse_item.pointA,new Pointdinteret(adresse_item.Point_interet.designation,adresse_item.Point_interet.description,adresse_item.Point_interet.id_lieu_parent,adresse_item.Point_interet.longitude,adresse_item.Point_interet.latitude,adresse_item.Point_interet.cote,adresse_item.Point_interet.type,adresse_item.Point_interet.id),adresse_item.user,adresse_item.id,adresse_item.Chemin,adresse_item.descriptionScore,adresse_item.descriptionId,adresse_item.NomFavoris,adresse_item.IdFavoris))))
        },
      (error) => {
        reject(error)
      }
      );
    });
  }

  editFavoris(index:number,nomFavorie:string){
    this.mesFavoriesList[index].nomFavorie = nomFavorie;
    return new Promise((resolve, reject) => {
     this.mesFavoriesList[index].editFavorie().then(
       (response)=>{
        this.emitFavorites()
        resolve();
       },
       (error)=>{
        reject();
       }
     )
    });
  }
  removFavoris(favories:FavorieModel){
    for (let i = 0; i < this.mesFavoriesList.length; i++) {
      if(this.mesFavoriesList[i].idFavorie == favories.idFavorie){
        this.mesFavoriesList[i].delFavorie().then(
          ()=>{
              this.mesFavoriesList.splice(i,1);
              this.emitFavorites()
          },
          ()=>{

          }
        )
        
        break
      }
      
    }
  }

  ajouterFavoris(favorie:FavorieModel){
    favorie.addFavorie().then(
      ()=>{
        this.mesFavoriesList.push(favorie)
        this.emitFavorites()
      },
      ()=>{

      }
    )
  }




  
  editAdresse(adresse:AdresseModel){
    return new Promise((resolve, reject) => {
      for (let i = 0; i < this.mesAdressesList.length; i++) {
        if(this.mesAdressesList[i].adresseId == adresse.adresseId){
          this.mesAdressesList[i].editAdresse().then(
            ()=>{
                this.mesAdressesList[i] = adresse;
                this.emitAdresses()
            },
            ()=>{
  
            }
          )
          
          break
        }
        
      }
    });
  }
  removAdresse(adresse:AdresseModel){
    for (let i = 0; i < this.mesAdressesList.length; i++) {
      if(this.mesAdressesList[i].adresseId == adresse.adresseId){
        this.mesAdressesList[i].delAdresse().then(
          ()=>{
              this.mesAdressesList.splice(i,1);
              this.emitAdresses()
          },
          ()=>{

          }
        )
        
        break
      }
      
    }
  }

  ajouterAdresse(adresse:AdresseModel){
    adresse.addAdresse().then(
      ()=>{
        this.mesAdressesList.push(adresse)
        this.emitAdresses()
      },
      ()=>{

      }
    )
  }



}
