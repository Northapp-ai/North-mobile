import { resendSignUpCode, signIn } from "../services/authServices";

export const useAuth = () => {

  const onSingIn = async (data: any) => {
    const { email, password } = data;
    try {
      const response = await signIn(email, password);
      return response
    } catch (error: any) {
      if (error.name === 'UserNotConfirmedException') {
        return {error}
      }
      throw error
    }
  };

  const onResendSignUpCode = async (email: string) => {
    try {
      const response = await resendSignUpCode(email);
      console.log('response', JSON.stringify(response));
      return response;
    } catch (error: any) {
      console.error("Error during resendSignUpCode:", error);
      return {error}
    }
  }

  return {
    onSingIn,
    onResendSignUpCode
  }
}
export default useAuth;