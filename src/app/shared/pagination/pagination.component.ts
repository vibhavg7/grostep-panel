import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PagerService } from 'src/app/products/product-shell/pager.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit,OnChanges {

  @Input('totalItemCount') totalItemCount : number;
  pager: any = {};
  pagedItems: any[];
  @Output('currentPage') currentPage = new EventEmitter<number>();
  constructor(private pagerService:PagerService) { }


  ngOnInit() {    
    // this.setPage(1);
  }

  ngOnChanges()
  {
    console.log('pagination');
    // this.setPage(1);
    this.pager = this.pagerService.getPager(this.totalItemCount, 1);
    // console.log(this.totalItemCount);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(this.totalItemCount, page);
    // console.log(this.pager);
     this.currentPage.emit(page);    
    // get current page of items
    // this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


}
