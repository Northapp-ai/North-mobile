import { Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, View, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { Controller } from 'react-hook-form';
import { useSignUpForm } from './hooks/useSignup';
import { ValidateOtp } from './components/validateOtp';
import { ValidateCodeForm } from './models/signUpSchema';
import { router } from 'expo-router';

const SignUp = () => {
  const { control, email, handleSubmit, onSignUp, onConfirm, generalError, step, validateCodeForm } = useSignUpForm();

  const onValidateCode = async (data: ValidateCodeForm) => {
    const response = await onConfirm(data, email);
    if (response.error) {
      return Alert.alert('Error', response.error.message || 'Error al confirmar el código');
    }
    router.replace(`/auth/login`);
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 0}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {step === 'signUp' ? (
          <>
            <Text style={styles.title}>Registro</Text>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, error && styles.errorBorder]}
                    placeholder="Nombre"
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor="#aaa"
                    onBlur={onBlur}
                  />
                  {error && <Text style={styles.fieldError}>{error.message}</Text>}
                </View>
              )}
            />

            <Controller
              name="lastName"
              control={control}
              render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, error && styles.errorBorder]}
                    placeholder="Apellido"
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor="#aaa"
                    onBlur={onBlur}
                  />
                  {error && <Text style={styles.fieldError}>{error.message}</Text>}
                </View>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, error && styles.errorBorder]}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor="#aaa"
                    onBlur={onBlur}
                  />
                  {error && <Text style={styles.fieldError}>{error.message}</Text>}
                </View>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={[styles.input, error && styles.errorBorder]}
                    placeholder="Contraseña"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor="#aaa"
                    onBlur={onBlur}
                  />
                  {error && <Text style={styles.fieldError}>{error.message}</Text>}
                </View>
              )}
            />

            {generalError ? <Text style={styles.generalError}>{generalError}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleSubmit(onSignUp)}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.title}>Confirmar email</Text>
            <ValidateOtp
              form={validateCodeForm}
              email={email}
              errorMessage={generalError}
              onConfirm={validateCodeForm.handleSubmit(onValidateCode)}
            />
          </>
        )}
      </ScrollView>

    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#555',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 12,
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#333',
  },
  errorBorder: {
    borderColor: 'red',
  },
  fieldError: {
    marginTop: 4,
    color: 'red',
    fontSize: 13,
  },
  generalError: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUp;
