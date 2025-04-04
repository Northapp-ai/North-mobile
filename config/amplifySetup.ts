import { Amplify } from 'aws-amplify';
import awsConfig from './aws-exports';

let isConfigured = false;

export const configureAmplify = () => {
  if (isConfigured) return;

  Amplify.configure({
    ...awsConfig,
  });

  isConfigured = true;
};
