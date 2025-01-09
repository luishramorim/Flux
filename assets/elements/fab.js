import * as React from 'react';
import { FAB, Portal } from 'react-native-paper';

const Fab = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? 'close' : 'plus'}
          actions={[
            {
              icon: 'clock',
              label: 'Novo registro',
              onPress: () => console.log('Pressed register'),
            },
            {
              icon: 'bell',
              label: 'Novo lembrete',
              onPress: () => console.log('Pressed reminder'),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              
            }
          }}
        />
      </Portal>
  );
};

export default Fab;