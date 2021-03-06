import { API_CONFIG } from './../../config/api.config';
import { CategoriDto } from './../../models/categoria.dto';
import { CategoriaService } from './../../services/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  items: CategoriDto[];
  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriasPage');
    this.categoriaService.findAll()
        .subscribe(response => { this.items = response; }, 
                      error => { } );
    
  }

  showProdutos(categoriaId: string) {
    this.navCtrl.push('ProdutosPage', {categoriaId: categoriaId});


  }

}
