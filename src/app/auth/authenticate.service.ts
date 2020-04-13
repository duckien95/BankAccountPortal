import { Injectable } from "@angular/core"
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import * as _ from "lodash"

import { ConfigSetting } from "../common/config-setting"
import { HttpClientService } from "../services/http-client.service"
import { Role } from "../models/user-role.model";

@Injectable({ providedIn: 'root' })
export class AuthenticateService {
    private userStorageSubject: BehaviorSubject<any>;
    public userSubject: Observable<any>;
    currentUserData: any;

    private UserLocalStorage = 'UserLocalStorage';

    constructor(private httpClient: HttpClientService){
        this.userStorageSubject = new BehaviorSubject<any>(
            localStorage.getItem(this.UserLocalStorage) ? JSON.parse(localStorage.getItem(this.UserLocalStorage)) : null
        );
        this.userSubject = this.userStorageSubject.asObservable();
    }

    public login(request: Object) {
        return this.httpClient.postJSON(ConfigSetting.UrlPathLogin, request)
        .pipe(
            first(),
            map(
                user => {
                    // login successful
                    // console.log("AuthenticateService login..........................");
                    const userData = user['data'];
                    if (userData && userData.token) {
                        // store user details and token in local storage
                        this.setLocalStorageData(userData);
                    }
                    return userData;
                }
            
            )
        );
    }

    public logout() {
        localStorage.removeItem(this.UserLocalStorage);
        this.currentUserData = null;
        this.userStorageSubject.next(null);
    }
    
    public setLocalStorageData(user: any): void {
        const currentDate = new Date();       
        currentDate.setHours(currentDate.getHours() + ConfigSetting.PeriodTimeTokenValid);
        const userStorageData = {
            status: true,
            token: user.token,
            expired_time: currentDate.getTime(),
            username: user.username,
            role: user.role
        };

        localStorage.setItem(this.UserLocalStorage, JSON.stringify(userStorageData));
        this.userStorageSubject.next(userStorageData);
    }
    
    public getLocalStorageData(): any {
        // this.userSubject.pipe().subscribe(data => { this.currentUserData = data });
        return this.userStorageSubject.value;
    }

    public isAdmin(){
        return this.userStorageSubject.value && this.userStorageSubject.value.role === Role.ADMIN;
    }
}