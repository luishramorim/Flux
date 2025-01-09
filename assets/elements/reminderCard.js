import * as React from 'react'
import { Avatar, Card, IconButton } from 'react-native-paper';

import styles from '../styles';

const ReminderCard = () => {
  return (
    <Card style={styles.reminderCard}>
        <Card.Title
            title="Registro"
            subtitle="14:30"
            left={(props) => <Avatar.Icon {...props} icon="clock" />}
            right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
        />
    </Card>
  )
}

export default ReminderCard;