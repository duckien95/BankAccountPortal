import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';


import { AuthenticateService } from "../../auth/authenticate.service";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	loading = false;
	submitted = false;
	returnUrl: string;
	error = '';

  	constructor(
		private formBuilder: FormBuilder,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private authenticateService: AuthenticateService
  	) {
		// redirect to home if already logged in
		if (this.authenticateService.getLocalStorageData()) { 
			this.router.navigate(['/']);
		}
	}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
		});

		// get return url from route parameters or default to '/'
		this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/bank_account';
	}

	// convenience getter for easy access to form fields
	get f() { return this.loginForm.controls; }

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.loginForm.invalid) {
			return;
		}

		this.loading = true;
		const loginData = {
			'username': this.f.username.value,
			'password': this.f.password.value
		}
		this.authenticateService.login(loginData)
			.subscribe(
				data => {
					this.router.navigate([this.returnUrl]);
				},
				error => {
					this.error = error;
					this.loading = false;
				}
			);
	}

}
