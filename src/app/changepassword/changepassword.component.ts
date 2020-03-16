
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../userservice/user.service';
import { MessageService } from '../userservice/message.services';
import { Http } from "@angular/http";

export class UpdatePasswordData {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
    customerId: string;
}

@Component({
    selector: 'changepassword',
    styleUrls: ['./changepassword.component.css'],
    templateUrl: './changepassword.component.html'
})
export class ChangepasswordComponent implements OnInit {

    admintoken: any;

    updatePasswordData: UpdatePasswordData;

    constructor(private http: Http,
        private _appservice: UserService,
        private _message: MessageService,
        private _router: Router,
    ) {
    }
    ngOnInit(): void {

        this.admintoken = localStorage.getItem('admintoken');

        this.updatePasswordData = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            customerId: ''
        };
    }

    updatePassword() {
        // console.log(this.updatePasswordData);
        //  return;
        var passwordVaild = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#!%-*_~^.$@])(?=.{6,})/;
        if (this.updatePasswordData.oldPassword == '') {
            var errorMessage = 'Please enter a old password';
            this._message.showError(errorMessage);
        }
        else if (this.updatePasswordData.newPassword == '') {
            var errorMessage = 'Please enter a password';
            this._message.showError(errorMessage);
        }
        else if (this.updatePasswordData.newPassword.length < 6) {
            var errorMessage = 'Password must be minimum 6 characters';
            this._message.showError(errorMessage);
        } 
        else if (this.updatePasswordData.newPassword != this.updatePasswordData.confirmPassword) {
            var errorMessage = 'Both password must match';
            this._message.showError(errorMessage);
        }
        else {
            // this.updatePasswordData.customerId = ;
            var updatePasswordData = this.updatePasswordData;
            updatePasswordData['userType'] = 'admin';
            updatePasswordData['customerId'] = localStorage.getItem('adminId');
            // console.log(localStorage.getItem('adminid'));
            this._appservice.updatePassword(this.updatePasswordData)
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
