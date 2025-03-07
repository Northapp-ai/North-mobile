// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return <Stack />;
// }



import { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { getCurrentUser } from './auth/services/authServices';

export default function RootLayout() {
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
          // const user = await getCurrentUser();
        const user = undefined;
        if (user === 0) {
          console.log('User:', user);
          router.replace('/home/home');
        } else {
          router.replace('/auth/login');
        }
      } catch (error) {
        console.log('No user found',error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (isLoading) return null;

  return <Stack/>;
}
