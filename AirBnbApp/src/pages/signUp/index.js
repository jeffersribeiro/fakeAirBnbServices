import React, {Component} from 'react';
import {StatusBar, ActivityIndicator} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Input,
  Container,
  Button,
  ButtonText,
  Logo,
  ErrorMessage,
} from './styles';

export default class SignUp extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    username: '',
    email: '',
    password: '',
    message: '',
    loading: false,
  };

  handleUsernameChange = username => {
    this.setState({username});
  };

  handleEmailChange = email => {
    this.setState({email});
  };

  handlePasswordChange = password => {
    this.setState({password});
  };

  handleSignInPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState(
        {message: 'Preencha usuário e senha para continuar!'},
        () => false,
      );
    } else {
      try {
        this.setState({
          loading: true,
        });
        await api.post('/users', {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        });
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'SignIn',
              },
            ],
          }),
        );
      } catch (_err) {
        this.setState({
          loading: false,
          message:
            'Houve um problema com o Resgistro da conta, verifique suas credenciais!',
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
        <Logo
          source={require('../../images/airbnb-capa.png')}
          resizeMode="contain"
        />
        <Input onChangeText={this.handleUsernameChange} placeholder="name" />
        <Input onChangeText={this.handleEmailChange} placeholder="E-mail" />
        <Input
          onChangeText={this.handlePasswordChange}
          placeholder="Password"
          secureTextEntry={true}
        />
        {this.state.message.length !== 0 && (
          <ErrorMessage>{this.state.message}</ErrorMessage>
        )}
        <Button onPress={this.handleSignInPress}>
          {this.state.loading === false ? (
            <>
              <ButtonText>Resgistrar</ButtonText>
            </>
          ) : (
            <ActivityIndicator size={24} color="white" />
          )}
        </Button>
      </Container>
    );
  }
}
