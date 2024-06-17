// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import {
  ConfirmSignUpInput,
  SignInInput,
  SignUpOutput,
  confirmSignUp,
  fetchAuthSession,
  resendSignUpCode,
  signIn,
  signOut,
  signUp,
  ResendSignUpCodeInput,
} from "aws-amplify/auth";
import { Alert, Platform, ToastAndroid } from "react-native";

type SignUpParameters = {
  username: string;
  password: string;
};

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  signUpFlow: any;
  onSignIn: ({ username, password }: SignInInput) => Promise<void>;
  onSignOut: () => Promise<void>;
  onSignUp: ({ username, password }: SignUpParameters) => Promise<any>;
  currentAuthenticatedUser: () => Promise<void>;
  handleSignUpConfirmation: ({
    username,
    confirmationCode,
  }: ConfirmSignUpInput) => Promise<void>;
  handleResendCode: (username: ResendSignUpCodeInput) => Promise<void>;
  Toast: (msg: string) => void;
  cleanSignUpFlow: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [signUpFlow, setSignUpFlow] = useState<SignUpOutput>();
  const [isLoading, setIsLoading] = useState(false);

  const onSignIn = async ({ username, password }: SignInInput) => {
    setIsLoading(true);
    try {
      await signIn({
        username,
        password,
        options: {
          authFlowType: "USER_PASSWORD_AUTH",
        },
      });

      setIsLoading(false);

      setIsAuthenticated(true);
      setUser(user);
      Toast(`Bienvenido`);
    } catch (error) {
      setIsLoading(false);

      console.error("Error signing in", error);
      Toast(`Error signing in: ${error}`);
    }
  };

  const onSignOut = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Error signing out", error);
      Toast(`Error signing out: ${error}`);
    }
  };

  const onSignUp = async ({ username, password }: SignUpParameters) => {
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email: username,
          },
          autoSignIn: true,
        },
      });
      setSignUpFlow({ isSignUpComplete, userId, nextStep });

      // setSignUpFlow({
      //   isSignUpComplete: false,
      //   userId: "",
      //   nextStep: {
      //     signUpStep: "CONFIRM_SIGN_UP",
      //     codeDeliveryDetails: { destinationdestination: "MOCKY" },
      //   },
      // });
    } catch (error) {
      console.warn("error signing up:", error);
      Toast(`error signing up: ${error}`);
    }
  };

  const handleSignUpConfirmation = async ({
    username,
    confirmationCode,
  }: ConfirmSignUpInput) => {
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username,
        confirmationCode,
      });

      setSignUpFlow({ isSignUpComplete, nextStep });

      // setSignUpFlow({ isSignUpComplete: true, nextStep: "DONE" });
    } catch (error) {
      console.warn("error confirming sign up", error);
    }
  };

  const handleResendCode = async ({ username }: ResendSignUpCodeInput) => {
    try {
      await resendSignUpCode({ username });
      Toast("Verification code resent successfully");
    } catch (error) {
      console.warn("Error resending code:", error);
      Toast(`Verification code resent successfully: ${error}`);
    }
  };
  async function currentAuthenticatedUser() {
    try {
      const { accessToken, idToken } = (await fetchAuthSession()).tokens ?? {};
      const exp = accessToken?.payload.exp;
      if (exp && exp < Date.now()) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const Toast = (msg: string) => {
    Platform.OS === "ios"
      ? Alert.alert(msg)
      : ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const cleanSignUpFlow = () => {
    setSignUpFlow(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        onSignIn,
        onSignOut,
        currentAuthenticatedUser,
        onSignUp,
        handleSignUpConfirmation,
        signUpFlow,
        handleResendCode,
        Toast,
        cleanSignUpFlow,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
