import React, { Component } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import IconButton from './IconButton';

const iconColor = 'rgba(255,255,255,0.9)';
const iconSize = 30;
const iconName = 'options';
const animationDuration = 300;

export default class DividerMenu extends Component {
  static defaultProps = {
    openHeight: 75,
    opacity: 0,
  };
  state = {
    height: new Animated.Value(0),
    opacity: new Animated.Value(0)
  };

  componentWillReceiveProps(nextProps) {
    const { openHeight } = this.props;
    const { height, opacity } = this.state;
    if(this.props.open && !nextProps.open) {
      Animated.parallel([
        Animated.timing(height, {toValue: 0, duration: animationDuration}),
        Animated.timing(opacity, {toValue: 0, duration: 0}),
      ]).start();
    } else if(!this.props.open && nextProps.open) {
      Animated.parallel([
        Animated.timing(height, {toValue: openHeight, duration: animationDuration}),
        Animated.timing(opacity, {toValue: 1, duration: animationDuration}),
      ]).start();
    }
  }

  render() {
    const { height, opacity } = this.state;
    const { open, onToggle, children } = this.props;

    return (
      <View style={styles.container}>
        <IconButton style={styles.button} onPress={onToggle} size={iconSize} color={iconColor} iconName={iconName}/>
        <Animated.View style={{height, opacity}}>
          <View style={styles.content}>
            {children}
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  content: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  button: {
    position: 'absolute',
    zIndex: 2,
    alignSelf: 'center',
    top: -(iconSize / 2)
  }
});
