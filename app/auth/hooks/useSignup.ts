import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp, confirmSignUp } from '../services/authServices';
import { signUpSchema, SignUpForm, ValidateCodeForm, validateCodeSchema } from '../models/signUpSchema';

export const useSignUpForm = () => {
  const [step, setStep] = useState<'signUp' | 'confirm'>('signUp');
  const [generalError, setGeneralError] = useState('');
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      password: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const form = watch();
  const email = form.email;

  const onSignUp = async (data: SignUpForm) => {
    setGeneralError('');
    try {
      await signUp(data);
      setStep('confirm');
    } catch (error: any) {
      setGeneralError(error.message || 'Error al registrarse');
    }
  };

  const validateCodeForm = useForm<ValidateCodeForm>({
    resolver: zodResolver(validateCodeSchema),
    defaultValues: { code: '' },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onConfirm = async (data: ValidateCodeForm, email: string) => {
    setGeneralError('');
    try {
      const response = await confirmSignUp(email, data.code);
      console.log('response confirmSignUp', JSON.stringify(response));
      if (!response.error) {
      router.replace('/auth/login');
      }
      return response

    } catch (error: any) {
      setGeneralError(error.message || 'Error al confirmar el registro');
      throw error;
    }
  };

  return {
    control,
    handleSubmit,
    onSignUp,
    onConfirm,
    errors,
    generalError,
    step,
    validateCodeForm,
    email
  };
};

export default useSignUpForm;