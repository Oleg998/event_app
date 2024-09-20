export const selectAuthIsLogin = state=>state.auth.isLogin;

export const selectAuthError=state=>state.auth.error;

export const selectAuthorUser=state=>state.auth.user.name;

export const selectAuthIsLoading = state=>state.auth.isLoading;

export const selectAuthToken = state=>state.auth.token;