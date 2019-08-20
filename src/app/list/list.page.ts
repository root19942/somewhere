import { Component, OnInit } from '@angular/core';
import { AdresseModel } from '../adresse.model';
import { Subscription } from 'rxjs';
import { AdresseService } from '../adresse.service';
import { FavorieModel } from '../favorie.model';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  public typeAdresses:string = "mesAdresses";

  private adresses: AdresseModel[];
  private favories: AdresseModel[];
  private adresseSubscription: Subscription;
  private favoriesSubscription: Subscription;
  //public adresses: Array<{ title: string; note: string; icon: string }> = [];

  constructor(private adresseService: AdresseService) {

  }
  segmentChanged(ev: any) {
    this.typeAdresses = ev.detail.value+""
    this.recupereFavories();
    this.recupereAdresses();
  }

  ngOnInit() {
    this.recupereFavories();
    this.recupereAdresses();

  }

  ngOnDestroy(): void {
    this.adresseSubscription.unsubscribe();
    this.favoriesSubscription.unsubscribe();
  }

  recupereAdresses() {
    this.adresseSubscription = this.adresseService.adresseSubject.subscribe((adresses: AdresseModel[]) => {
      this.adresses = adresses;
    });
    this.adresseService.emitAdresses();
  }

  recupereFavories() {
    this.favoriesSubscription = this.adresseService.favoriesSubject.subscribe((favories: FavorieModel[]) => {
      this.favories = favories;
    });
    this.adresseService.emitFavorites();
  }

  truncate(value: string): string {
    let result = value || '';
    let trail: String = ' …';
    let limit: number = 8
    if (value) {
      const words = value.split(/\s+/);
      if (words.length > Math.abs(limit)) {
        if (limit < 0) {
          limit *= -1;
          result = trail + words.slice(words.length - limit, words.length).join(' ');
        } else {
          result = words.slice(0, limit).join(' ') + trail;
        }
      }
    }
  
    return result;
  }

}
