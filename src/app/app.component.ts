import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Category, Product } from './model';

const GetAllCategoryWiseProducts = gql`
query {
  categories {
    id,
    name
  }
}`;

const GetAllProductsOfCategory = gql`
query($categoryId: ID!) {
  category(id: $categoryId) {
    id,
    name,
    products {
      id,
      name,
      description,
      price,
      quantity
    }
  }
}`;

const GetProductDetails = gql`
query($productId: ID!) {
  product(id: $productId) {
    id,
    name,
    description,
    quantity,
    onSale,
    price,
    reviews {
      id,
      date,
      title,
      comment,
      rating
    }
  }
}`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  categories!: Category[];
  products!: Product[];
  product!: Product;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.query({
      query: GetAllCategoryWiseProducts
    }).subscribe(({ data, loading }: { data: any, loading: any }) => {
      this.categories = data.categories;
      this.getCategoryWiseProducts(this.categories[0].id);
    })
  }

  getCategoryWiseProducts(categoryId: string) {
    this.apollo.query({
      query: GetAllProductsOfCategory,
      variables: {
        categoryId: categoryId,
      }
    }).subscribe(({ data, loading }: { data: any, loading: any }) => {
      const category = data.category;
      this.products = category.products;
      this.getProductDetails(this.products[0].id);
    })
  }

  getProductDetails(productId: string) {
    this.apollo.query({
      query: GetProductDetails,
      variables: {
        productId: productId,
      }
    }).subscribe(({ data, loading }: { data: any, loading: any }) => {
      this.product = data.product;
    })
  }

}
