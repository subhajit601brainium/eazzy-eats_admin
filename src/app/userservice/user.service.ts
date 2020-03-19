import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { CONFIG } from '../../../config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
  constructor(private _http: Http, ) { }
  getToken() {
    console.log('token',localStorage.getItem('admintoken'));
    return localStorage.getItem('admintoken');
  }
  authHeader(headers: Headers) {
    headers.append('x-access-token', this.getToken());
    headers.append('Authorization', 'Bearer ' + this.getToken());
  }
  private _errorHandler(error: Response) {
    return Observable.throw(error.json() || "Server Error");
  }

  getCountries() {
    let headers = new Headers({ 'Accept': 'application/json' });
    this.authHeader(headers);
    return this._http.get(
      CONFIG.API_ENDPOINT + 'countries',
      { headers: headers }
    )
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  doLogin(loginData) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'customer/login';
    return this._http.post(URL, loginData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  updatePassword(updateData) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'customer/changepasswordAdmin';
    return this._http.post(URL, updateData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  forgotpassLinksend(forgotpassadmin) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'customer/forgotPasswordAdmin';
    return this._http.post(URL, forgotpassadmin, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  forgotPassword(forgotPasswordData) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'customer/resetPasswordAdmin';
    return this._http.post(URL, forgotPasswordData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

//Add Category
  addCategory(updateData) {
    let headers = new Headers();
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'admin/addCategory';
    return this._http.post(URL, updateData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  //Add Vendor
  addVendor(updateData) {
    let headers = new Headers();
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'admin/registerVendor';
    return this._http.post(URL, updateData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  //Add Vendor Items
  addVendorItems(updateData) {
    let headers = new Headers();
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'admin/addItem';
    return this._http.post(URL, updateData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  //All subscription type list
  getAllSubscriptionType() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'listSubscriptionType';
    return this._http.post(URL, '', options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  //Edit subscription type
  editSubscriptionType(updateData) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'editSubscriptionType';
    return this._http.post(URL, updateData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  //Content list
  getAllContent(data: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'listContent';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  //Content Details
  getDetailsContent(data: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'detailsContent';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  //Edit content
  editContent(data: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'editContent';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  //All Masjid list
  getAllMasjid(data: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'listMasjid';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  //Masjid Details
  getMasjidDetails(data: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'detailsMasjid';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  //All User list
  getAllUser(data: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'listUser';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  //User Details
  getUserDetails(data: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'detailsUser';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  //All Print card apply list
  getAllPrintCardApply() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'listPrintCardApply';
    return this._http.post(URL, '', options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  //Delete Print Card Apply
  deletePrintCardApply(updateData) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'printcardapplydelete';
    return this._http.post(URL, updateData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  //All Pharmacy list
  getAllPramacy(data: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'pharmacylist';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  //Add Pharmacy
  addPharmacy(updateData) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'pharmacyadd';
    return this._http.post(URL, updateData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  //Edit Pharmacy
  editPharmacy(updateData) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'pharmacyedit';
    return this._http.post(URL, updateData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  //Delete Pharmacy
  deletePharmacy(updateData) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'pharmacydelete';
    return this._http.post(URL, updateData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  //Setting list
  getAllSetting() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'settinglist';
    return this._http.post(URL, '', options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  //Setting Details
  getDetailsSetting(data: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'settingdetails';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  //Edit setting
  editSetting(updateData, updateFile) {
    let formData: FormData = new FormData();
    for (var key in updateData) {
      formData.append(key, updateData[key]);
    }
    formData.append('image', updateFile);
    let headers = new Headers({ 'Accept': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'editsetting';
    return this._http.post(URL, formData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  //Column list
  getAllColumn() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'listcolumn';
    return this._http.post(URL, '', options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
  //Column Details
  getDetailsColumn(data: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'detailscolumn';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  //Edit Column
  editColumn(updateData, updateFile) {
    let formData: FormData = new FormData();
    for (var key in updateData) {
      formData.append(key, updateData[key]);
    }
    formData.append('image', updateFile);
    let headers = new Headers({ 'Accept': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'editcolumn';
    return this._http.post(URL, formData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  addImageInGallery(updateData,updateFile){
    let formData: FormData = new FormData();
    for (var key in updateData) {
      formData.append(key, updateData[key]);
    }
    formData.append('image', updateFile);
    let headers = new Headers({ 'Accept': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'addimageingallery';
    return this._http.post(URL, formData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  removeImageInGallery(data: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'removeimageingallery';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  addImage(updateFile){
    let formData: FormData = new FormData();    
    formData.append('image', updateFile);
    let headers = new Headers({ 'Accept': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'addimage';
    return this._http.post(URL, formData, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  //Image list
  getAllImage() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'listimage';
    console.log('URL',URL);
    return this._http.post(URL, '', options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }

  deleteImage(data: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.authHeader(headers);
    let options = new RequestOptions({ headers: headers });
    let URL = CONFIG.API_ENDPOINT + 'removeimage';
    return this._http.post(URL, data, options)
      .map((response: Response) => response.json())
      .catch(this._errorHandler);
  }
}

