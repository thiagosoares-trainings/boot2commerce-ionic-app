import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpUserEvent, HttpResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ErrorIntercptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        
        return next.handle(req).catch((error, caught) => {
            
            let errorObj = error;
            
            if(errorObj.error) {
                errorObj = errorObj.error;
            }
            if(!errorObj.status) {
                errorObj = JSON.stringify(errorObj);
            }
            
            console.log(">>>>>>> ErrorIntercptor ....");
            console.log(errorObj);
            

            return Observable.throw(errorObj);
        }) as any;
    }
}

export const ErrorIntercptorProvider = {

    provide: HTTP_INTERCEPTORS,
    useClass: ErrorIntercptor, 
    multi: true,
}