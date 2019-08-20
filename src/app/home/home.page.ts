import { Component, ViewChild } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, icon, locate, popup } from 'leaflet';
import { ToastController, IonSearchbar, Platform } from '@ionic/angular';
import { trigger, style, animate, transition, group, query, animateChild , state } from '@angular/animations';
import { AdresseService } from '../adresse.service';
import { AdresseModel } from '../adresse.model';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { AttributeMarker } from '@angular/core/src/render3';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [

    trigger('container', [
      transition(':enter', [
          style({opacity: '0'}),
          group([
            animate('900ms ease-out', style({opacity: '1'})),
          ])
          
      ]),
      transition(':leave', [
          group([
            animate('900ms ease-out', style({opacity: '0'})),

          ])
      ])
    ]),

    trigger('mystate_visuelle', [
      state('bas', style({
        bottom: '8%',
        opacity:1,
        width: '79%',
        marginLeft:'13%',
        fontSize: '3.7vw',
      })),
      state('haut', style({
        top: '56%',
        opacity:1,
        width: '90%',
        marginLeft:'5%',
        fontSize: '4vw',
      })),
      transition('* => *', animate('.7s ease-in-out'))
    ]),

    trigger('exposeicon', [
      state('haut', style({
        transform: "rotate(180deg)",
      })),
      state('bas', style({
        transform: "rotate(0deg)",
      })),
      transition('* => *', animate('1s'))
    ]),
    trigger('mystate_detail', [
      state('hidde', style({
        opacity:0,
        height:0,
        bottom:0,
        borderRadius:'0 0 0 0',
      })),
      state('block', style({
        opacity:1,
        height:'45%',
        borderRadius:'20px 20px 0 0',
      })),
      transition('* => *', animate('.6s ease-in-out'))
    ]),
    trigger('mystate_plan_loca', [
      state('hidde', style({
        opacity:0,
        height: 0
      })),
      state('block', style({
        opacity:1,
        height: 800
      })),
      transition('* => *', animate('.5s'))
    ])


  ]
})
export class HomePage {
  private map: Map;
  public planState = 'hidde';
  public schowdetails: boolean = false;
  public visueleState = 'bas';
  public detailState = 'hidde';
  public type:any;
  public query:string = "";
  public maposition: marker;
  public adressePosition: marker;
  private searchList: AdresseModel[];
  @ViewChild('search')  searchfiels: IonSearchbar;
  public displaySearchZone: boolean = false;
  public adresseEnCours : AdresseModel;
  public etoiles:string[]=["start"];
  public etoilePleine:number;
  public etoileMoitier:number;
  public etoileVide:number;
  public ecart:number;
  
  adresseMarker = icon({
    iconUrl: '../../assets/adressePosition.png',
    iconSize: [34, 50], 
    popupAnchor: [0, -20]
  });
  customMarkerIcon = icon({
    iconUrl: '../../assets/mapmarkermyposition.gif',
    iconSize: [34, 34], 
    popupAnchor: [0, -20]
  });
  

  constructor(private launchNavigator: LaunchNavigator,public platform:Platform,private storage: Storage, private toastCtrl: ToastController,private adresseService: AdresseService,private geolocation: Geolocation) {
    this.type = "map";
  }

  mona_search_off(){
    this.displaySearchZone = false;
  }

  mona_search_on(){

    this.toastCtrl.create({
      message: 'Rechercher une adresse !',
      duration: 2000
    }).then((toast) => {
      toast.present();
    });

    this.displaySearchZone = true;
    setTimeout(() => {
      this.searchfiels.setFocus();
    }, 500);
    

  }

