import { resendSignUpCode, signIn } from "../services/authServices";

export const useAuth = () => {

  const onSingIn = async (data: any) => {
    const { email, password } = data;
    try {
      const response = await signIn(email, password);
      return mapperUser(response);
    } catch (error: any) {
      if (error.name === 'UserNotConfirmedException') {
        return { error }
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
      return { error }
    }
  }

  const mapperUser = (user: any) => {
    const { email, name, family_name } = user.attributes;
    return {
      email,
      name,
      fullName: `${name} ${family_name}`,
      lastName: family_name,
    }
  }

  return {
    onSingIn,
    onResendSignUpCode
  }
}
export default useAuth;