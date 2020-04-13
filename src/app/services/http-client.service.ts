import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RequestOptions, URLSearchParams } from "@angular/http";
import { ConfigSetting } from "../common/config-setting"
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
declare var $: any;


@Injectable({
    providedIn: 'root'
})
export class HttpClientService {

    constructor(
        private http: HttpClient
    ) { }

    public getJSON(absolutePath: string, requestParams: any): Observable<any> {
        const url: string = ConfigSetting.getCompleteURL(absolutePath);
        if($.isEmptyObject(requestParams)){
            return this.http.get(url);
        } else {
            let params = new URLSearchParams();
            for (let key in requestParams) {
                params.set(key, requestParams[key])
            }

            return this.http.get(`${url}?${params.toString()}`);
        }
    }

    public postJSON(absolutePath: string, requestBody: any): Observable<any> {
        const url: string = ConfigSetting.getCompleteURL(absolutePath);
        return this.http.post(url, requestBody);
    }

    public putJSON(absolutePath: string, requestBody: any): Observable<any> {
        const url: string = ConfigSetting.getCompleteURL(absolutePath);
        return this.http.put(url, requestBody);
    }

    public delete(absolutePath: string): Observable<any> {
        const url: string = ConfigSetting.getCompleteURL(absolutePath);
        return this.http.delete(url);
    }
}
