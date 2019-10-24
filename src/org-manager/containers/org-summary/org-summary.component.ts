import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as fromfeatureStore from '../../store';

@Component({
  selector: 'app-org-summary',
  templateUrl: './org-summary.component.html'
})
export class OrgSummaryComponent implements OnInit, OnDestroy {
  public orgSummary$: Observable<any>;
  public loading$: Observable<boolean>;
  public $routeSubscription: Subscription;
  public pageId: string;
  constructor(
    private readonly _store: Store<fromfeatureStore.OrganisationState>) { }

  public ngOnInit() {
    this.orgSummary$ = this._store.pipe(select(fromfeatureStore.getSingleOrgOverview));
    this.loading$ = this._store.pipe(select(fromfeatureStore.orgSummaryLoading));

    this.$routeSubscription = this._store.pipe(select(fromfeatureStore.getCurrentPage)).subscribe((routeParams) => {
      if (routeParams.id && routeParams.id !== this.pageId) { // TODO see why double call.
        this.pageId = routeParams.id;
        this._store.dispatch(new fromfeatureStore.LoadSingleOrg({ id: this.pageId
        }));
      }
    });

  }

  public ngOnDestroy() {
    this._store.dispatch(new fromfeatureStore.ResetSingleOrg({}));
    this.$routeSubscription.unsubscribe();
  }
}
