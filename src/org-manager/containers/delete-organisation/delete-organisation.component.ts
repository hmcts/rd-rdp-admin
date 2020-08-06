import {Component, OnInit} from '@angular/core';
import * as fromOrganisationPendingStore from '../../../org-manager/store';
import {select, Store} from '@ngrx/store';
import {OrganisationVM} from 'src/org-manager/models/organisation';
import {take, tap} from 'rxjs/operators';
import {DeletePendingOrganisation, DeletePendingOrganisationFail} from '../../store/actions/organisations.actions';
import {Go} from '../../../app/store/actions';
import {OrganisationVM} from '../../../org-manager/models/organisation';
import * as fromOrganisationPendingStore from '../../../org-manager/store';
import {DeletePendingOrganisation} from '../../store/actions/organisations.actions';
import {getOrganisationForReview} from '../../store/selectors';

@Component({
  selector: 'app-org-pending-delete',
  templateUrl: './delete-organisation.component.html'
})
export class DeleteOrganisationComponent implements OnInit {

  public orgForReview: OrganisationVM | null;

  public confirmButtonDisabled = false;

  constructor(public store: Store<fromOrganisationPendingStore.OrganisationRootState>) {
  }

  public ngOnInit() {

    this.addOrganisationForReviewSubscribe();
  }

  /**
   * Add Organisation For Review Subscribe
   *
   * We subscribe to the organisation under review, so that we can display this information to the user within the view.
   */
  public addOrganisationForReviewSubscribe() {

    this.store.pipe(select(getOrganisationForReview), take(1)).subscribe((org: OrganisationVM) => {
      if (!org) {
        this.store.dispatch(new Go({path: ['/pending-organisations']}));
      }
      this.orgForReview = org;
    });
  }

  /**
   * On Delete Organisation Handler
   *
   * @param orgForReview
   */
  public onDeleteOrganisationHandler(orgForReview) {

    this.store.dispatch(new DeletePendingOrganisation(orgForReview));
    // this.disabled = false;
    // We now need to check if any global error is added to the store and, if so, dispatch an Action that will navigate
    // to the Service Down page
    this.store.dispatch(new DeletePendingOrganisationFail());
  }
}
