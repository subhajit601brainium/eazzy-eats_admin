import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../userservice/user.service';
import { MessageService } from '../userservice/message.services';
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers, Response, HttpModule } from '@angular/http';
import { CONFIG } from "../../../config";
import { HighlightPipe } from '../highlight.pipe';
import { e } from '@angular/core/src/render3';

export class AddVendorTimeData {
    customerId: string;
    vendorId: string;

    mondaySelected: boolean;
    mondayTimeStart: string;
    mondayTimeEnd: string;

    tuesdaySelected: boolean;
    tuesdayTimeStart: string;
    tuesdayTimeEnd: string;

    wednesdaySelected: boolean;
    wednesdayTimeStart: string;
    wednesdayTimeEnd: string;

    thursdaySelected: boolean;
    thursdayTimeStart: string;
    thursdayTimeEnd: string;

    fridaySelected: boolean;
    fridayTimeStart: string;
    fridayTimeEnd: string;

    saturdaySelected: boolean;
    saturdayTimeStart: string;
    saturdayTimeEnd: string;

    sundaySelected: boolean;
    sundayTimeStart: string;
    sundayTimeEnd: string;
}

@Component({
    selector: 'vendortimes',
    styleUrls: ['./vendortimes.component.css'],
    templateUrl: './vendortimes.component.html',
})
// class Select
export class VendortimesComponent implements OnInit {

    admintoken: any;
    restaurantLogo: File = null;


    addVendorTime: AddVendorTimeData;


