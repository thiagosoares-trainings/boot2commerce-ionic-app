import { CredenciasDto } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  creds: CredenciasDto = {
    email: "",
    senha: ""
  }

  constructor(public navCtrl: NavController, public memu: MenuController, public auth: AuthService) {
  }

  login() {
    this.auth.authenticate(this.creds).subscribe(resp => {
      this.auth.succesfulLogin(resp.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
     
    }, error => {
      this.auth.logout();
    });
  }

  signup() {
    this.navCtrl.push('SignupPage')
  }

  ionViewWillEnter() {
    this.memu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.memu.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.auth.refreshToken().subscribe(resp => {
      this.auth.succesfulLogin(resp.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    }, error => {
      this.auth.logout();
    });
  }

}
