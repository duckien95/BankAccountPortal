import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from './auth/authenticate.service';
import { ConfigSetting } from './common/config-setting';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Portal';
	
	constructor(
        private router: Router,
        private authenticateService: AuthenticateService
    ) {}

    logout() {
        this.authenticateService.logout();
        this.router.navigate([ConfigSetting.NavigationPathLoginPage]);
    }
}
