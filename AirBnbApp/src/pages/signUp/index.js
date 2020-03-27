import React, {Component} from 'react';
import {StatusBar, ActivityIndicator} from 'react-native';

import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions, NavigationActions} from 'react-navigation';

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
    error: '',
    loading: false,
    modalVisible: false,
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
        {error: 'Preencha usuário e senha para continuar!'},
        () => false,
      );
    } else {
      try {
        this.setState({
          loading: true,
        });
        await api.post('/users', {
          username: this.state.email,
          email: this.state.email,
          password: this.state.password,
        });

        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'SignIn'})],
        });
        this.props.navigation.dispatch(resetAction);
      } catch (_err) {
        this.setState({
          loading: false,
          error:
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
        {this.state.error.length !== 0 && (
          <ErrorMessage>{this.state.error}</ErrorMessage>
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
