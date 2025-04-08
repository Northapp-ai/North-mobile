import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { ValidateOtp } from "./components/validateOtp";
import useSignUpForm from "./hooks/useSignup";
import { ValidateCodeForm } from "./models/signUpSchema";
import useAuth from "./hooks/useAuth";
import { useAppStore } from "../store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msgError, setMsgError] = useState<string | undefined>(undefined);
  const [msgErrorCode, setMsgErrorCode] = useState<string | undefined>(
    undefined
  );
  const [showOtp, setShowOtp] = useState(false);
  const router = useRouter();

  const { onSingIn, onResendSignUpCode } = useAuth();
  const { validateCodeForm, onConfirm } = useSignUpForm();
  const setUser = useAppStore((state) => state.setUser);

  const handleLogin = async () => {
    setMsgError(undefined);
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      setMsgError("Por favor completa todos los campos");
      return;
    }
    try {
      const response = (await onSingIn({ email, password })) as any;
      setUser(response);
      if (response?.error?.name === "UserNotConfirmedException") {
        const responseResendCode = await onResendSignUpCode(email);
        if (responseResendCode.error) {
          Alert.alert(
            "Error",
            responseResendCode.error.message ||
              "Error al enviar el código de confirmación"
          );
          setMsgErrorCode(
            responseResendCode.error.message ||
              "Error al enviar el código de confirmación"
          );
          return;
        }
        setShowOtp(true);
        return;
      }
      // TODO: Guardar el token en el storage y la data de usuario en zustand
      router.replace(`/walkthrough/enter`);
    } catch (error: any) {
      setMsgError(error.message || "Error al iniciar sesión.");
    }
  };

  const handleConfirmCode = async (data: ValidateCodeForm) => {
    setMsgErrorCode(undefined);
    try {
      const response = await onConfirm(data, email);
      if (response?.error) {
        setMsgErrorCode(
          response.error.message || "Error al confirmar el código"
        );
        return;
      }
      setShowOtp(false);
    } catch (error: any) {
      console.log("error confirmSignUp test", JSON.stringify(error));
      setMsgErrorCode(error.name);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      {!showOtp && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="#aaa"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#aaa"
          />

          {msgError && <Text style={styles.fieldError}>{msgError}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/auth/signup")}>
            <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
        </>
      )}

      {showOtp && (
        <ValidateOtp
          email={email}
          onConfirm={validateCodeForm.handleSubmit(handleConfirmCode)}
          errorMessage={msgErrorCode}
          form={validateCodeForm}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#333",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    marginTop: 20,
    color: "#007bff",
    fontSize: 14,
  },
  fieldError: {
    marginTop: 4,
    color: "red",
    fontSize: 13,
  },
});

export default Login;
