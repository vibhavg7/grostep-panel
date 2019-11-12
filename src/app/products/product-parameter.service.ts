import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class ProductParameterService implements OnDestroy {

  public showImage : boolean;     
  public filterBy : string;  
  constructor() { 
    console.log('product paramater service created');
  }

  ngOnDestroy() {
    console.log('product paramater service destroyed');
  }


}
