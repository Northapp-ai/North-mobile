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
    console.log("Error during signUp:", error);
    throw { message: getErrorMessage(error.name) };
  }
};

export const confirmSignUp = async (email: string, code: string) => {
  try {
    const result = await Auth.confirmSignUp(email, code);
    return result;
  } catch (error) {
    console.error("Error during confirmSignUp:", error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const result = await Auth.signIn(email.trim(), password);
    console.log("SignIn Success:", result);
    return result;
  } catch (error: any) {
    console.log("⚠️ SIGNIN ERROR - FULL DETAILS:");
    console.log("error.name:", error.name);
    console.log("error.message:", error.message);
    console.log("error.underlyingError:", error.underlyingError);
    console.log("full error:", JSON.stringify(error, null, 2));
    throw { message: error.message || error.name || "Unknown error during sign-in" };
  }
};

export const signOut = async () => {
  try {
    return await Auth.signOut();
  } catch (error) {
    console.error("Error during signOut:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await Auth.currentAuthenticatedUser();
    console.log('response', response);
    return response;
  } catch (error) {
    console.error("Error during getCurrentUser:", error);
    throw error;
  }
};

const getErrorMessage = (code: string): string => {
  const errorMessages: { [key: string]: string } = {
    InvalidPasswordException: "La contraseña debe tener al menos 8 caracteres con números y letras.",
    UsernameExistsException: "Este correo ya está registrado. Intenta iniciar sesión.",
    InvalidParameterException: "Uno o más campos no son válidos.",
    UserNotFoundException: "Usuario y contraseña no coinciden.",
    CodeMismatchException: "El código de verificación no es correcto.",
  };

  return errorMessages[code] ?? "No se pudo completar el registro.";
};
