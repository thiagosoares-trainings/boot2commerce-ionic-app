import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

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

  constructor(public produtoService: ProdutoService, 
              public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    
    this.loadData();

  }

  loadData() {
    console.log('ionViewDidLoad ProdutosPage');

    let categoriaId = this.navParams.get("categoriaId");

    if(categoriaId) {
      
      let loader = this.presentLoading();

      this.produtoService.findByCategoria(categoriaId)
          .subscribe(response => {
            this.items = response['content'];
            loader.dismiss();
            this.items.forEach(item => {
              
              this.produtoService.getSmallImage(item.id)
                  .subscribe(img => {
                    item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
                  }, 
                  error => {
                    item.imageUrl = null;
                  });

            });
          },
        error => {});

    } else {
      this.navCtrl.setRoot('CategoriasPage')
    }

  }


  showDetail(produtoId: string) {
    this.navCtrl.push('ProdutoDetailPage', {produtoId: produtoId});
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

}
