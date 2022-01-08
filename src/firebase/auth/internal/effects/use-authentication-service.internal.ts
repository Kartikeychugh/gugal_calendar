import { useAuthActions } from "../reducers";

export const useAuthenticationServiceInternal = () => {
  const { addUser } = useAuthActions();
  return {
    addUser,
  };
};
