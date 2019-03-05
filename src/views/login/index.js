import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground } from "react-native";
import { Input, Button } from "react-native-elements";
import PropTypes from "prop-types";
import { useNavigation } from "react-navigation-hooks";
import { useMutation } from "react-apollo-hooks";

import Icon from "react-native-vector-icons/FontAwesome";

import { MutationButton } from "../../shared";
const BG_IMAGE = require("../../../assets/images/bg_screen1.jpg");
import { validateEmail } from "../../utils";
import styles from "./styles";

const Login = props => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const { navigate } = useNavigation();

  const submitLoginCredentials = () => {
    navigate("Home");
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
            <View style={{ marginTop: -10 }}>
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
          </View>
          <MutationButton
            title="LOG IN"
            onPress={() => submitLoginCredentials()}
            height={50}
          />
          <View style={styles.footerView}>
            <Text style={{ color: "grey" }}>New here?</Text>
            <Button
              title="Create an Account"
              clear
              activeOpacity={0.5}
              titleStyle={{ color: "white", fontSize: 15 }}
              containerStyle={{ marginTop: -10 }}
              onPress={() => navigate("SignUp")}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

Login.propTypes = {
  navigation: PropTypes.object
};

export default Login;
