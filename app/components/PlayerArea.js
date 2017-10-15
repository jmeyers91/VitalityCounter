import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import IconButton from './IconButton';

const { width : windowWidth, height : windowHeight } = Dimensions.get('window');
const iconColor = 'rgba(255,255,255,0.8)';
const iconSize = 50;

export default class PlayerArea extends Component {
  render() {
    const { player, flipped, onPlusPress, onMinusPress } = this.props;
    let leftIconName;
    let rightIconName;
    let leftButtonCallback;
    let rightButtonCallback;
    let lifeTextStyle;

    if(flipped) {
      leftIconName = 'minus';
      leftButtonCallback = onMinusPress;
      rightIconName = 'plus';
      rightButtonCallback = onPlusPress;
      lifeTextStyle = styles.flippedLifeText;
    } else {
      leftIconName = 'plus';
      leftButtonCallback = onPlusPress;
      rightIconName = 'minus';
      rightButtonCallback = onMinusPress;
      lifeTextStyle = styles.lifeText;
    }

    return (
      <View style={[styles.container, {backgroundColor: player.color}]}>
        <View style={styles.counterRow}>
          <IconButton color={iconColor} size={iconSize} iconName={leftIconName} onPress={leftButtonCallback}/>
          <Text style={lifeTextStyle}>{player.life}</Text>
          <IconButton color={iconColor} size={iconSize} iconName={rightIconName} onPress={rightButtonCallback}/>
        </View>
      </View>
    );
  }
}

const lifeText = {
  color: '#FFF',
  fontSize: 120
};

const flippedLifeText = {
  ...lifeText,
  transform: [
    {rotate: '180deg'}
  ]
};

const styles = StyleSheet.create({
  lifeText,
  flippedLifeText,
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  counterRow: {
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
});
