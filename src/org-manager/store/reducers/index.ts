import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromPendingOrganisations from './organisation.reducer';

export interface OrganisationState {
  organisations: fromPendingOrganisations.OrganisationState;
}

export const reducers: ActionReducerMap<OrganisationState> = {
  organisations: fromPendingOrganisations.reducer,
};

export const getRootApproveOrgState = createFeatureSelector<OrganisationState>(
  'orgState'
);

export * from './organisation.reducer';
