import {OrganisationVM} from 'src/org-manager/models/organisation';
import * as fromActions from '../actions';

export interface OrganisationState {
  activeOrganisations: {
    orgEntities: {[id: string]: OrganisationVM},
    loaded: boolean;
    loading: boolean;
    searchString: string;
  };
  pendingOrganisations: {
    orgEntities: {[id: string]: OrganisationVM},
    loaded: boolean;
    loading: boolean;
    searchString: string;
  };
  errorMessage: string;
  orgForReview: OrganisationVM | null;
}

export const initialState: OrganisationState = {
  activeOrganisations: {orgEntities: {}, loaded: false, loading: false, searchString: ''},
  pendingOrganisations: {orgEntities: {}, loaded: false, loading: false, searchString: ''},
  errorMessage: '',
  orgForReview: null
};

export function reducer(
  state = initialState,
  action: fromActions.OrganisationsActions | fromActions.EditDetailsActions
): OrganisationState {
  switch (action.type) {

    case fromActions.OrgActionTypes.LOAD_ACTIVE_ORGANISATIONS: {
      const activeOrganisations = {
        orgEntities: {},
        loaded: false,
        loading: true,
        searchString: ''
      };
      return {
        ...state,
        activeOrganisations
      };
    }
    case fromActions.OrgActionTypes.LOAD_ACTIVE_ORGANISATIONS_SUCCESS: {
      const orgEntities = action.payload.reduce((entities: {[id: string]: OrganisationVM}, org: OrganisationVM) => {
        return {
          ...entities,
          [org.organisationId]: org
        };
      }, {...state.activeOrganisations.orgEntities});
      const activeOrganisations = {
        orgEntities,
        loaded: true,
        loading: false,
        searchString: ''
      };
      return {
        ...state,
        activeOrganisations
      };
    }

    case fromActions.OrgActionTypes.CLEAR_ERRORS: {
      return {
        ...state,
        errorMessage: ''
      };
    }

    case fromActions.OrgActionTypes.LOAD_PENDING_ORGANISATIONS: {
      const pendingOrganisations = {
        orgEntities: {},
        loaded: false,
        loading: true,
        searchString: ''
      };
      return {
        ...state,
        pendingOrganisations
      };
    }

    case fromActions.OrgActionTypes.LOAD_PENDING_ORGANISATIONS_SUCCESS: {
      const orgEntities = action.payload.reduce((entities: {[id: string]: OrganisationVM}, org: OrganisationVM) => {
        return {
          ...entities,
          [org.organisationId]: org
        };
      }, {...state.pendingOrganisations.orgEntities});

      const pendingOrganisations = {
        orgEntities,
        loaded: true,
        loading: false,
        searchString: ''
      };
      return {
        ...state,
        pendingOrganisations
      };
    }

    case fromActions.OrgActionTypes.ADD_REVIEW_ORGANISATIONS: {
      const orgForReview = action.payload;
      return {
        ...state,
        orgForReview,
        errorMessage: ''
      };
    }

    case fromActions.OrgActionTypes.APPROVE_PENDING_ORGANISATIONS_SUCCESS: {
      const approvedOrg =  {
        ...action.payload,
        status: 'ACTIVE'
      };
      const activeEntities = {
        ...state.activeOrganisations.orgEntities,
        [approvedOrg.organisationId]: approvedOrg
      };
      const activeOrganisations = {
        orgEntities: activeEntities,
        loaded: state.activeOrganisations.loaded,
        loading: false,
        searchString: ''
      };

      const pendingEntities = {
        ...state.pendingOrganisations.orgEntities,
      };

      if (pendingEntities.hasOwnProperty(approvedOrg.organisationId)) {
        delete pendingEntities[approvedOrg.organisationId];
      }

      const pendingOrganisations = {
        ...state.pendingOrganisations,
        orgEntities: pendingEntities
      };
      return {
        ...state,
        activeOrganisations,
        pendingOrganisations,
        errorMessage: '',
        orgForReview: null
      };
    }

    case fromActions.OrgActionTypes.DISPLAY_ERROR_MESSAGE_ORGANISATIONS: {
      const errorMessage = action.payload;
      return {
        ...state,
        errorMessage
      };
    }

    case fromActions.SUBMIT_PBA_SUCCESS: {
      const {paymentAccounts, orgId} = action.payload;

      const pbaNumber = [...paymentAccounts];
      const orgType = state.activeOrganisations.orgEntities[orgId] ? 'activeOrganisations' : 'pendingOrganisations';

      const entity = {
       ...state[orgType].orgEntities[orgId],
       pbaNumber
      } as OrganisationVM;

      const orgEntities = {
       ...state[orgType].orgEntities,
       [orgId]: entity
      };

      if (orgType === 'activeOrganisations') {
        const activeOrganisations = {
         ...state[orgType],
         orgEntities
        };
        return {
          ...state,
         activeOrganisations
        };
      } else {
        const pendingOrganisations = {
          ...state[orgType],
          orgEntities
        };
        return {
          ...state,
          pendingOrganisations
        };
      }
    }

    case fromActions.OrgActionTypes.UPDATE_ACTIVE_ORGANISATIONS_SEARCH_STRING: {
      const activeOrganisations = {
        orgEntities: state.activeOrganisations.orgEntities,
        loaded: state.activeOrganisations.loaded,
        loading: false,
        searchString: action.payload
      };

      return {
        ...state,
        activeOrganisations
      };
    }

    case fromActions.OrgActionTypes.UPDATE_PENDING_ORGANISATIONS_SEARCH_STRING: {
      const pendingOrganisations = {
        orgEntities: state.pendingOrganisations.orgEntities,
        loaded: state.pendingOrganisations.loaded,
        loading: false,
        searchString: action.payload
      };

      return {
        ...state,
        pendingOrganisations
      };
    }

    default:
      return state;
  }
}

export const getPendingOrganis = (state: OrganisationState) => state.pendingOrganisations;
export const getActiveOrgEntities = (state: OrganisationState) => state.activeOrganisations;
export const getPendingOrgEntities = (state: OrganisationState) => state.pendingOrganisations;
export const getOrgForReview = (state: OrganisationState) => state.orgForReview;
