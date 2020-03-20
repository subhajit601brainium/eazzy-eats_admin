import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../userservice/user.service';
import { MessageService } from '../userservice/message.services';
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers, Response, HttpModule } from '@angular/http';
import { CONFIG } from "../../../config";
import { HighlightPipe } from '../highlight.pipe';

export class AddVendorItemsData {
  customerId: string;
  vendorId: string;
  categoryId: string;
  itemName: string;
  type: string;
  price: string;
  menuImage: string;
  waitingTime: string;
}

@Component({
  selector: 'app-vendoritems',
  templateUrl: './vendoritems.component.html',
  styleUrls: ['./vendoritems.component.css']
})
export class VendoritemsComponent implements OnInit {

  admintoken: any;
  menuImage: File = null;
  allCategoryies: any;
  menuCategory: String = '';

  addVendorItems: AddVendorItemsData;

  constructor(
    private http: Http,
    private httpClient: HttpModule,
    private _appservice: UserService,
    private _message: MessageService,
    private _router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    

    this.admintoken = localStorage.getItem('admintoken');

    this.addVendorItems = {
      customerId: '',
      vendorId: '',
      categoryId: '',
      itemName: '',
      type: '',
      price: '',
      menuImage: '',
      waitingTime: ''
    };

    this.activatedRoute.params.subscribe((params: Params) => {
      this.addVendorItems.vendorId = params['vendorId'];
    });

    this._appservice.getAllCategory({customerId: localStorage.getItem('adminId')})
      .subscribe((Response) => {
        if (Response.success) {
          this.allCategoryies = Response.response_data;
          console.log(this.allCategoryies);
        } else {
          this._message.showWarning(Response.message)
        }
      }, (Error) => {
        this._message.showError(Error.message)
      });

  }

  restaurantMenuImageInput(event) {
    console.log(event);
    this.menuImage = <File>event.target.files[0];
  }

  menuCategoryVal(event) {

    this.menuCategory = event.target.value;
    console.log(this.menuCategory);

  }

  addVendorItemData() {
    console.log(this.addVendorItems);

    if (this.addVendorItems.itemName.trim() == '') {
      var errorMessage = 'Please enter menu item.';
      this._message.showError(errorMessage);
    } else if (this.menuCategory.trim() == '') {
      var errorMessage = 'Please select menu category.';
      this._message.showError(errorMessage);
    } else if (this.addVendorItems.menuImage.trim() == '') {
      var errorMessage = 'Please select menu image.';
      this._message.showError(errorMessage);
    } else if (this.addVendorItems.type.trim() == '') {
      var errorMessage = 'Please select menu type Veg or Non Veg.';
      this._message.showError(errorMessage);
    } else if (this.addVendorItems.price.trim() == '') {
      var errorMessage = 'Please enter menu price.';
      this._message.showError(errorMessage);
    } else {

      var addVendorItemData = this.addVendorItems;

      const fm = new FormData();
      fm.append('customerId', localStorage.getItem('adminId'));
      fm.append('vendorId', addVendorItemData.vendorId);
      fm.append('categoryId', this.menuCategory.toString());
      fm.append('itemName', addVendorItemData.itemName);
      fm.append('type', addVendorItemData.type);
      fm.append('waitingTime', addVendorItemData.waitingTime);

      fm.append('menuImage', this.menuImage, this.menuImage.name);
      fm.append('price', addVendorItemData.price);
      fm.append('itemExtra', '');

      this._appservice.addVendorItems(fm)
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
