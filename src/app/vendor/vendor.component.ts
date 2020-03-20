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
    vendorLatitude: string;
    vendorLongitude: string;
    vendorStatus: string;
    vendorDescription: string;
    vendorOfferBanner: string;
    vendorLicense: string;
    //Vendor Owner Information Add
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
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
    restaurantLicense: File = null;
    restaurantOfferBanner: File = null;
    restaurantVal: String = 'NON VEG';
    restaurantStatus: String = 'ACTIVE';

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
            vendorLatitude: '',
            vendorLongitude: '',
            vendorStatus: '',
            vendorDescription: '',
            vendorOfferBanner: '',
            vendorLicense: '',
            customerId: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            location: ''
        };


    }

    restaurantBannerInput(event) {
        console.log(event);
        this.restaurantBanner = <File>event.target.files[0];

    }

    restaurantLicenseInput(event) {
        console.log(event);
        this.restaurantLicense = <File>event.target.files[0];

    }

    restaurantOfferBannerInput(event) {
        this.restaurantOfferBanner = <File>event.target.files[0];

        console.log(this.restaurantOfferBanner);

    }

    restaurantLogoInput(event) {
        console.log(event);
        this.restaurantLogo = <File>event.target.files[0];
        
    }

    restaurantTypeVal(event) {
        this.restaurantVal = event.target.value;
    }

    restaurantStatusVal(event) {
        this.restaurantStatus = event.target.value;
        console.log(this.restaurantStatus);
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
            var errorMessage = 'Please enter valid restaurant email.';
            this._message.showError(errorMessage);
        } else if (this.addVendor.vendorPhone.trim() == '') {
            var errorMessage = 'Please enter restaurant phone no.';
            this._message.showError(errorMessage);
        } else if (this.addVendor.vendorBanner.trim() == '') {
            var errorMessage = 'Please select restaurant banner.';
            this._message.showError(errorMessage);
        } else if (this.addVendor.vendorOfferBanner.trim() == '') {
            var errorMessage = 'Please select restaurant offer banner.';
            this._message.showError(errorMessage);
        } else if (this.addVendor.vendorLicense.trim() == '') {
            var errorMessage = 'Please select restaurant license.';
            this._message.showError(errorMessage);
        } else if (this.addVendor.vendorLatitude.trim() == '') {
            var errorMessage = 'Please select restaurant latitude.';
            this._message.showError(errorMessage);
        } else if (this.addVendor.vendorLongitude.trim() == '') {
            var errorMessage = 'Please select restaurant longitude.';
            this._message.showError(errorMessage);
        }else if (Number(this.addVendor.vendorLatitude.trim()) < -90 || Number(this.addVendor.vendorLatitude.trim()) > 90) {
            var errorMessage = 'Latitude must be between -90 and 90 degrees inclusive.';
            this._message.showError(errorMessage);
        }else if (Number(this.addVendor.vendorLongitude.trim()) < -180 || Number(this.addVendor.vendorLongitude.trim()) > 180) {
            var errorMessage = 'Longitude must be between -180 and 180 degrees inclusive.';
            this._message.showError(errorMessage);
        } else if (this.addVendor.firstName.trim() == '') {
            var errorMessage = 'Please enter restaurant owner first name.';
            this._message.showError(errorMessage);
        } else if (this.addVendor.lastName.trim() == '') {
            var errorMessage = 'Please enter restaurant owner last name.';
            this._message.showError(errorMessage);
        } else if (this.addVendor.email.trim() == '' || !this.valiemail.test(this.addVendor.email)) {
            var errorMessage = 'Please enter valid restaurant owner email.';
            this._message.showError(errorMessage);
        } else if (this.addVendor.phone.trim() == '') {
            var errorMessage = 'Please enter restaurant owner phone no.';
            this._message.showError(errorMessage);
        } else {

            var addVendorData = this.addVendor;

            const fm = new FormData();
            fm.append('restaurantName', addVendorData.vendorName);
            fm.append('managerName', addVendorData.managerName);
            fm.append('description', addVendorData.vendorDescription);

            fm.append('restaurantType', this.restaurantVal.toUpperCase());
            fm.append('isActive', this.restaurantStatus.toUpperCase());

            fm.append('restaurantEmail', addVendorData.vendorEmail);
            fm.append('restaurantPhone', addVendorData.vendorPhone);

            fm.append('logo', this.restaurantLogo, this.restaurantLogo.name);
            fm.append('banner', this.restaurantBanner, this.restaurantBanner.name);
            fm.append('offer_banner', this.restaurantOfferBanner, this.restaurantOfferBanner.name);
            fm.append('licenceImage', this.restaurantLicense, this.restaurantLicense.name);
            

            fm.append('latitude', addVendorData.vendorLatitude);
            fm.append('longitude', addVendorData.vendorLongitude);;

            fm.append('firstName', addVendorData.firstName);
            fm.append('lastName', addVendorData.lastName);
            fm.append('email', addVendorData.email);
            fm.append('phone', addVendorData.phone);
            fm.append('location', addVendorData.location);

            fm.append('customerId', localStorage.getItem('adminId'));

            this._appservice.addVendor(fm)
                .subscribe((Response) => {
                    if (Response.success) {
                        this._message.showSuccess(Response.message);
                        this._router.navigate(['/itemAdd']);
                    } else {
                        this._message.showWarning(Response.message)
                    }
                }, (Error) => {
                    this._message.showError(Error.message)
                })

        }


    }
}
