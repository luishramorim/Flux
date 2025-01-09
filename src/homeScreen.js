import { Image, View, Platform, ScrollView } from 'react-native';
import * as React from 'react';
import { Appbar, List, Searchbar } from 'react-native-paper';

import styles from '../assets/styles';
import Fab from '../assets/elements/fab';
import ReminderCard from '../assets/elements/reminderCard';
import ChipView from '../assets/elements/chip';

import { handleLogout } from '../api/authFunctions';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchBarVisible, setSearchBarVisible] = React.useState(false);
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const toggleSearchBar = () => {
    setSearchBarVisible((prevState) => !prevState);
  };

  return (
    <>
      <Appbar.Header>
        <Image
          style={{ height: 50, width: 100 }}
          resizeMode="cover"
          source={require('../assets/img/logo.png')}
        />
        <Appbar.Content title="" />
        {Platform.select({
          web: (
            searchBarVisible ? (
              <Searchbar
                style={{ marginRight: 10 }}
                placeholder="Buscar"
                onChangeText={setSearchQuery}
                value={searchQuery}
              />
            ) : (
              <Appbar.Action icon="magnify" onPress={toggleSearchBar} />
            )
          ),
          default: (
            <>
              <Appbar.Action
                icon={searchBarVisible ? "close" : "magnify"}
                onPress={toggleSearchBar}
              />
              <Appbar.Action icon="account" onPress={() => {}} />
            </>
          ),
        })}
      </Appbar.Header>

      {Platform.OS !== 'web' && searchBarVisible && (
        <View style={styles.searchView}>
          <Searchbar
            style={styles.searchbar}
            placeholder="Buscar"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
      )}
      <View style={styles.background}>
        <ScrollView horizontal contentContainerStyle={styles.chipContainer} showsHorizontalScrollIndicator={false}>
          <ChipView 
            text="Todos" 
            icon="home" 
            onPress={() => console.log('Chip 1 pressed')} 
          />

          <ChipView 
            text="Registros" 
            icon="clock" 
            onPress={() => console.log('Chip 1 pressed')} 
          />

          <ChipView 
            text="Lembretes" 
            icon="bell" 
            onPress={() => console.log('Chip 1 pressed')} 
          />
        </ScrollView>
      </View>
            
        <ScrollView style={styles.cardView}>
          <List.Accordion
            title="Registros"
            left={props => <List.Icon {...props} icon="clock" />}
            expanded={expanded}
            onPress={handlePress}>
              <ReminderCard />
              <ReminderCard />
              <ReminderCard />
              <ReminderCard />
              <ReminderCard />
              <ReminderCard />
              <ReminderCard />
              <ReminderCard />
              <ReminderCard />
          </List.Accordion>
          <View style={{ marginBottom: 100 }}/>
        </ScrollView>

      <View style={styles.container}>
        <Fab />
      </View>
    </>
  );
};

export default HomeScreen;