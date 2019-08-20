import { Component, OnInit, Input } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker, icon, locate, popup } from 'leaflet';
import { NavParams, ModalController, IonInput } from '@ionic/angular';

@Component({
  selector: 'app-addref',
  templateUrl: './addref.page.html',
  styleUrls: ['./addref.page.scss'],
})
export class AddrefPage implements OnInit {
  private map: Map;
  // @Input() lat: string;
  // @Input() lng: string;
  public adressePosition: marker;
  name:string;
  adresseMarker = icon({
    iconUrl: '../../assets/adressePosition.png',
    iconSize: [40, 58], 
    popupAnchor: [0, -20]
  });

  constructor(public navParams: NavParams,public modalCtrl:ModalController) {
    
   }

  ngOnInit() {
  }
  ionViewDidEnter() { 
    this.leafletMap();
    this.adressePosition = marker([this.navParams.get('lat'), this.navParams.get('lng')], { icon: this.adresseMarker,draggable: true }).addTo(this.map);
    
  }
  ajouter_ref(refttt){
    console.log(refttt)
    // if(name_ref != ""){
    //   this.modalCtrl.dismiss({lat: this.adresseMarker.getLatLng().lat,lng: this.adresseMarker.getLatLng().lng,description:name_ref})
    // }
  }

  leafletMap() {
    this.map = new Map('mapId').setView([this.navParams.get('lat'), this.navParams.get('lng')], 18);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'www.ket-up.com',
      center: [this.navParams.get('lat'), this.navParams.get('lng')],
      zoom:18,
      zoomControl: false,
    }).addTo(this.map);
  }

}
