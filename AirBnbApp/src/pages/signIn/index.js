import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {StatusBar, ActivityIndicator} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import api from '../../services/api';

import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
} from './styles';

export default class SignIn extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
  };

  handleEmailChange = email => {
    this.setState({email});
  };

  handlePasswordChange = password => {
    this.setState({password});
  };

  handleCreateAccountPress = () => {
    this.props.navigation.navigate('SignUp');
  };

  handleSignInPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState(
        {error: 'Preencha usuário e senha para continuar!'},
        () => false,
      );
    } else {
      try {
        const response = await api.post('/sessions', {
          email: this.state.email,
          password: this.state.password,
        });
        this.setState({
          loading: true,
        });
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {
                name: 'Main',
                params: response.data.token,
              },
            ],
          }),
        );
      } catch (_err) {
        this.setState({
          loading: false,
          error: 'Houve um problema com o login, verifique suas credenciais!',
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
        <Logo
          source={require('../../images/airbnb_logo.png')}
          resizeMode="contain"
        />
        <Input
          placeholder="Endereço de e-mail"
          value={this.state.email}
          onChangeText={this.handleEmailChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Senha"
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        {this.state.error.length !== 0 && (
          <ErrorMessage>{this.state.error}</ErrorMessage>
        )}
        <Button onPress={this.handleSignInPress}>
          {this.state.loading === false ? (
            <>
              <ButtonText>Entrar</ButtonText>
            </>
          ) : (
            <ActivityIndicator size={24} color="white" />
          )}
        </Button>
        <SignUpLink onPress={this.handleCreateAccountPress}>
          <SignUpLinkText>Criar conta grátis</SignUpLinkText>
        </SignUpLink>
      </Container>
    );
  }
}
