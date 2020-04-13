import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticateService } from "../../auth/authenticate.service";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

	constructor(
		private authenticateService: AuthenticateService,
		private activedRoute: ActivatedRoute,
		private router: Router,
	) { }

  	ngOnInit() {
	}
	
	logout(){
		this.authenticateService.logout();
		this.router.navigate([this.activedRoute.snapshot.queryParams['returnUrl'] || '/login']);
	}

}
