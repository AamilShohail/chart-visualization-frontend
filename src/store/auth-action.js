import { Auth } from "../api/agent";
import { authActions } from "./auth-slice";
import { uiActions } from "./ui";

export const userLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const loggedUser = await login(username, password);
      console.log("re", { ...loggedUser.data });
      dispatch(authActions.login({
          role:loggedUser.data.user.authorities,
          user:loggedUser.data.user.username,
          token:loggedUser.data.jwt
      }));
      dispatch(uiActions.loadingEnd())
    } catch (e) {
        dispatch(authActions.loginError())
        console.log({e})
    }
  };
};

const login = async (username, password) => {
  const response = await Auth.login({ username, password });
  if (!response) {
    throw new Error("Could not login right now");
  }
  console.log({ response });
  return response;
};
