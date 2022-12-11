import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../utils/colors';
import { widthRes } from '../utils/responsive';

const Loader = ({state}) => {
  return (
    state ? 
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator animating={state} color={colors.primary} size={widthRes(9)}/>
    </View> : <></>
  );
};

export default Loader;

const styles = StyleSheet.create({});
