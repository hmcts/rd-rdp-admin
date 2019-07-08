import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as appActions from '../actions';
import { map } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie';

@Injectable()
export class AppEffects {
    constructor(
        private actions$: Actions,
        private cookieService: CookieService
    ) { }

    @Effect({ dispatch: false })
    logout$ = this.actions$.pipe(
        ofType(appActions.LOGOUT),
        map(() => {
            window.location.href = '/api/logout';
            // TODO: shouldn't need to clear cookies here
            this.cookieService.removeAll();
        })
    );

}
