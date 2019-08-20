import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AdresseService } from './adresse.service';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AddrefPage } from './addref/addref.page';
import { AddreferencePage } from './addreference/addreference.page';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent,AddrefPage,AddreferencePage],
  entryComponents: [AddrefPage,AddreferencePage],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AdresseService,
    Geolocation,
    LaunchNavigator,
    SocialSharing ,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
