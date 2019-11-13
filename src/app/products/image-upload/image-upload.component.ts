import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private _http: HttpClient) { }
  title: any = "";
  image_type :any = "";
  id :any =""
  filesToUpload: Array<File> = [];
  @Output('productImage') productImage = new EventEmitter<any>();
  res1: any;
  ngOnInit() {
    
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    for (let i = 0; i < files.length; i++) {
      formData.append("uploadedImages[]", files[i], files[i]['name']);
    }
    this._http.post(`http://ec2-18-224-109-141.us-east-2.compute.amazonaws.com:3000/imageuploadapi/${this.image_type}/${this.id}`, formData).pipe(
      tap(data => {
      }),
      map((files:any) => {
        return files;
       })
    )
    .subscribe((data) => {
      console.log(data);
      this.productImage.emit(data['product']);
      this.activeModal.close('Close click');
      // this.uploaded.emit(data);
    })
  }
  

}
