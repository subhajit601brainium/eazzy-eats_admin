import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../userservice/user.service';
import { MessageService } from '../userservice/message.services';
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers, Response, HttpModule } from '@angular/http';
import { CONFIG } from "../../../config";
import { HighlightPipe } from '../highlight.pipe';

export class AddVendorData {
    vendorName: string;
    managerName: string;
    vendorLogo: string;
    vendorType: string;
    vendorEmail: string;
    vendorPhone: string;
    vendorBanner: string;
    customerId: string;
}

@Component({
    selector: 'vendor',
    styleUrls: ['./vendor.component.css'],
    templateUrl: './vendor.component.html',
})
// class Select
export class VendorComponent implements OnInit {

    admintoken: any;
    restaurantLogo: File = null;
    restaurantBanner: File = null;
    restaurantVal: String

    addVendor: AddVendorData;

    constructor(
        private http: Http,
        private httpClient: HttpModule,
        private _appservice: UserService,
        private _message: MessageService,
        private _router: Router,
    ) { }

    ngOnInit(): void {

        this.admintoken = localStorage.getItem('admintoken');

        this.addVendor = {
            vendorName: '',
            managerName: '',
            vendorLogo: '',
            vendorType: '',
            vendorEmail: '',
            vendorPhone: '',
            vendorBanner: '',
            customerId: '',
        };


    }

    restaurantBannerInput(event) {
        console.log(event);
        this.restaurantLogo = <File>event.target.files[0];

    }

    restaurantLogoInput(event) {
        console.log(event);
        this.restaurantBanner = <File>event.target.files[0];

    }

    restaurantTypeVal(event) {
        this.restaurantVal = event.target.value;
    }

    valiemail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    addVendorData() {
        console.log(this.addVendor);


        if (this.addVendor.vendorName.trim() == '') {
            var errorMessage = 'Please enter restaurant name.';
            this._message.showError(errorMessage);
        }
        else if (this.addVendor.managerName.trim() == '') {
            var errorMessage = 'Please enter manager name.';
            this._message.showError(errorMessage);
        } else if (this.addVendor.vendorLogo.trim() == '') {
            var errorMessage = 'Please select restaurant logo.';
            this._message.showError(errorMessage);
        } else if (this.addVendor.vendorEmail.trim() == '' || !this.valiemail.test(this.addVendor.vendorEmail)) {
            var errorMessage = 'Invalid email';
            this._message.showError(errorMessage);
        } else if (this.addVendor.vendorPhone.trim() == '') {
            var errorMessage = 'Please enter restaurant phone no.';
            this._message.showError(errorMessage);
        } else if (this.addVendor.vendorBanner.trim() == '') {
            var errorMessage = 'Please select restaurant banner.';
            this._message.showError(errorMessage);
        } else {

            var addVendorData = this.addVendor;

            const fm = new FormData();
            fm.append('restaurantName', addVendorData.vendorName);
            fm.append('managerName', addVendorData.managerName);
            fm.append('restaurantType', this.restaurantVal.toUpperCase());
            fm.append('restaurantEmail', addVendorData.vendorEmail);
            fm.append('restaurantPhone', addVendorData.vendorPhone);
            fm.append('logo', this.restaurantLogo, this.restaurantLogo.name);
            fm.append('banner', this.restaurantBanner, this.restaurantBanner.name);
            fm.append('customerId', localStorage.getItem('adminId'));
            console.log(fm);
            this._appservice.addVendor(fm)
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
}
