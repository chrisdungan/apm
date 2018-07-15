import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Product } from '../product';
import { ProductService } from '../product.service';

import * as productActions from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Action } from '../../../../node_modules/rxjs/internal/scheduler/Action';



@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions, private productService: ProductService) {}

    @Effect()
    public loadProducts$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.Load),
        mergeMap((action: productActions.Load) => this.productService.getProducts().pipe(
            map((products: Product[]) => (new productActions.LoadSuccess(products))),
            catchError(err => of(new productActions.LoadFail(err)))
        ))
    );

    @Effect()
    public updateProduct$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.UpdateProduct),
        map((action: productActions.UpdateProduct) => action.payload),
            mergeMap((product: Product) =>
            this.productService.updateProduct(product).pipe(
                map(updatedProduct => (new productActions.UpdateProductSuccess(updatedProduct))),
                catchError(err => of(new productActions.UpdateProductFail(err)))
            )
        )
    );
}
