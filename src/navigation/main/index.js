import { createDrawerNavigator } from "react-navigation";
import Home from "../../views/home";
import Profile from "../../views/Profile";

const AppStack = createDrawerNavigator({
  Home: { screen: Home },
  Profile: { screen: Profile }
});
export default AppStack;
