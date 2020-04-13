import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from 'src/app/auth/authenticate.service';
import { BankAccountModel } from 'src/app/models/bank-account.model';
import { BankAccountService } from 'src/app/services/bank-account.service';
import { EmailValidator } from "../../validators/email.validator";

@Component({
	selector: 'app-list-bank-account',
	templateUrl: './list-bank-account.component.html',
	styleUrls: ['./list-bank-account.component.css']
})
export class ListBankAccountComponent implements OnInit {

	searchForm: FormGroup;
	listBankAccountData = [];
	searchData: any;
	selectedAccountId: string;
	loading = false;


	pageNumber = 1;
	itemsPerPage = 15; 
	totalItems: number;
	startRowIndex : number;

	constructor(
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
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
			account_number: [''],
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

		this.searchForm.reset();


		console.log(this.searchForm.controls);
		this.getListBankAccount();
	}

	// convenience getter for easy access to form fields
	get f() { return this.searchForm.controls; }

	getListBankAccount(){
		console.log(this.searchForm);
		this.searchData = {...this.searchData, ...this.searchForm.value};
		this.bankAccountService.getListBankAccount(this.searchData)
			.pipe()
			.subscribe(
				dataResponse => {
					// if response data is not empty
					if(dataResponse.data && dataResponse.data.length > 0){
						// console.log(dataResponse.data)
						this.listBankAccountData = dataResponse.data;
						this.totalItems = dataResponse.total_item;
					} else this.listBankAccountData = [];
				},
				error => {
					console.log(error);
					this.loading = false;
				}
			);
	}

	pageChanged(evt: any){
		this.pageNumber = evt;
		this.searchData.page_number = this.pageNumber;
		this.getListBankAccount();
	}

}
