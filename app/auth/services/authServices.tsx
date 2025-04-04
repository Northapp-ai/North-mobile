import { Auth } from "aws-amplify";
import { User } from "../models/types";

export const signUp = async (user: User) => {
  try {
    const { email, password, name, lastName } = user;
    const result = await Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        name,
        family_name: lastName
      }
    });
    return result;
  } catch (error: any) {
    console.log("⚠️ SIGNUP ERROR - FULL DETAILS:");
    console.log("error:", error.name);
    throw { message: getErrorMessage(error.code) || "Error al iniciar sesión.", name: error.code };

  }
};

export const confirmSignUp = async (email: string, code: string) => {
  try {
    const response = await Auth.confirmSignUp(email, code);
    console.log('response confirmSignUp', JSON.stringify(response));
    return response;
  } catch (error: any) {
    console.error("Error during confirmSignUp:", error);
    const newError = { message: getErrorMessage(error.code) || "Error al confirmar otp.", name: error.code };
    throw newError
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const result = await Auth.signIn(email.trim(), password);
    return result;
  } catch (error: any) {
    console.log("⚠️ SIGNIN ERROR - FULL DETAILS:");
    console.log("error.name:", error.name);
    throw { message: getErrorMessage(error.code), name: error.code };
  }
};

export const signOut = async () => {
  try {
    return await Auth.signOut();
  } catch (error:any) {
    console.error("Error during signOut:", error);
    throw { message: getErrorMessage(error.code), name: error.code };
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await Auth.currentAuthenticatedUser();
    console.log('response', response);
    return response;
  } catch (error: any) {
    console.error("Error during getCurrentUser:", error);
    throw { message: getErrorMessage(error.code), name: error.name };
  }
};

export const resendSignUpCode = async (email: string) => {
  try {
    const response = await Auth.resendSignUp(email);
    console.log('response', JSON.stringify(response));
    return response;
  } catch (error: any) {
    console.error("Error al reenviar el código de verificación:", error);
    throw { message: getErrorMessage(error.code), name: error.name };
  }
}

const getErrorMessage = (code: string): string => {
  const errorMessages: { [key: string]: string } = {
    InvalidPasswordException: "La contraseña debe tener al menos 8 caracteres con números y letras.",
    UsernameExistsException: "Este correo ya está registrado. Intenta iniciar sesión.",
    InvalidParameterException: "Uno o más campos no son válidos.",
    UserNotFoundException: "Usuario y contraseña no coinciden.",
    CodeMismatchException: "El código de verificación no es correcto.",
    UserNotConfirmedException: "El usuario no está confirmado. Por favor verifica tu correo.",
    NotAuthorizedException: "El correo o la contraseña son incorrectos.",
    LimitExceededException: "Se ha alcanzado el límite de intentos. Intenta más tarde.",
  };

  return errorMessages[code] ?? "No se pudo completar el registro.";
};
