import * as React from 'react';
import { View, Alert } from 'react-native';
import { Appbar, Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { handleRegister } from '../api/authFunctions';
import styles from '../assets/styles';

const RegisterScreen = () => {
    const navigation = useNavigation();

    const [name, setName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleCreateAccount = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem!");
            return;
        }

        try {
            setLoading(true);
            await handleRegister(name, lastName, email, password);
            Alert.alert("Sucesso", "Conta criada com sucesso!");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Erro", "Falha ao criar conta. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Criar conta" />
            </Appbar.Header>

            <View style={styles.container}>
                <TextInput 
                    style={styles.textInput}
                    label='Nome'
                    value={name}
                    onChangeText={setName}
                    mode='outlined'
                />
                <TextInput 
                    style={styles.textInput}
                    label='Sobrenome'
                    value={lastName}
                    onChangeText={setLastName}
                    mode='outlined'
                />
                <TextInput 
                    style={styles.textInput}
                    label='Email'
                    value={email}
                    onChangeText={setEmail}
                    mode='outlined'
                />
                <TextInput 
                    style={styles.textInput}
                    label='Senha'
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    mode='outlined'
                    right={<TextInput.Icon icon="eye" />}
                />
                <TextInput 
                    style={styles.textInput}
                    label='Confirmar senha'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    mode='outlined'
                    right={<TextInput.Icon icon="eye" />}
                />
                <Button 
                    style={styles.button} 
                    mode='contained' 
                    onPress={handleCreateAccount} 
                    loading={loading}
                >
                    Criar conta
                </Button>  
                <Button style={styles.button} onPress={() => navigation.goBack()}>
                    Voltar
                </Button>  
            </View>  
        </>
    );
};

export default RegisterScreen;