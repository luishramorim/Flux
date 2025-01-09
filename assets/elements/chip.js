import React, { useState } from 'react';
import { Chip } from 'react-native-paper';
import styles from '../styles';

import theme from '../theme';

const ChipView = ({ 
  text = "Example Chip", 
  icon = "information", 
  onPress = () => {}, 
  customStyle = {} 
}) => {
  const [selected, setSelected] = useState(false);

  const handlePress = () => {
    setSelected(!selected);
    onPress();
  };

  const handleClose = () => {
    setSelected(false);
  };

  return (
    <Chip
        mode='outlined'
      style={[
        styles.chip, 
        customStyle, 
        selected ? { backgroundColor: theme.colors.inversePrimary } : {}
      ]}
      icon={icon}
      onPress={handlePress}
      onClose={selected ? handleClose : undefined}
      selected={selected}
    >
      {text}
    </Chip>
  );
};

export default ChipView;