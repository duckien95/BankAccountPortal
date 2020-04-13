import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from 'src/app/auth/authenticate.service';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { ToastService } from "../../../common/toast.service";
import { EmailValidator } from "../../../validators/email.validator";
import { ConfigSetting } from "../../../common/config-setting";
import { BankAccountModifyComponent } from '../bank-account-modify/bank-account-modify.component';

declare var $: any;

@Component({
	selector: 'app-bank-account-list',
	templateUrl: './bank-account-list.component.html',
	styleUrls: ['./bank-account-list.component.css']
})
export class BankAccountListComponent implements OnInit {

	@ViewChild(BankAccountModifyComponent) bankAccountModifyComponent: BankAccountModifyComponent
	genderList = ConfigSetting.BankAccountGenderList;
	searchForm: FormGroup;
	listBankAccountData = [];
	searchData: any;
	selectedAccountId: string;
	loading = false;
	message: string;
	pageNumber = 1;
	itemsPerPage = 15; 
	totalItems: number;
	startRowIndex : number;

	constructor(
		private toast: ToastService,
		private formBuilder: FormBuilder,
		private bankAccountService: BankAccountService,
		private authenticateService: AuthenticateService
	) { }

	ngOnInit() {
		this.startRowIndex = (this.pageNumber - 1) * this.itemsPerPage + 1;
		this.searchData = { 
			'page_number': this.pageNumber,
			'item_per_page': this.itemsPerPage
		}

		this.searchForm = this.formBuilder.group({
			account_number: ['', Validators.min(1)],
			balance: ['', Validators.min(0)],
			firstname: [''],
			lastname: [''],
			age: ['', Validators.min(1)],
			gender: [''],
			address: [''],
			employer: [''],
			email: ['', [EmailValidator]],
			city: [''],
			state: ['']
		});

		this.searchForm.controls.gender.setValue("", {
			onlySelf: true
		});

		this.getListBankAccount();
	}

	// convenience getter for easy access to form fields
	get f() { return this.searchForm.controls; }

	changeGender(evt){}

	getListBankAccount(){
		// console.log(this.searchForm.value);
		this.searchData = {...this.searchData, ...this.searchForm.value};
		this.bankAccountService.getListBankAccount(this.searchData)
			.subscribe(
				response => {
					// if response data is not empty
					if(response.success){
						let responseData = response.data;
						if(responseData.accounts && responseData.accounts.length > 0){
							// console.log(response.data);
							this.listBankAccountData = responseData.accounts;
							this.totalItems = responseData.total_item;
						} else 
							this.listBankAccountData = [];
					} else 
						this.toast.showError(response.message);

				},
				error => {
					// console.error(error);
					this.toast.showError(error);
					this.loading = false;
				}
			);
	}

	pageChanged(evt: any){
		this.pageNumber = evt;
		this.searchData.page_number = this.pageNumber;
		this.getListBankAccount();
	}

	showModifyModal(id: string) {
		if(this.authenticateService.isAdmin()){
			this.selectedAccountId = id;
			if(this.selectedAccountId){
				this.selectedAccountId = id;
				this.bankAccountModifyComponent.accountId = id;
				this.bankAccountModifyComponent.getDetailBankAccount();
			} else {
				this.bankAccountModifyComponent.accountId = null;
				this.bankAccountModifyComponent.modifyForm.reset();
			}
			$('#modify-bank-account-modal').modal('show');
		} else this.toast.showError(ConfigSetting.MessageErrorPermissionDeny);
	}

	showConfirmModal(id: string){
		if(this.authenticateService.isAdmin()){
			this.selectedAccountId = id;
			$('#confirm-modal').modal('show');
		} else this.toast.showError(ConfigSetting.MessageErrorPermissionDeny);
	}

	deleteAccount(){
		// console.log(id);
		if(this.authenticateService.isAdmin()){
			this.bankAccountService.deleteBankAccount(this.selectedAccountId)
			.subscribe(
				response => {
					if(response.success){
						this.toast.showSuccess(response.message);
						this.selectedAccountId = null;
						this.getListBankAccount();
						$('#confirm-modal').modal('hide');
					} else this.toast.showError("Delete fail");
				},
				error => {
					this.toast.showError(error);
					this.loading = false;
				}
			);
		} else this.toast.showError(ConfigSetting.MessageErrorPermissionDeny);

	}


}
