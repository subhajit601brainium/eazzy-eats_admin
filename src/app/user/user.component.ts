import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../userservice/user.service';
import { MessageService } from '../userservice/message.services';
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { CONFIG } from "../../../config";
import { HighlightPipe } from '../highlight.pipe';


@Component({
    selector: 'user',
    styleUrls: ['./user.component.css'],
    templateUrl: './user.component.html',
})
// class Select
export class UserComponent implements OnInit {
    edit: boolean;
    data: any;
    admintoken: any;
    pagetitle: any;
    popupDiv: any;
    item: any = {};
    size: number;
    number: number;

    constructor(private http: Http,
        private _appservice: UserService,
        private _message: MessageService,
    ) { }

    ngOnInit(): void {
        this.data = '';
        this.size = 10;
        this.number = 0;
        var obj = {
            size: this.size,
            number: this.number
        }
        this.admintoken = localStorage.getItem('admintoken');
        this._appservice.getAllUser(obj).subscribe((Response) => {
            if (Response.STATUSCODE == 4002) {
                this._message.showError(Response.message);
                localStorage.clear();
                location.reload();
            } else {
                if (Response.success) {
                    var result = Response.response;
                    this.data = result;
                } else {
                    this._message.showWarning(Response.message);
                }
            }
        }, (Error) => {
        })

    }
    getDetails(str: any) {
        this.edit = true;
        this.popupDiv = true;
        this.pagetitle = 'View Details';
        var data={
            user_id:str._id
        }
        this._appservice.getUserDetails(data).subscribe((Response) => {
            if (Response.STATUSCODE == 4002) {
                this._message.showError(Response.message);
                localStorage.clear();
                location.reload();
            } else {
                if (Response.success) {
                    var result = Response.response;
                    this.item = result;
                } else {
                    this._message.showWarning(Response.message);
                }
            }
        }, (Error) => {
        })
        
    }

    loadmore() {
        this.number = this.number + 1
        this.admintoken = localStorage.getItem('admintoken');
        var obj = {
            size: this.size,
            number: this.number
        }
        this._appservice.getAllUser(obj).subscribe((Response) => {
            if (Response.STATUSCODE == 4002) {
                this._message.showError(Response.message);
                localStorage.clear();
                location.reload();
            } else {
                if (Response.success) {
                    var result = Response.response;
                    this.data = result;
                } else {
                    this._message.showWarning(Response.message);
                }
            }
        }, (Error) => {
        })
    }
    
    clear() {
        this.ngOnInit()
    }
}
