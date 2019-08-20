import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SwAdresseModel } from '../swAdresse.model';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Reference } from '../reference.model';
import { AddreferencePage } from '../addreference/addreference.page';

@Component({
  selector: 'app-addadresse',
  templateUrl: './addadresse.page.html',
  styleUrls: ['./addadresse.page.scss'],
})
export class AddadressePage implements OnInit {
  public adresse = new SwAdresseModel('','','','','','','','','','',[]);
  public osm: any;
  public ref: Reference[];
  public isLoading = false;
  constructor(public modalController: ModalController,public loadingController: LoadingController, private geolocation: Geolocation,public httpclient:HttpClient,public alertController: AlertController) {
    
   }

  ngOnInit() {
  }
  teste(tt){
    console.log(tt)
  }

  async presentLoadingWithOptions() {
    this.isLoading = true;
    return await this.loadingController.create({
      duration: 5000,
      message: 'Please wait...',
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  async addref() {
    const modal = await this.modalController.create({
      component: AddreferencePage,
      componentProps: { lat: this.adresse.lat , lng: this.adresse.lng },
    });

    modal.onDidDismiss()
      .then((data) => {
        this.ref.push(new Reference(data['descrition'],'1',data['lat'],data['lng'],'5')); // Here's your selected user!
    });

    return await modal.present();
  }

  ionViewDidEnter() { 
    this.presentLoadingWithOptions()
    this.geolocation.getCurrentPosition().then((resp) => {
        this.adresse.lat =  resp.coords.latitude+"";
        this.adresse.lng = resp.coords.longitude+"";
        this.dismiss();
        this.presentAlertMultipleButtons()
    }).catch((error) => {
      console.log('Error getting location', error);
    });
   }

   async presentAlertMultipleButtons() {
      const alert = await this.alertController.create({
        header: 'Position!',
        message: 'Utiliser cette position ?',
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Accepter',
            handler: () => {
              this.getOsmadresse(this.adresse.lat,this.adresse.lng)
            }
          }
        ]
      });
  
      await alert.present();
    }



  async getSwWay(osm_id,osm_state){
    await this.httpclient.get<any>('https://www.somewhereapp.fr/API/ways/check.php',{
            params: {
              osm_id: osm_id,
              state: osm_state
            },
          }).subscribe(
          (res) => {
            this.osm['sw_way'] = res;
          },
        (error) => {
          
        }
        );
    }

  async getOsmadresse(lat,lng){
    // await this.httpclient.get<any>('https://nominatim.openstreetmap.org/reverse',{
    //         params: {
    //           format: 'json',
    //           addressdetails: '1',
    //           zoom:'18',
    //           lat:lat,
    //           lon:lng
    //         },
    //       }).subscribe(
    //       (res) => {
    //         this.osm = res;
    //         console.log(res)
    //       },
    //     (error) => {
          
    //     }
    //     );
    }



}
