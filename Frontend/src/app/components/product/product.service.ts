import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from './product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products";

  constructor(
    private snackBar:MatSnackBar,
    private http:HttpClient
  ) { }

  showMessage(msg: string): void{
    this.snackBar.open(msg, "X",{
      duration:3000,
      horizontalPosition:'right',
      verticalPosition:'top'
    });
  }

  createProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl,product);
  }

  getProduct(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProductById(id: string): Observable<Product>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  editProduct(product: Product): Observable<Product>{
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url,product);
  }

  deleteProduct(id: number): Observable<Product>{
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url);
  }
}
