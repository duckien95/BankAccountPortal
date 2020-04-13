import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from './authenticate.service';
import { ConfigSetting } from '../common/config-setting';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
		private router: Router,
		private authenticateService: AuthenticateService
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const userStorageData = this.authenticateService.getLocalStorageData();
		if (userStorageData) {
			// check if route is restricted by role
			if (route.data.roles && route.data.roles.indexOf(userStorageData.role) === -1) {
				// role is not authorized -> redirect to home page
				this.router.navigate([ConfigSetting.NavigationPathHomePage]);
				return false;
			}

			return true;
		}

		// user is not logging in -> redirect to login page with
		this.router.navigate([ConfigSetting.NavigationPathLoginPage], { queryParams: { returnUrl: state.url } });
		return false;
	}
}
