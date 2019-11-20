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

export const getActiveLoaded = createSelector(
  getActiveOrganisationState,
  (orgState) => orgState.loaded
);

export const getActiveLoading = createSelector(
  getActiveOrganisationState,
  (orgState) => orgState.loading
);

// entry for Pending Organisations
export const getPendingOrganisationsState = createSelector(
  getOrganisationsState,
  fromOrganisation.getPendingOrg
);

export const getPendingOrganisationsArray = createSelector(
  getPendingOrganisationsState,
  (orgsArray) => orgsArray.orgs
);
export const getPendingLoaded = createSelector(
  getPendingOrganisationsState,
  (orgState) => orgState.loaded
);
/////

export const getErrorMessage = createSelector(
  getOrganisationsState,
  (orgState) => orgState.errorMessage
);
export const selectedActiveOrganisation = createSelector(
  getActiveOrganisation,
  fromRoot.getRouterState,
  (organisationState: OrganisationVM[], router) => {
  if (organisationState) {
    return organisationState.filter(x => x.organisationId === router.state.params.id)[0] || {};
  }
});

export const selectedPendingOrganisation = (orgId: string) => createSelector( getPendingOrganisationsState, (organisationState: any) => {
  if (organisationState && organisationState.pendingOrganisations) {
    return organisationState.pendingOrganisations.filter(x => x.organisationId === orgId) as OrganisationVM;
  } else {
    return {};
  }
});

export const pendingOrganisationsCount = createSelector(
  getActiveOrganisation,
  (orgArr) =>  orgArr ? orgArr.length : 0
);

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
