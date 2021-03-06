import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../userservice/user.service';
import { MessageService } from '../userservice/message.services';
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { CONFIG } from "../../../config";
import { HighlightPipe } from '../highlight.pipe';

@Component({
    selector: 'subscription',
    styleUrls: ['./subscription.component.css'],
    templateUrl: './subscription.component.html',
})
// class Select
export class SubscriptionComponent implements OnInit {
    edit: boolean;
    data: any;
    admintoken: any;
    pagetitle: any;
    popupDiv: any;
    item: any = {};
    constructor(private http: Http,
        private _appservice: UserService,
        private _message: MessageService,
        public router: Router
    ) { }

    ngOnInit(): void {
        this.admintoken = localStorage.getItem('admintoken');
        this._appservice.getAllSubscriptionType().subscribe((Response) => {
            if (Response.STATUSCODE == 4002) {
                this._message.showError(Response.message);
                localStorage.clear();
                location.reload();
            } else {
                if (Response.success) {
                    var result = Response.response;
                    this.data = result;
                }else{
                    this._message.showWarning(Response.message);
                }                
            }
        }, (Error) => {
        })

    }
    getDetails(str: any) {
        this.edit = true;
        this.popupDiv = true;
        this.pagetitle = 'Edit Subscription type';
        this.item = str;
    }
    saveData() {
        var flag = 0, errorMessage;
        if (this.edit == true && flag == 0) {
            if (this.item.amount == '' || this.item.amount == undefined) {
                errorMessage = 'Please enter amount';
                flag = 1;
                this._message.showError(errorMessage)
                return false;
            }  else {
                this._appservice.editSubscriptionType(this.item)
                    .subscribe((Response) => {
                        if (Response.STATUSCODE == 4002) {
                            this._message.showError(Response.message);
                            localStorage.clear();
                            location.reload();
                        } else {
                            if (Response.success) {
                                this._message.showSuccess(Response.message);
                                this.popupDiv = false;
                            } else {
                                this._message.showWarning(Response.message);
                            }
                        }
                        
                    }, (Error) => {
                        this._message.showError(Error.message)
                    })
            }

        }
    }
    clear() {
        this.ngOnInit()
    }
}
