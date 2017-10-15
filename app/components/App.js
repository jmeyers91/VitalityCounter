import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PlayerArea from './PlayerArea';
import IconButton from './IconButton';
import TextButton from './TextButton';
import DividerMenu from './DividerMenu';
import FlipOverlay from './FlipOverlay';

const initialLife = 20;

export default class App extends Component {
  state = {
    menuOpen: false,
    initialLifeMenuOpen: false,
    flipOverlayOpen: false,
    initialLife: initialLife,
    players: {
      'player1': {id: 'player1', life: initialLife, color: '#800'},
      'player2': {id: 'player2', life: initialLife, color: '#080'},
    }
  };

  handleFlipOverlayOpen = () => this.setState({flipOverlayOpen: true, menuOpen: false});
  handleFlipOverlayClose = () => this.setState({flipOverlayOpen: false});
  handleMenuToggle = () => this.setState(({menuOpen, initialLifeMenuOpen}) => ({menuOpen: !menuOpen, initialLifeMenuOpen: !menuOpen && initialLifeMenuOpen}));
  handleChangeInitialLife = () => this.setState(({initialLifeMenuOpen}) => ({initialLifeMenuOpen: !initialLifeMenuOpen}));
  resetPlayerLife = (newInitialLife) => this.setState(({players, initialLife}) => ({
    menuOpen: false,
    initialLifeMenuOpen: false,
    initialLife: newInitialLife || initialLife,
    players: {
      player1: {...players.player1, life: newInitialLife || initialLife},
      player2: {...players.player2, life: newInitialLife || initialLife},
    }
  }));

  lifeChangeHandler = (playerId, n) => () => this.setState({
    players: {
      ...this.state.players,
      [playerId]: {
        ...this.state.players[playerId],
        life: this.state.players[playerId].life + n
      }
    }
  });
  player1PlusHandler = this.lifeChangeHandler('player1', 1);
  player1MinusHandler = this.lifeChangeHandler('player1', -1);
  player2PlusHandler = this.lifeChangeHandler('player2', 1);
  player2MinusHandler = this.lifeChangeHandler('player2', -1);

  renderMenu() {
    const { initialLifeMenuOpen } = this.state;
    if(initialLifeMenuOpen) {
      return [
        <View key="initialLife20Button" style={styles.menuItem}><TextButton onPress={this.resetPlayerLife.bind(null, 20)}>20</TextButton></View>,
        <View key="initialLife30Button" style={styles.menuItem}><TextButton onPress={this.resetPlayerLife.bind(null, 30)}>30</TextButton></View>,
        <View key="initialLife40Button" style={styles.menuItem}><TextButton onPress={this.resetPlayerLife.bind(null, 40)}>40</TextButton></View>,
      ];
    }
    return [
      <View key="resetButton" style={styles.menuItem}><IconButton iconName="reload" size={25} onPress={() => this.resetPlayerLife()}/></View>,
      <View key="changeLifeButton" style={styles.menuItem}><IconButton iconName="heart" size={25} onPress={this.handleChangeInitialLife}/></View>,
      <View key="flipOverlayButton" style={styles.menuItem}><TextButton onPress={this.handleFlipOverlayOpen} size={25}>Flip</TextButton></View>,
    ];
  }

  render() {
    const { players, menuOpen, flipOverlayOpen } = this.state;
    const { player1, player2 } = players;

    return (
      <View style={styles.container}>
        <PlayerArea flipped player={player1}
          onPlusPress={this.player1PlusHandler}
          onMinusPress={this.player1MinusHandler}
        />
        <DividerMenu open={menuOpen} onToggle={this.handleMenuToggle} openHeight={50}>
          {this.renderMenu()}
        </DividerMenu>
        <PlayerArea player={player2}
          onPlusPress={this.player2PlusHandler}
          onMinusPress={this.player2MinusHandler}
        />
        <FlipOverlay open={flipOverlayOpen} onClose={this.handleFlipOverlayClose}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#333',
  },
  menuItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
