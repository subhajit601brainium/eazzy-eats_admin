import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../userservice/user.service';
import { MessageService } from '../userservice/message.services';
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers, Response, HttpModule } from '@angular/http';
import { CONFIG } from "../../../config";
import { HighlightPipe } from '../highlight.pipe';

export class AddCategoryData {
    categoryName: string;
    categoryImage: string;
    customerId: string;
}

@Component({
    selector: 'category',
    styleUrls: ['./category.component.css'],
    templateUrl: './category.component.html',
})
// class Select
export class CategoryComponent implements OnInit {

    admintoken: any;
    fileToUpload: File = null;

    addCategoryData: AddCategoryData;

    constructor(
        private http: Http,
        private httpClient: HttpModule,
        private _appservice: UserService,
        private _message: MessageService,
        private _router: Router,
    ) { }

    ngOnInit(): void {

        this.admintoken = localStorage.getItem('admintoken');

        this.addCategoryData = {
            categoryName: '',
            categoryImage: '',
            customerId: '',
        };


    }

    handleFileInput(event) {
        console.log(event);
        this.fileToUpload = <File>event.target.files[0];

        // console.log(this.fileToUpload);
    }

    addCategory() {
        // console.log(this.addCategoryData);

        if (this.addCategoryData.categoryName == '') {
            var errorMessage = 'Please enter category name.';
            this._message.showError(errorMessage);
        }
        else if (this.addCategoryData.categoryImage == '') {
            var errorMessage = 'Please select category image.';
            this._message.showError(errorMessage);
        } else {

            var addCategoryData = this.addCategoryData;
            console.log(this.fileToUpload);
            const fm = new FormData();
            fm.append('categoryName', addCategoryData.categoryName);
            fm.append('image', this.fileToUpload, this.fileToUpload.name);
            fm.append('customerId', localStorage.getItem('adminId'));

            this._appservice.addCategory(fm)
                .subscribe((Response) => {
                    if (Response.success) {
                        this._message.showSuccess(Response.message);
                        this._router.navigate(['/dashboard']);
                    } else {
                        this._message.showWarning(Response.message)
                    }
                }, (Error) => {
                    this._message.showError(Error.message)
                })

        }


    }


    // loadmore() {
    //     this.number = this.number + 1
    //     this.admintoken = localStorage.getItem('admintoken');
    //     var obj = {
    //         size: this.size,
    //         number: this.number
    //     }
    //     this._appservice.getAllMasjid(obj).subscribe((Response) => {
    //         if (Response.STATUSCODE == 4002) {
    //             this._message.showError(Response.message);
    //             localStorage.clear();
    //             location.reload();
    //         } else {
    //             if (Response.success) {
    //                 var result = Response.response;
    //                 this.data = result;
    //             } else {
    //                 this._message.showWarning(Response.message);
    //             }
    //         }
    //     }, (Error) => {
    //     })
    // }

    // clear() {
    //     this.ngOnInit()
    // }
}
