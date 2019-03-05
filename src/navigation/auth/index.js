import { createStackNavigator } from "react-navigation";
import SignUp from "../../views/signup";
import Login from "../../views/login";

const AuthStack = createStackNavigator(
  {
    SignUp: {
      screen: SignUp,
      navigationOptions: ({ navigation }) => ({
        title: "Sign Up",
        header: null
      })
    },
    Login: {
      screen: Login,
      navigationOptions: ({ navigation }) => ({
        title: "Sign In",
        header: null
      })
    }
  },
  {
    initialRouteName: "SignUp"
  }
);

export default AuthStack;
