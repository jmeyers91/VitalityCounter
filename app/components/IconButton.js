import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default function IconButton({ iconName, onPress, style, size=50, color='rgba(255,255,255,0.8)' }) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Icon name={iconName} size={size} color={color}/>
    </TouchableOpacity>
  );
}
