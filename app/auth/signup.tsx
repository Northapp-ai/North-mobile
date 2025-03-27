import React, { useState } from 'react';
import { Text, TextInput, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { signUp, confirmSignUp } from './services/authServices';
import { SignUpForm } from './models/types';

const SignUp = () => {

  const [form, setForm] = useState<SignUpForm>({
    email: '',
    password: '',
    name: '',
    lastName: '',
    code: '',
  });

  const [step, setStep] = useState<'signUp' | 'confirm'>('signUp');

  const router = useRouter();

  const handleChange = (key: keyof SignUpForm, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSignUp = async () => {
    const { email, password, name, lastName } = form;

    if (!email || !password || !name || !lastName) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      await signUp(form);
      Alert.alert('Verifica tu correo', 'Revisa tu email y escribe el código de verificación');
      setStep('confirm');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al registrarse');
    }
  };

  const handleConfirmSignUp = async () => {
    if (!form.code) {
      Alert.alert('Error', 'Por favor ingresa el código de confirmación');
      return;
    }

    try {
      await confirmSignUp(form.email, form.code);
      Alert.alert('Éxito', 'Cuenta confirmada correctamente');
      router.replace('/auth/login');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al confirmar el registro');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro</Text>

      {step === 'signUp' ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={form.name}
            onChangeText={(value) => handleChange('name', value)}
            autoCapitalize="words"
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={form.lastName}
            onChangeText={(value) => handleChange('lastName', value)}
            autoCapitalize="words"
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={form.email}
            onChangeText={(value) => handleChange('email', value)}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={form.password}
            onChangeText={(value) => handleChange('password', value)}
            secureTextEntry
            placeholderTextColor="#aaa"
          />

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>Confirmar Registro</Text>
          <TextInput
            style={styles.input}
            placeholder="Código de confirmación"
            value={form.code}
            onChangeText={(value) => handleChange('code', value)}
            keyboardType="number-pad"
            placeholderTextColor="#aaa"
          />

          <TouchableOpacity style={styles.button} onPress={handleConfirmSignUp}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
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
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#333',
  },
  button: {
  backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 32,
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
