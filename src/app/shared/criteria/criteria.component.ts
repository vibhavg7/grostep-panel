import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {

  storeId: any;
  constructor(private _router: Router,private _activatedRoute:ActivatedRoute) { }
  private _listFilter: string;
  @Input() displayDetails: boolean;
  @Input() hitCount: number;
  @Output() filterElementValue : EventEmitter<string> = new EventEmitter<string>();
  @Input() type : any;
  hitMessage: string;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('filterElement', { static: false }) filterElementRef: ElementRef;

  ngOnInit() {
    // console.log(this.type);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes['hitCount']);
    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No Hit Count found';
    }
    else {
      this.hitMessage = 'Hit Count' + changes['hitCount'].currentValue
    }
  }

  ngAfterViewInit() {
    if (this.filterElementRef.nativeElement) {
      this.filterElementRef.nativeElement.focus();
    }
  }

  get listFilter(): string {
    if(this._listFilter != undefined) this.filterElementValue.emit(this._listFilter);
    return this._listFilter;
  }

  set listFilter(value) {
    this._listFilter = value;
    this.valueChange.emit(value);
  }

  addProduct()
  {
    
  }

  addStoreProduct()
  {    
    this.storeId = this._activatedRoute.parent.params['_value']['storeId'];
    console.log(['merchant/',this.storeId,'/merchantproducts/0/edit'])
    // this._router.navigate(['merchant/','0/merchantproducts/edit']);
    this._router.navigate([`merchant/${this.storeId}/merchantproducts/0/edit`]);
  }
}
