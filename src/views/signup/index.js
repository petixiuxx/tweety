import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions
} from "react-native";
import { Input, Button } from "react-native-elements";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-community/async-storage";

import Icon from "react-native-vector-icons/FontAwesome";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const BG_IMAGE = require("../../../assets/images/bg_screen2.jpg");

export default class SignUp extends Component {
  static navigationOptions = {
    title: "Sign Up",
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      email: "",
      email_valid: true,
      password: "",
      confirmedPassword: "",
      login_failed: false,
      showLoading: false
    };
  }

  async componentDidMount() {
    this.setState({ fontLoaded: true });
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  }

  async submitLoginCredentials() {
    const { showLoading } = this.state;

    this.setState({
      showLoading: !showLoading
    });
    await AsyncStorage.setItem("userToken", "test");
    this.props.navigation.navigate("Home");
  }

  render() {
    const {
      email,
      password,
      email_valid,
      showLoading,
      confirmedPassword
    } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          {this.state.fontLoaded ? (
            <View style={styles.loginView}>
              <View style={styles.loginTitle}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.travelText}>SOCIAL</Text>
                  <Text style={styles.plusText}>+</Text>
                </View>
                <View style={{ marginTop: -10 }}>
                  <Text style={styles.travelText}>APP</Text>
                </View>
              </View>
              <View style={styles.loginInput}>
                <Input
                  leftIcon={
                    <Icon
                      name="user-o"
                      color="rgba(171, 189, 219, 1)"
                      size={25}
                    />
                  }
                  containerStyle={{ marginVertical: 10 }}
                  onChangeText={email => this.setState({ email })}
                  value={email}
                  inputStyle={{ marginLeft: 10, color: "white" }}
                  keyboardAppearance="light"
                  placeholder="Email"
                  autoFocus={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  ref={input => (this.emailInput = input)}
                  onSubmitEditing={() => {
                    this.setState({ email_valid: this.validateEmail(email) });
                    this.passwordInput.focus();
                  }}
                  blurOnSubmit={false}
                  placeholderTextColor="white"
                  errorStyle={{ textAlign: "center", fontSize: 12 }}
                  errorMessage={
                    email_valid ? null : "Please enter a valid email address"
                  }
                />
                <Input
                  leftIcon={
                    <Icon
                      name="lock"
                      color="rgba(171, 189, 219, 1)"
                      size={25}
                    />
                  }
                  containerStyle={{ marginVertical: 10 }}
                  onChangeText={password => this.setState({ password })}
                  value={password}
                  inputStyle={{ marginLeft: 10, color: "white" }}
                  secureTextEntry={true}
                  keyboardAppearance="light"
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="done"
                  ref={input => (this.passwordInput = input)}
                  blurOnSubmit={true}
                  placeholderTextColor="white"
                />
                <Input
                  leftIcon={
                    <Icon
                      name="lock"
                      color="rgba(171, 189, 219, 1)"
                      size={25}
                    />
                  }
                  containerStyle={{ marginVertical: 10 }}
                  onChangeText={confirmedPassword =>
                    this.setState({ confirmedPassword })
                  }
                  value={confirmedPassword}
                  inputStyle={{ marginLeft: 10, color: "white" }}
                  secureTextEntry={true}
                  keyboardAppearance="light"
                  placeholder="Confirmed Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="done"
                  ref={input => (this.confirmedPasswordInput = input)}
                  blurOnSubmit={true}
                  placeholderTextColor="white"
                />
              </View>
              <Button
                title="SIGN UP"
                activeOpacity={1}
                underlayColor="transparent"
                onPress={this.submitLoginCredentials.bind(this)}
                loading={showLoading}
                loadingProps={{ size: "small", color: "white" }}
                disabled={!email_valid && password.length < 8}
                buttonStyle={{
                  height: 50,
                  width: 250,
                  backgroundColor: "transparent",
                  borderWidth: 2,
                  borderColor: "white",
                  borderRadius: 30
                }}
                containerStyle={{ marginTop: 30 }}
                titleStyle={{ fontWeight: "bold", color: "white" }}
              />
              <View style={styles.footerView}>
                <Text style={{ color: "grey" }}>Already signed up?</Text>
                <Button
                  title="Login an Account"
                  clear
                  activeOpacity={0.5}
                  titleStyle={{ color: "white", fontSize: 15 }}
                  containerStyle={{ marginTop: -10 }}
                  onPress={() => this.props.navigation.navigate("Login")}
                />
              </View>
            </View>
          ) : (
            <Text>Loading...</Text>
          )}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  loginView: {
    marginTop: 100,
    backgroundColor: "transparent",
    width: 250,
    height: 400
  },
  loginTitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  travelText: {
    color: "white",
    fontSize: 30,
    fontFamily: "bold"
  },
  plusText: {
    color: "white",
    fontSize: 30,
    fontFamily: "regular"
  },
  loginInput: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  footerView: {
    marginTop: 20,
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center"
  }
});

SignUp.propTypes = {
  navigation: PropTypes.object
};
