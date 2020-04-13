import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

// third party module
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule, ToastrService } from 'ngx-toastr';

// Services
import { AuthenticateService } from './auth/authenticate.service';
import { ToastService } from "./common/toast.service";

// Interceptors
import { TokenInterceptor } from "./helper/token.interceptor";  
import { ErrorInterceptor } from "./helper/error.interceptor";

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';   
import { BankAccountListComponent } from './components/bank-account/bank-account-list/bank-account-list.component';
import { BankAccountModifyComponent } from './components/bank-account/bank-account-modify/bank-account-modify.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
	declarations: [
		AppComponent,
		AdminComponent,
		HomeComponent,
		BankAccountListComponent,
		BankAccountModifyComponent,
		AdminComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule, // required animations module
		ToastrModule.forRoot({
			timeOut: 3000,
			positionClass: 'toast-bottom-right'
		}), // ToastrModule added
		FormsModule,
		ReactiveFormsModule,		
		HttpClientModule,
		HttpModule,
		AppRoutingModule,
		NgxPaginationModule,
		CommonModule
	],
	providers: [
		ToastrService,
		ToastService,
		AuthenticateService,
		{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
	],
  	bootstrap: [AppComponent]
})
export class AppModule { }
