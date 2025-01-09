import { View } from 'react-native';
import * as React from 'react';
import { Appbar, Button, Text, TextInput, Dialog, Portal, Paragraph } from 'react-native-paper';

import styles from '../assets/styles';
import { handlePasswordReset } from '../api/authFunctions';
import { useNavigation } from '@react-navigation/native';

const RecoveryScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = React.useState('');
    const [visible, setVisible] = React.useState(false); 
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleRecovery = async () => {
        try {
            await handlePasswordReset(email);
            setVisible(true);
        } catch (error) {
            setErrorMessage(error.message || 'Erro ao recuperar senha. Verifique o e-mail digitado.');
        }
    };

    const hideDialog = () => {
        setVisible(false);
        navigation.navigate('Login'); 
    };

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Recuperar senha" />
            </Appbar.Header>

            <View style={styles.container}>
                <Text style={{ alignSelf: 'center', marginBottom: 20 }} variant="headlineSmall">
                    Digite o seu email para recuperar a sua senha
                </Text>

                <TextInput
                    style={styles.textInput}
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                />

                <Button mode="contained" style={styles.button} onPress={handleRecovery}>
                    Recuperar senha
                </Button>

                <Button style={styles.button} onPress={() => navigation.goBack()}>
                    Voltar
                </Button>

                {errorMessage ? (
                    <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
                        {errorMessage}
                    </Text>
                ) : null}

                <Portal>
                    <Dialog style={styles.dialog} visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Sucesso</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>
                                Um e-mail de recuperação foi enviado para {email}. Verifique sua caixa de entrada.
                            </Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button style={styles.button} mode='contained' onPress={hideDialog}>Voltar</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </>
    );
};

export default RecoveryScreen;