import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public memu: MenuController) {

  }

  login() {
    //this.navCtrl.push('CategoriasPage');
    this.navCtrl.setRoot('CategoriasPage');
  }

  ionViewWillEnter() {
    this.memu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.memu.swipeEnable(true);
  }

}
