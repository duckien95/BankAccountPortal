import { Injectable } from '@angular/core';
import { ConfigSetting } from "../common/config-setting"
import { Observable, throwError } from 'rxjs';
import { HttpClientService } from "./http-client.service";
import { BankAccountModel } from "../models/bank-account.model"
import { catchError } from 'rxjs/operators';

@Injectable({
  	providedIn: 'root'
})
export class BankAccountService {

	constructor(private httpClientService: HttpClientService) { }

	getDetailBankAccount(accountId: string){
		return this.httpClientService.getJSON(`${ConfigSetting.UrlPathBankAccount}/${accountId}`,{});
	}

	getListBankAccount(searchData: BankAccountModel){
		return this.httpClientService.getJSON(ConfigSetting.UrlPathBankAccount, searchData);
	}
	  
	createBankAccount(newAccount: BankAccountModel){
		return this.httpClientService.postJSON(ConfigSetting.UrlPathBankAccount, newAccount);
	}

	updateBankAccount(accountId: string, updatedAccount: BankAccountModel){
		return this.httpClientService.putJSON(`${ConfigSetting.UrlPathBankAccount}/${accountId}`, updatedAccount)
	}

	deleteBankAccount(accountId: string){
		return this.httpClientService.delete(`${ConfigSetting.UrlPathBankAccount}/${accountId}`);
	}



}
