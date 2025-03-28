import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Controller, UseFormReturn } from 'react-hook-form';
import { ValidateCodeForm } from '../models/signUpSchema';

interface Props {
  form: UseFormReturn<ValidateCodeForm>;
  email: string,
  errorMessage?: string;
  onConfirm: () => void;
}

export const ValidateOtp = ({ form, email, errorMessage, onConfirm }: Props) => {
  const { control, formState: { errors } } = form;

  return (
    <>
      <Text style={{ marginBottom: 10, color: '#666' }}>
        Hemos enviado un código a: <Text style={{ fontWeight: 'bold' }}>{email}</Text>
      </Text>
      <Controller
        name="code"
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.code && styles.errorBorder]}
              placeholder="Código de confirmación"
              keyboardType="number-pad"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor="#aaa"
            />
            {errors.code && <Text style={styles.fieldError}>{errors.code.message}</Text>}
          </View>
        )}
      />

      {errorMessage && <Text style={styles.generalError}>{errorMessage}</Text>}

      <TouchableOpacity style={styles.button} onPress={onConfirm}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
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
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: '#555',
  },
});
