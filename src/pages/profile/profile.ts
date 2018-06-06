import { Camera, CameraOptions } from '@ionic-native/camera';
import { API_CONFIG } from './../../config/api.config';
import { ClienteService } from './../../services/cliente.service';
import { ClienteDto } from './../../models/cliente.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDto;
  picture: string;
  cameraOn: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage: StorageService,
              public clienteService: ClienteService,
              private camera: Camera
            ) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() { 
    let user = this.storage.getLocalUser();

    if(user && user.email) {
      this.clienteService.findByEmail(user.email).subscribe(response => {
        this.cliente = response as ClienteDto;
        //GET Imagen into Bucket
        this.getImageIfExist();
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

  getImageIfExist() {
    this.clienteService.getImageFromBucket(this.cliente.id).subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    }, error => {});
  }

  getCameraPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;

    }, (err) => {
     // Handle error
    });

  }

  sendPicture() {
    this.clienteService.uploadPicture(this.picture)
        .subscribe(response => {
          this.picture = null;
          this.loadData();
        }, error => {

        });
  }

  cancel() {
    this.picture = null;
  }
}
