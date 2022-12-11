import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {heightRes} from '../utils/responsive';
import colors from '../utils/colors';
import textStyle from '../utils/textStyle';

const Input = ({
  placeholder,
  value,
  onChange,
  keyboardType,
  error,
  secure,
  maxlength,
}) => {
  return (
    <>
      <View
        style={[
          styles.container,
          {
            borderColor: error ? colors.red : colors.gray,
          },
        ]}>
        <TextInput
          placeholder={placeholder}
          onChangeText={onChange}
          value={value}
          style={{flex: 1}}
          keyboardType={keyboardType ? keyboardType : 'default'}
          secureTextEntry={secure}
          maxLength={maxlength}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: '100%',
    height: 46,
    borderRadius: 10,
    paddingHorizontal: heightRes(1),
  },
  error: {
    ...textStyle.defaultRegularFootnote,
    color: colors.red,
    marginTop: 5,
  },
});
