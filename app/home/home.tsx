import { Alert, Button, Text, View } from "react-native";
import { signOut } from "../auth/services/authServices";
import { useRouter } from "expo-router";

export default function home() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      Alert.alert('Sesión cerrada', 'Has cerrado sesión exitosamente');
      router.replace('/auth/login')
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo cerrar sesión');
    }
  };
return (
  <View
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{padding:20}}> Welcome to North App!</Text>
    <Button title="Cerrar Sesión" onPress={handleLogout} />
  </View>
);
}
