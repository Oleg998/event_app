import { createSelector } from "@reduxjs/toolkit";
import { selectFilter } from "../filter/filter-selectors";

export const selectUsersLogin = state=>state.user.isLogin;

export const selectUserError=state=>state.user.error;

export const selectUser=state=>state.user.user;

export const selectUserIsLoading = state=>state.user.isLoading;

export const selecStatusError = state=>state.user.error;

export const selectFilterUser = createSelector(
    [selectUser, selectFilter],
    (user, filter) => {
      if (!user || !user.result) {
        return [];
      }
  
      if (!filter) {
        return user.result;
      }
      
      const normalizedFilter = filter.toLocaleLowerCase();
      
      return user.result.filter(({ name, email, birthday }) =>
        name.toLocaleLowerCase().includes(normalizedFilter) ||
        email.toLocaleLowerCase().includes(normalizedFilter) ||
        birthday.toLocaleLowerCase().includes(normalizedFilter)
      );
    }
  );