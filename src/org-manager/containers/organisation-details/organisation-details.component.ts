import {Component, OnInit} from '@angular/core';
import * as fromStore from '../../store';
import { Store, select } from '@ngrx/store';
import { OrganisationVM} from 'src/org-manager/models/organisation';
import { Observable } from 'rxjs';
import {filter, map, pluck, take, takeWhile} from 'rxjs/operators';
import * as fromOrganisation from '../../store/';

/**
 * Bootstraps Organisation Details
 */
@Component({
  selector: 'app-org-details',
  templateUrl: './organisation-details.component.html'
})
export class OrganisationDetailsComponent implements OnInit {

  public orgs$: Observable<OrganisationVM>;

  constructor(private store: Store<fromStore.OrganisationRootState>) {}

  public ngOnInit(): void {
    this.store.pipe(select(fromStore.getAllLoaded)).pipe(takeWhile(loaded => !loaded)).subscribe(loaded => {
      if (!loaded) {
        this.store.dispatch(new fromOrganisation.LoadActiveOrganisation());
        this.store.dispatch(new fromOrganisation.LoadPendingOrganisations());
      }
    });

    this.orgs$ = this.store.pipe(select(fromStore.getActiveAndPending));
    this.orgs$.pipe(
        filter(value => value !== undefined),
        map(value => {
          const {pbaNumber, organisationId} = value;
          return {pbaNumber, organisationId};
        }),
        take(1)
    ).subscribe(({organisationId, pbaNumber}) => {
      this.store.dispatch(new fromOrganisation.LoadPbaAccountName({
            orgId: organisationId,
            pbas: pbaNumber.toString()
          }
        )
      );
    });
  }

}
