export const createFirebaseErrorObj = (
  errorCode: string,
  errorMessage: string
) => {
  return {
    errorCode,
    errorMessage,
  };
};
