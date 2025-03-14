import {
  signUp as amplifySignUp,
  confirmSignUp as amplifyConfirmSignUp,
  signIn as amplifySignIn,
  signOut as amplifySignOut,
  getCurrentUser as amplifyGetCurrentUser
} from "aws-amplify/auth";
import { User } from "../models/types";

export const signUp = async (user:User) => {
  try {
    const { email, password, name,lastName } = user;
    const result = await amplifySignUp({
      username: email,
      password,
      userAttributes: {
        email,
        name,
        lastName,
      }
    });
    return result;
  } catch (error) {
    console.error("Error during signUp:", error);
    throw error;
  }
};

export const confirmSignUp = async (email: string, code: string) => {
  try {
    const result = await amplifyConfirmSignUp({
      username: email,
      confirmationCode: code
    });
    return result;
  } catch (error) {
    console.error("Error during confirmSignUp:", error);
    throw error;
}
};

export const signIn = async (email: string, password: string) => {
  try {
    const result = await amplifySignIn({
      username: email,
      password
    });
    return result;
  } catch (error) {
    console.error("Error during signIn:", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    return await amplifySignOut();
  } catch (error) {
    console.error("Error during signOut:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
  const response = await amplifyGetCurrentUser();
  console.log('response',response);
  return response;

  } catch (error) {
    console.error("Error during getCurrentUser:", error);
    throw error;
  }
};