  leafletMap() {
    // In setView add latLng and zoom
    this.map = new Map('mapId').setView([4.0035345903355655, 9.750589781654238], 12);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'www.ket-up.com',
      center: [4.0035345903355655, 9.750589781654238],
      zoom:2,
      zoomControl: false,
    }).addTo(this.map);



  }

  ionViewWillLeave() {
    this.map.remove();
  }

  ionViewDidEnter() { 
    this.leafletMap();

    this.maposition = marker([4.0035345903355655, 9.750589781654238], { icon: this.customMarkerIcon }).addTo(this.map);
  
    let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        this.maposition.setLatLng([data.coords.latitude, data.coords.longitude]);
      });
      
      this.storage.get('adresseEnCours').then(
        (res)=>{
          if(res){
            this.validerAdresse(<AdresseModel> res);
          }
          else{
            this.adressePosition = marker([4.0035345903355655, 9.750589781654238], { icon: this.adresseMarker }).addTo(this.map)
            .bindPopup("<p style='text-align: center;width:18vw;'><center><span style='line-height: 1.6;font-size:5vw;font-weight:800;'>Bienvenu </span><br><span style='font-size:4vw;line-height: 1.6;' >Sur</span><br><img src='../../assets/logo.png' style='height:60px;width:auto;'><br/><span style='font-size:3vw;color:red'>|</span><span style='font-size:3vw;color:black'>Mon</span><span style='font-size:3vw;font-weight: normal;'>@</span></center></p>")
            .openPopup(); 
          }
          
        }
      )

  
   }

  detailativ(){
    this.schowdetails = this.schowdetails==true?false:true;
    this.detailState = this.detailState=='hidde'?'block':'hidde';
    this.visueleState = this.visueleState=='bas'?'haut':'bas';
  }

  changetype(){
    this.type = (this.type=='map')?'plan':'map';
    this.planState = this.planState=='hidde'?'block':'hidde';
  }

  validerAdresse(adresse:AdresseModel){
    this.map.closePopup();
    this.storage.set('adresseEnCours', adresse);
    this.adresseEnCours = adresse;
    this.etablirNote();
    this.ifImThere();
    this.maposition = marker([4.0035345903355655, 9.750589781654238], { icon: this.customMarkerIcon }).addTo(this.map);
    if(this.adressePosition){
      this.map.removeLayer(this.adressePosition)
    }
    
    this.adressePosition = marker([adresse.latitude, adresse.longitude], { icon: this.adresseMarker }).addTo(this.map)
    .bindPopup('<p><h4>'+adresse.designation+'</h4><img src="https://picsum.photos/150" width="100%"></p>')
    .openPopup();
    
    this.displaySearchZone = false;
  }

  etablirNote(){
    this.etoiles = [];
    this.etoilePleine = Math.trunc(+this.adresseEnCours.adresseNote)
    this.etoileMoitier = +this.adresseEnCours.adresseNote-Math.trunc(+this.adresseEnCours.adresseNote) != 0 ? 1:0;
    this.etoileVide =  5-Math.trunc(+this.adresseEnCours.adresseNote)-1;

    for (let i = 0; i < this.etoilePleine ; i++) {
      this.etoiles.push("star")
    }
    if(this.etoileMoitier != 0){
      this.etoiles.push("star-half")
    }
    for (let i = 0; i < this.etoileVide; i++) {
      this.etoiles.push("star-outline")
    }
  }

  
  distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}

ifImThere(){
  this.ecart = this.distance(this.adresseEnCours.latitude,this.adresseEnCours.longitude,this.maposition.getLatLng().lat,this.maposition.getLatLng().lng,'K') 
  if(this.ecart < 0.8){
    this.ecart = 0;
  }
}

navigate(){
  this.platform.ready().then(()=>{
    this.launchNavigator.navigate(this.adresseEnCours.latitude+","+this.adresseEnCours.longitude).then();
  });
}

  searchAdresse(q){
    if(q.charAt(0) == '@'){
      q = q.substr(1);
      this.adresseService.searchadresse(q).then(
        (response)=>{
          this.searchList = <AdresseModel []>response;
        },
        (error)=>{
          console.log(error)
        }
      )      
    }

  }

}
