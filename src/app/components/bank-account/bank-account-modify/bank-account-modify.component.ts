import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from 'src/app/auth/authenticate.service';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { EmailValidator } from "../../../validators/email.validator";
import { ConfigSetting } from "../../../common/config-setting";
import { BankAccountModel } from 'src/app/models/bank-account.model';
import { ToastService } from "../../../common/toast.service"
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
	selector: 'app-bank-account-modify',
	templateUrl: './bank-account-modify.component.html',
	styleUrls: ['./bank-account-modify.component.css']
})
export class BankAccountModifyComponent implements OnInit {
	@Input() id: string;
	@Output() reloadParentComponent= new EventEmitter();

	userStorageData : any;
	accountId = null;
	genderList = ConfigSetting.BankAccountGenderList;
	modifyForm: FormGroup;
	accountData: BankAccountModel;
	loading = false;
	message: string;

	constructor(
		private toast: ToastService,
		private formBuilder: FormBuilder,
		private bankAccountService: BankAccountService,
		private authenticateService: AuthenticateService
	) { 
		this.authenticateService.userSubject.subscribe(data => this.userStorageData = data);
	}

	ngOnInit() {

		this.modifyForm = this.formBuilder.group({
			// account_number: [''],
			// balance: ['', Validators.min(0)],
			// firstname: [''],
			// lastname: [''],
			// age: ['', Validators.min(1)],
			// gender: [''],
			// address: [''],
			// employer: [''],
			// email: ['', [EmailValidator]],
			// city: [''],
			// state: ['']
			account_number: ['', [Validators.required, Validators.min(1)]],
			balance: ['', [Validators.required, Validators.min(0)]],
			firstname: ['', Validators.required],
			lastname: ['', Validators.required],
			age: ['', [Validators.required, Validators.min(1)]],
			gender: ['', Validators.required],
			address: ['', Validators.required],
			employer: ['', Validators.required],
			email: ['', [Validators.required, EmailValidator]],
			city: ['', Validators.required],
			state: ['', Validators.required]
		});

	}

	// convenience getter for easy access to form fields
	get f() { return this.modifyForm.controls; }

	getDetailBankAccount(){
		this.bankAccountService.getDetailBankAccount(this.accountId)
		.subscribe(
			dataResponse => {
				// if response data is not empty
				if(dataResponse.data && dataResponse.data.length > 0){
					// console.log(dataResponse.data)
					this.accountData = dataResponse.data[0];
				} else this.accountData = new BankAccountModel();
				this.modifyForm.patchValue(this.accountData);
			},
			error => {
				this.toast.showError(error);
				this.loading = false;
			}
		);

	}

	modifyBankAccount(){
		// if user is admin
		if(this.authenticateService.isAdmin()){
			//update bank account
			if(this.accountId){
				this.bankAccountService.updateBankAccount(this.accountId, this.modifyForm.value)
				.subscribe(
					dataResponse => {
						// if response data is not empty
						// console.log(dataResponse);
						if(dataResponse.data && dataResponse.data.length > 0){
							// console.log(dataResponse.data)
							this.accountData = dataResponse.data[0];
						} else this.accountData = new BankAccountModel();
						this.toast.showSuccess("Update success");
						this.closeConfirmModal();
						this.reloadFormAndListPage();
					},
					error => {
						this.toast.showError(error);
						this.loading = false;
					}
				);
			} else {
				// create bank account			
				this.bankAccountService.createBankAccount(this.modifyForm.value)
				.subscribe(
					dataResponse => {
						// if response data is not empty
						if(dataResponse.data && dataResponse.data.length > 0){
							// console.log(dataResponse.data)
							this.accountData = dataResponse.data[0];
							this.accountId = this.accountData.account_id;
						} else this.accountData = new BankAccountModel();
						this.toast.showSuccess("Create success");
						this.closeConfirmModal();
						this.reloadFormAndListPage();
					},
					error => {
						this.toast.showError(error);
						this.loading = false;
					}
				);
			}
		} else this.toast.showError(ConfigSetting.MessageErrorPermissionDeny);
	}

	closeConfirmModal(){
		this.modifyForm.reset();
		this.accountId = null;
		this.accountData = null;
		$('#modify-bank-account-modal').modal('hide');
	}

	reloadFormAndListPage(){
		// this.modifyForm.patchValue(this.accountData);
		this.reloadParentComponent.emit();
	}

}
