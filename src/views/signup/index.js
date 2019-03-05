import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground } from "react-native";
import { Input, Button } from "react-native-elements";
import { useMutation } from "react-apollo-hooks";

import { useNavigation } from "react-navigation-hooks";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-community/async-storage";

import Icon from "react-native-vector-icons/FontAwesome";
import { validateEmail } from "../../utils";
const BG_IMAGE = require("../../../assets/images/bg_screen2.jpg");
import { MutationButton } from "../../shared";
import { SIGN_UP_MUTATION } from "./queries";
import styles from "./styles";

const SignUp = props => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmedPassword, setconfirmedPassword] = useState("");

  const { navigate } = useNavigation();
  const signUpMutation = useMutation(SIGN_UP_MUTATION, {
    variables: { email, password, username: email }
  });

  const submitLoginCredentials = () => {
    signUpMutation()
      .then(data => {
        AsyncStorage.setItem("token", data.signUp.token);
        navigate("Home");
      })
      .catch(err => {
        const message = `${err.message}`.toString();
        const error = message.replace("GraphQL error", "Error");
        // console.log("mess", error);
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
        <View style={styles.loginView}>
          <View style={styles.loginTitle}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.travelText}>SOCIAL</Text>
              <Text style={styles.plusText}>+</Text>
            </View>
            <View style={{ marginTop: -30 }}>
              <Text style={styles.travelText}>APP</Text>
            </View>
          </View>
          <View style={styles.loginInput}>
            <Input
              leftIcon={
                <Icon name="user-o" color="rgba(171, 189, 219, 1)" size={25} />
              }
              containerStyle={{ marginVertical: 10 }}
              onChangeText={email => setEmail(email)}
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
                setEmailValid(validateEmail(email));
                this.passwordInput.focus();
              }}
              blurOnSubmit={false}
              placeholderTextColor="white"
              errorStyle={{ textAlign: "center", fontSize: 12 }}
              errorMessage={
                emailValid ? null : "Please enter a valid email address"
              }
            />
            <Input
              leftIcon={
                <Icon name="lock" color="rgba(171, 189, 219, 1)" size={25} />
              }
              containerStyle={{ marginVertical: 10 }}
              onChangeText={password => setPassword(password)}
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
                <Icon name="lock" color="rgba(171, 189, 219, 1)" size={25} />
              }
              containerStyle={{ marginVertical: 10 }}
              onChangeText={confirmedPassword =>
                setconfirmedPassword(confirmedPassword)
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
              errorMessage={
                password === confirmedPassword ? null : "Password not match"
              }
            />
          </View>
          <MutationButton
            title="SIGN UP"
            onPress={() => submitLoginCredentials()}
            height={50}
          />
          <View style={styles.footerView}>
            <Text style={{ color: "grey" }}>Already signed up?</Text>
            <Button
              title="Login an Account"
              clear
              activeOpacity={0.5}
              titleStyle={{ color: "white", fontSize: 15 }}
              containerStyle={{ marginTop: -10 }}
              onPress={() => navigate("Login")}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

SignUp.propTypes = {
  navigation: PropTypes.object
};

export default SignUp;
