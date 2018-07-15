import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';

// since this is a lazy loaded module, and we need product module exposure
// to the entire state tree, extend the app root state interface to include the
// products slice of state. now we have a single state interface that represents
// our entire state tree...
export interface State extends fromRoot.State {
    products: ProductState;
}

export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
};


// ngrx selectors
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
);

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => {
        if (currentProductId === 0) {
            return {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            };
        } else {
            return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
        }
    }
);


export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
);

export const getError = createSelector(
    getProductFeatureState,
    state => state.error
);


export function reducer(state: ProductState = initialState, action: ProductActions): ProductState {
    switch (action.type) {
        case ProductActionTypes.ToggleProductCode:
            return {
                ...state,
                showProductCode: action.payload
            };
        case ProductActionTypes.SetCurrentProduct:
            return {
                ...state,
                currentProductId: action.payload.id
            };
        case ProductActionTypes.ClearCurrentProduct:
            return {
                ...state,
                currentProductId: null
            };
        case ProductActionTypes.InitializeCurrentProduct:
            return {
                ...state,
                currentProductId: 0
            };
        case ProductActionTypes.LoadSuccess:
        return {
            ...state,
            products: action.payload,
            error: ''
        };
        case ProductActionTypes.LoadFail:
        return {
            ...state,
            products: [],
            error: action.payload // payload has error string
        };
        case ProductActionTypes.UpdateProductSuccess:
            const updatedProducts = state.products.map(
                item => action.payload.id === item.id ? action.payload : item);
                return {
                    ...state,
                    products: updatedProducts,
                    currentProductId: action.payload.id,
                    error: ''
                };
        default:
            return state;
    }
}
