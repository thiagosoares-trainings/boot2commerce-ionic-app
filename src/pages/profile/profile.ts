import { API_CONFIG } from './../../config/api.config';
import { ClienteService } from './../../services/cliente.service';
import { ClienteDto } from './../../models/cliente.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDto;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage: StorageService,
              public clienteService: ClienteService
            ) {
  }

  ionViewDidLoad() {
    
    let user = this.storage.getLocaUser();

    if(user && user.email) {
      this.clienteService.findByEmail(user.email).subscribe(response => {
        this.cliente = response;
        //GET Imagen into Bucket
        this.getImageIfExist();
      }, 
    error => {});
    }

  }

  getImageIfExist() {
    this.clienteService.getImageFromBucket(this.cliente.id).subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    }, error => {});
  }

}
