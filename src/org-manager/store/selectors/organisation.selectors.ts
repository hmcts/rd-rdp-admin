import {createSelector} from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromOrganisation from '../reducers';
import { OrganisationVM } from 'src/org-manager/models/organisation';

export const getOrganisationsState = createSelector(
  fromOrganisation.getRootApproveOrgState,
  (state: fromOrganisation.OrganisationState) => state.organisations
);
// entry for Active Organisations
export const getActiveOrganisationState = createSelector(
  getOrganisationsState,
  fromOrganisation.getActiveOrg
);

export const getActiveOrganisation = createSelector(
  getActiveOrganisationState,
  (orgState) => orgState.orgs
);

export const getPendingOrganisationsState = createSelector(
  getOrganisationsState,
  (state: any) => state.pendingOrganisations
);

export const selectedOrganisation = createSelector(
  getOrganisationsState,
  fromRoot.getRouterState,
  (organisationState: any, router) => {
    // TODO find the elegant way of doing this
  if (organisationState && organisationState.organisations) {
    return organisationState.organisations.filter(x => x.organisationId === router.state.params.id)[0];
  } else {
    return {};
  }
});
export const selectedPendingOrganisation = (orgId: string) => createSelector( getPendingOrganisationsState, (organisationState: any) => {
  if (organisationState && organisationState.pendingOrganisations) {
    return organisationState.pendingOrganisations.filter(x => x.organisationId === orgId) as OrganisationVM;
  } else {
    return {};
  }
});
//
// // export const organisationsLoading = createSelector(
// //   getOrganisationsState,
// //   fromOrganisation.getOrganisationsLoading
// // );
// //
// // export const organisationsLoaded = createSelector(
// //   getOrganisationsState,
// //   fromOrganisation.getOrganisationsLoaded
// // );
//
export const getCurrentPage = createSelector(
    fromRoot.getRouterState,
    (router) => router.state.params
  );
