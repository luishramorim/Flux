import { signInWithEmailAndPassword } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth, firestore } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { sendEmailVerification } from "firebase/auth";

const handleLogin = async (email, password, setError) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      console.log('Usuário autenticado com sucesso!');
      console.log('Dados do usuário:');
      console.log(`UID: ${user.uid}`);
      console.log(`Email: ${user.email}`);
      console.log(`Display Name: ${user.displayName}`);
      console.log(`Foto de Perfil: ${user.photoURL}`);
  
      console.log('Dados do usuário salvos no AsyncStorage!');
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      setError('Falha no login. Verifique suas credenciais.');
    }
};

const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Usuário deslogado com sucesso!');
      console.log('Dados do usuário removidos do AsyncStorage!');
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
    }
};

const handleRegister = async (name, lastName, email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDocRef = doc(firestore, 'users', user.uid);

        await setDoc(userDocRef, {
            firstName: name,
            lastName: lastName,
            email: email,
            createdAt: serverTimestamp(),
        });

        console.log('Conta criada e dados salvos com sucesso!');
        return { success: true };
    } catch (error) {
        console.error('Erro ao criar conta:', error.message);
        throw error;
    }
};

const handlePasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        console.log(`E-mail de recuperação de senha enviado para ${email}`);
        return { success: true, message: 'E-mail de recuperação enviado com sucesso.' };
    } catch (error) {
        console.error('Erro ao enviar e-mail de recuperação:', error.message);
        throw error;
    }
};

const handleEmailVerification = async () => {
    try {
        const user = auth.currentUser;
        if (user) {
            await sendEmailVerification(user);
            console.log("E-mail de verificação enviado com sucesso!");
            return { success: true, message: "E-mail de verificação enviado com sucesso!" };
        } else {
            throw new Error("Nenhum usuário autenticado.");
        }
    } catch (error) {
        console.error("Erro ao enviar e-mail de verificação:", error.message);
        return { success: false, message: error.message };
    }
};

export { handleLogin, handleLogout, handleRegister, handlePasswordReset, handleEmailVerification };