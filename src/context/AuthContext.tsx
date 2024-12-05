import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { ReactNode, createContext, useState, useEffect, useMemo } from 'react';
import { auth, db } from '@/database/database';

interface AuthProviderProps {
    children: ReactNode;
}

type AuthContextData = {
    signed: boolean;
    loadingAuth: boolean;
    user: UserProps | null;
};

interface UserProps {
    uid: string;
    name: string | null;
    email: string | null;
    role: string | null;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {

                    const userDocRef = doc(db, 'users', firebaseUser.uid);
                    const userSnapshot = await getDoc(userDocRef);

                    if (userSnapshot.exists()) {
                        const userData = userSnapshot.data();
                        setUser({
                            uid: firebaseUser.uid,
                            name: userData.name || firebaseUser.displayName || null,
                            email: userData.email || firebaseUser.email || null,
                            role: userData.role || null,
                        });
                    } else {
                        console.error('Documento do usuário não encontrado no Firestore.');
                        setUser({
                            uid: firebaseUser.uid,
                            name: firebaseUser.displayName ?? null,
                            email: firebaseUser.email ?? null,
                            role: null,
                        });
                    }
                } catch (error) {
                    console.error('Erro ao buscar dados do Firestore:', error);
                    setUser(null);
                } finally {
                    setLoadingAuth(false);
                }
            } else {
                setUser(null);
                setLoadingAuth(false);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const contextValue = useMemo(() => ({
        signed: !!user,
        loadingAuth,
        user,
    }), [user, loadingAuth]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
