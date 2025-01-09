import { Image, View } from 'react-native';
import { Button, Text, TextInput, Dialog, Portal, Paragraph } from 'react-native-paper';
import * as React from 'react';
import styles from '../assets/styles';

import { useNavigation } from '@react-navigation/native';

import { handleLogin } from '../api/authFunctions';

const LoginScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [visible, setVisible] = React.useState(false); // Controle de visibilidade do Dialog

  const navigation = useNavigation();
  
  const onLoginPress = async () => {
    setIsLoading(true);
    const success = await handleLogin(email, password, setError);
    setIsLoading(false);

    if (!success) {
      setError('Credenciais inválidas. Tente novamente.'); // Exemplo de mensagem de erro
      setVisible(true); // Exibe o Dialog em caso de erro
    }
  };

  React.useEffect(() => {
    if (email && password) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  const hideDialog = () => setVisible(false); // Função para esconder o Dialog

  return (
    <View style={styles.container}>
      <Image style={{ height: 100, width: 200, alignSelf: 'center', marginBottom: 20 }} resizeMode='cover' source={require('../assets/img/logo.png')}/>

      <TextInput
        style={styles.textInput}
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        mode="outlined"
      />

      <TextInput
        style={styles.textInput}
        label="Senha"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
        mode="outlined"
        right={<TextInput.Icon icon="eye" />}
      />

      <Button
        loading={isLoading}
        disabled={isDisabled || isLoading}
        style={styles.button}
        mode="contained"
        onPress={onLoginPress}
      >
        {isLoading ? 'Entrando' : 'Entrar'}
      </Button>

      <Button style={styles.button} mode="outlined" onPress={() => navigation.navigate('Register')}>
        Criar conta
      </Button>

      <Button style={styles.button} mode="text" onPress={() => navigation.navigate('Recovery')}>
        Esqueci minha senha
      </Button>

      <Portal>
        <Dialog style={styles.dialog} visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Erro</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{error}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Fechar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default LoginScreen;