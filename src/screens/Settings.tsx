import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Paragraph, Switch, TouchableRipple } from 'react-native-paper';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import AppHeader from '../components/AppHeader';
import { AppState } from '../store/root';
import { setDarkMode } from '../store/settings/settings.actions';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

type Props = {
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => any;
};

const Settings: React.FC<Props> = ({ darkMode, setDarkMode }) => {
  return (
    <SafeAreaView>
      <AppHeader title={'Ρυθμίσεις'} showBack={true} />
      <TouchableRipple
        onPress={() => {
          setDarkMode(!darkMode);
        }}>
        <View style={styles.row}>
          <Paragraph>Σκούρο θέμα</Paragraph>
          <View pointerEvents="none">
            <Switch value={darkMode} />
          </View>
        </View>
      </TouchableRipple>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: AppState) => ({
  darkMode: state.settings.darkMode,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setDarkMode: (enabled: boolean) => dispatch(setDarkMode(enabled)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
