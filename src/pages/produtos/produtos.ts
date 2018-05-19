import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(public produtoService: ProdutoService, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutosPage');

    let categoriaId = this.navParams.get("categoriaId");

    if(categoriaId) {
      
      this.produtoService.findByCategoria(categoriaId)
          .subscribe(response => {
            this.items = response['content'];
  
            this.items.forEach(item => {
              
              this.produtoService.getSmallImage(item.id)
                  .subscribe(img => {
                    item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
                  }, 
                  error => {
                  });

            });
          },
        error => {});

    } else {
      this.navCtrl.setRoot('CategoriasPage')
    }

  }

}
