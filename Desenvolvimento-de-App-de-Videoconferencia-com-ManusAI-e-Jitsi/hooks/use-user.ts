import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  id: string;
  username: string;
  createdAt: string;
}

const STORAGE_KEY = "talkbridge_user";

/**
 * Hook para gerenciar autenticação local e persistência de utilizador.
 * Retorna o utilizador atual, função para fazer login e função para fazer logout.
 */
export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar utilizador do AsyncStorage ao montar
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Erro ao carregar utilizador:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string) => {
    try {
      // Gerar ID único para o utilizador
      const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const newUser: User = {
        id,
        username: username.trim(),
        createdAt: new Date().toISOString(),
      };

      // Guardar no AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      setUser(newUser);
      return newUser;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    }
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: user !== null,
  };
}
