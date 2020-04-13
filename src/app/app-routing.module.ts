import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AuthGuard } from "./auth/auth.guard";
import { Role } from './models/user-role.model';

// components
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { AdminComponent } from "./components/admin/admin.component";
import { BankAccountListComponent } from "./components/bank-account/bank-account-list/bank-account-list.component";

const routes: Routes = [  
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'bank_account',
        component: BankAccountListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin', 
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { 
            roles: [Role.ADMIN] 
        } 
    },
    { 
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    { path: '**', component: HomeComponent }
];

@NgModule({
    declarations: [
        LoginComponent
	],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,		
		HttpClientModule,
		HttpModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
})

export class AppRoutingModule { }
