import { Auth } from "../api/agent";
import { authActions } from "./auth-slice";
import { uiActions } from "./ui";

export const userLogin = (username, password) => {
  return async (dispatch) => {
    dispatch(uiActions.loadingStart());
    try {
      const loggedUser = await login(username, password);
      dispatch(
        authActions.login({
          role: loggedUser.data.user.authorities,
          user: loggedUser.data.user.username,
          token: loggedUser.data.jwt,
          authCode: loggedUser.data.code,
        })
      );
      dispatch(uiActions.loadingEnd());
    } catch (e) {
      dispatch(authActions.loginError(e.response.data.errors.error_message));
      dispatch(uiActions.loadingEnd());
      dispatch(uiActions.loginError(e.response.data.errors.error_message));
    }
  };
};
//load user with previous session if not logged out
export const loadUser = () => {
  return async (dispatch) => {
    try {
      console.debug("auth action--> loadUser : loading => start");
      const loggedUser = await loadUserByToken();
      console.debug("auth action--> loadUser : loading => end");
      dispatch(
        authActions.loadUser({
          role: loggedUser.data.roles,
          user: loggedUser.data.username,
        })
      );
      dispatch(uiActions.loadingEnd());
    } catch (e) {
      console.debug("auth action--> loadUser: error", e);
      dispatch(authActions.loginError());
      dispatch(uiActions.loadingEnd());
    }
  };
};
const loadUserByToken = async () => {
  const response = await Auth.loadUser();
  if (!response) {
    throw new Error("Could not login right now");
  }
  return response;
};

const login = async (username, password) => {
  const response = await Auth.login({ username, password });
  return response;
};
