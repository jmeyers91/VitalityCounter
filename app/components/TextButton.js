import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function TextButton({ children, onPress, style, size=50, color='rgba(255,255,255,0.8)'}) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={{color, fontSize: size}}>{children}</Text>
    </TouchableOpacity>
  );
}
