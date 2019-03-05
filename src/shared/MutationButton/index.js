import {
  Animated,
  ColorPropType,
  Easing,
  StyleSheet,
  TouchableWithoutFeedback
} from "react-native";
import PropTypes from "prop-types";
import React from "react";

const getValue = (pressed, disabled) => {
  const base = disabled ? 0.5 : 1;
  const delta = disabled ? 0.1 : 0.3;

  return pressed ? base - delta : base;
};

export default class MutationButton extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    height: PropTypes.number,
    color: ColorPropType,
    fontSize: PropTypes.number,
    borderRadius: PropTypes.number,
    style: PropTypes.object
  };

  static defaultProps = {
    onPress: () => {},
    disabled: false,
    height: null,
    color: "#fff",
    fontSize: 16,
    borderRadius: 100,
    style: {}
  };

  constructor(props) {
    super(props);

    const { disabled } = props;

    this.state = { pressed: false };
    this.value = new Animated.Value(getValue(false, disabled));
  }

  updateValue(nextProps, nextState) {
    if (
      this.props.disabled !== nextProps.disabled ||
      this.state.pressed !== nextState.pressed
    ) {
      Animated.timing(this.value, {
        duration: 200,
        toValue: getValue(nextState.pressed, nextProps.disabled),
        easing: Easing.out(Easing.quad)
      }).start();
    }
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    this.updateValue(nextProps, nextState);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextState) {
    this.updateValue(nextProps, nextState);
  }

  handlePressIn = () => {
    this.setState({ pressed: true });
  };

  handlePressOut = () => {
    this.setState({ pressed: false });
  };

  render() {
    const {
      props: { title, onPress, color, height, borderRadius, fontSize, style }
    } = this;

    const animatedColor = this.value.interpolate({
      inputRange: [0, 1],
      outputRange: ["black", color]
    });

    const animatedScale = this.value.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1]
    });

    const containerStyle = {
      borderColor: animatedColor,
      borderRadius,
      height,
      transform: [{ scale: animatedScale }]
    };

    const titleStyle = {
      color: animatedColor,
      fontSize
    };

    return (
      <TouchableWithoutFeedback
        onPress={onPress}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
      >
        <Animated.View style={[styles.container, style, containerStyle]}>
          <Animated.Text style={[styles.title, titleStyle]}>
            {title}
          </Animated.Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderWidth: 2,
    marginTop: 80,
    width: 150,
    backgroundColor: "transparent",
    borderColor: "white",
    borderRadius: 30
  },
  title: {
    backgroundColor: "transparent",
    fontSize: 16
  }
});
