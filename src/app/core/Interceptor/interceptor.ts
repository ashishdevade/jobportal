import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    //function which will be called for all http calls
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //how to update the request Parameters
        // let token = localStorage.getItem('catalogue_token');
        request = request.clone({
            setHeaders: {
              //   Authorization: "THIS IS TOKEN WITH EVERY REQ",
                // "Access-Control-Allow-Origin": "*",
                // "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
                // "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
                // "Access-Control-Allow-Credentials": "true",
            }
        });

        //logging the updated Parameters to browser's console
        // console.log("Before making api call : ", request);
        return next.handle(request).pipe(
            tap(
                event => {
                    //logging the http response to browser's console in case of a success
                    if (event instanceof HttpResponse) {
                        // console.log("api call success :", event);
                    }
                },
                error => {
                    //logging the http response to browser's console in case of a failuer
                    if (error instanceof HttpResponse) {
                        // console.log("api call error :", error);
                    }
                }
            )
        );
    }
}