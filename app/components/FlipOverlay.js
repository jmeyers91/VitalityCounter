import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');
const animationDuration = 300;

export default class FlipOverlay extends Component {
  spinInterval = null;
  state = {
    opacity: new Animated.Value(0),
    topValue: 0,
    bottomValue: 0,
  };

  getRandomValue() {
    return Math.floor(Math.random() * 100);
  }

  spin() {
    let changeCount = 0;
    const interval = this.spinInterval = setInterval(() => {
      const topValue = this.getRandomValue();
      const bottomValue = this.getRandomValue();
      const done = changeCount >= 20 && topValue !== bottomValue;
      this.setState({done, topValue, bottomValue});
      if(done) {
        this.stopSpin();
      }
      changeCount++;
    }, 10);
  }

  stopSpin() {
    if(this.spinInterval !== null) {
      clearInterval(this.spinInterval);
      this.spinInterval = null;
    }
  }

  componentWillReceiveProps(nextProps) {
    // const { opacity } = this.state;
    //
    if(!this.props.open && nextProps.open) {
      this.spin();
      // Animated.timing(opacity, {toValue: 1, duration: animationDuration}).start();
    } else if(this.props.open && !nextProps.open) {
      // Animated.timing(opacity, {toValue: 0, duration: animationDuration}).start();
    }
  }

  render() {
    const { topValue, bottomValue, done } = this.state;
    const { open, onClose } = this.props;
    const topTextStyle = done ? (topValue > bottomValue ? styles.winnerText : styles.loserText) : styles.text;
    const bottomTextStyle = done ? (topValue > bottomValue ? styles.loserText : styles.winnerText) : styles.text;
    if(!open) return null;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.touchable} onPress={onClose}>
          <View style={styles.top}>
            <Text style={[topTextStyle, styles.flipped]}>{topValue}</Text>
          </View>
          <View style={styles.bottom}>
            <Text style={bottomTextStyle}>{bottomValue}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const side = {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};
const text = {
  fontSize: 120,
  color: '#FFF',
  textAlign: 'center'
};
const styles = StyleSheet.create({
  text,
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 3
  },
  touchable: {
    flex: 1
  },
  winnerText: {
    ...text,
    color: '#0C0'
  },
  loserText: {
    ...text,
    color: '#C00'
  },
  flipped: {
    transform: [
      {rotate: '180deg'}
    ]
  },
  top: {
    ...side
  },
  bottom: {
    ...side
  }
});