    constructor(
        private http: Http,
        private httpClient: HttpModule,
        private _appservice: UserService,
        private _message: MessageService,
        private _router: Router,
        private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {

        this.admintoken = localStorage.getItem('admintoken');

        this.addVendorTime = {
            customerId: '',
            vendorId: '',
            mondaySelected: true,
            mondayTimeStart: '09:00',
            mondayTimeEnd: '22:00',

            tuesdaySelected: true,
            tuesdayTimeStart: '09:00',
            tuesdayTimeEnd: '22:00',

            wednesdaySelected: true,
            wednesdayTimeStart: '09:00',
            wednesdayTimeEnd: '22:00',

            thursdaySelected: true,
            thursdayTimeStart: '09:00',
            thursdayTimeEnd: '22:00',

            fridaySelected: true,
            fridayTimeStart: '09:00',
            fridayTimeEnd: '22:00',

            saturdaySelected: true,
            saturdayTimeStart: '09:00',
            saturdayTimeEnd: '22:00',

            sundaySelected: true,
            sundayTimeStart: '09:00',
            sundayTimeEnd: '22:00'

        };

        this.activatedRoute.params.subscribe((params: Params) => {
            this.addVendorTime.vendorId = params['vendorId'];
        });


    }

    getTimeFormat(format) {
        var splTime = format.split(":");
        var hrtimeStart = 0;
        var mintimeStart = 0;
        var amPm = '';
        var timeFormat = '';
        if (Number(splTime[0]) < 12) { //AM
            hrtimeStart = splTime[0];
            if (hrtimeStart == 0) {
                hrtimeStart = 12
            }
            mintimeStart = splTime[1];
            amPm = 'AM';
        } else {
            hrtimeStart = (Number(splTime[0]) - 12);
            if (hrtimeStart == 0) {
                hrtimeStart = 12
            }
            mintimeStart = splTime[1];
            amPm = 'PM';
        }
        timeFormat = hrtimeStart + ':' + mintimeStart + ' ' + amPm

        return timeFormat;
    }

    addVendorTimeData() {

        var sendData = {};
        var addVendrTm = this.addVendorTime;
        var restaurantTime = [];

        //MONDAY
        var mondayObj = {};
        mondayObj['day'] = 'Monday';
        mondayObj['startTime'] = '';
        mondayObj['endTime'] = '';

        if (addVendrTm.mondaySelected == true) {
            mondayObj['startTime'] = this.getTimeFormat(addVendrTm.mondayTimeStart);
            mondayObj['endTime'] = this.getTimeFormat(addVendrTm.mondayTimeEnd);
            restaurantTime.push(mondayObj);
        }
        

        //TUESDAY
        var tuesdayObj = {};
        tuesdayObj['day'] = 'Tuesday';
        tuesdayObj['startTime'] = '';
        tuesdayObj['endTime'] = '';

        if (addVendrTm.tuesdaySelected == true) {
            tuesdayObj['startTime'] = this.getTimeFormat(addVendrTm.tuesdayTimeStart);
            tuesdayObj['endTime'] = this.getTimeFormat(addVendrTm.tuesdayTimeEnd);
            restaurantTime.push(tuesdayObj);
        }
        

        //WEDNESDAY
        var wednesdayObj = {};
        wednesdayObj['day'] = 'Wednesday';
        wednesdayObj['startTime'] = '';
        wednesdayObj['endTime'] = '';

        if (addVendrTm.wednesdaySelected == true) {
            wednesdayObj['startTime'] = this.getTimeFormat(addVendrTm.wednesdayTimeStart);
            wednesdayObj['endTime'] = this.getTimeFormat(addVendrTm.wednesdayTimeEnd);
            restaurantTime.push(wednesdayObj);
        }
        

        //THURSDAY
        var thursdayObj = {};
        thursdayObj['day'] = 'Thursday';
        thursdayObj['startTime'] = '';
        thursdayObj['endTime'] = '';

        if (addVendrTm.thursdaySelected == true) {
            thursdayObj['startTime'] = this.getTimeFormat(addVendrTm.thursdayTimeStart);
            thursdayObj['endTime'] = this.getTimeFormat(addVendrTm.thursdayTimeEnd);
            restaurantTime.push(thursdayObj);
        }
        

        //FRIDAY
        var fridayObj = {};
        fridayObj['day'] = 'Friday';
        fridayObj['startTime'] = '';
        fridayObj['endTime'] = '';

        if (addVendrTm.fridaySelected == true) {
            fridayObj['startTime'] = this.getTimeFormat(addVendrTm.fridayTimeStart);
            fridayObj['endTime'] = this.getTimeFormat(addVendrTm.fridayTimeEnd);
            restaurantTime.push(fridayObj);
        }
        

        //SATURDAY
        var saturdayObj = {};
        saturdayObj['day'] = 'Saturday';
        saturdayObj['startTime'] = '';
        saturdayObj['endTime'] = '';

        if (addVendrTm.saturdaySelected == true) {
            saturdayObj['startTime'] = this.getTimeFormat(addVendrTm.saturdayTimeStart);
            saturdayObj['endTime'] = this.getTimeFormat(addVendrTm.saturdayTimeEnd);
            restaurantTime.push(saturdayObj);
        }
        

        //SUNDAY
        var sundayObj = {};
        sundayObj['day'] = 'Sunday';
        sundayObj['startTime'] = '';
        sundayObj['endTime'] = '';

        if (addVendrTm.sundaySelected == true) {
            sundayObj['startTime'] = this.getTimeFormat(addVendrTm.sundayTimeStart);
            sundayObj['endTime'] = this.getTimeFormat(addVendrTm.sundayTimeEnd);
            restaurantTime.push(sundayObj);
        }
        

        sendData['customerId'] = localStorage.getItem('adminId')
        sendData['vendorId'] = this.addVendorTime.vendorId
        sendData['restaurantTime'] = JSON.stringify(restaurantTime);

        console.log(sendData);

        this._appservice.addVendorTimes(sendData)
            .subscribe((Response) => {
                if (Response.success) {
                    this._message.showSuccess(Response.message);
                    this._router.navigate(['/itemAdd/'+this.addVendorTime.vendorId]);
                } else {
                    this._message.showWarning(Response.message)
                }
            }, (Error) => {
                this._message.showError(Error.message)
            })
    }
}
