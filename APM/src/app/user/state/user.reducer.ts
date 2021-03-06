import { User } from '../user';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.actions';


export interface UserState {
    maskUserName: boolean;
    currentUser: User;
}

const initialState: UserState = {
    maskUserName: true,
    currentUser: null
};

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getShowUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
);

export const getCurrentUser = createSelector(
    getUserFeatureState,
    state => state.currentUser
);

export function reducer(state: UserState = initialState, action: UserActions): UserState {
    switch (action.type) {
        case UserActionTypes.MaskUserName:
            return {
                ...state,
                maskUserName: action.payload
            };
        default:
            return state;
    }
}
