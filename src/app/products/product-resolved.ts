import { IProduct } from './product';

// export class Prod

export class ProductResolved
{
    products: IProduct;
    productCount : any;
    error?: any
    constructor() {
        this.products = new IProduct();
    }
}