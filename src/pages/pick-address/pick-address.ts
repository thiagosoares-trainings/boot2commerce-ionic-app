import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from './../../services/storage.service';
import { EnderecoDto } from '../../models/endereco.dto';
import { ClienteService } from '../../services/cliente.service';


@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDto[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    
    let user = this.storage.getLocaUser();

    if(user && user.email) {
      this.clienteService.findByEmail(user.email).subscribe(response => {
        this.items = response['enderecos'];
      }, 
      error => {
        if(error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

}
