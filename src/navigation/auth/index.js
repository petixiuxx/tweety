import { createStackNavigator } from "react-navigation";
import SignUp from "../../views/signup";
import Login from "../../views/login";

const AuthStack = createStackNavigator(
  {
    SignUp: {
      screen: SignUp
    },
    Login: {
      screen: Login
    }
  },
  {
    initialRouteName: "SignUp"
  }
);

export default AuthStack;
