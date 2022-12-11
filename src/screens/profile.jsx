import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../utils/colors';
import {heightRes, widthRes} from '../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import textStyle from '../utils/textStyle';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Profile = () => {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.user);
  return (
    <View style={styles.container}>
      <Ionicons
        name="chevron-back-outline"
        size={widthRes(6)}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.topText}>PS</Text>
      <View style={styles.contentContainer}>
        <View>
          <View style={styles.content}>
            <Ionicons name="person-circle-outline" size={widthRes(7)} />
            <Text style={styles.contentText}>Full name</Text>
          </View>
          <Text style={styles.contentDetail}>
            {user.firstName} {user.lastName}
          </Text>
        </View>
        <View>
          <View style={styles.content}>
            <Ionicons name="mail" size={widthRes(7)} />
            <Text style={styles.contentText}>Email</Text>
          </View>
          <Text style={styles.contentDetail}>{user.email}</Text>
        </View>
        <View>
          <View style={styles.content}>
            <Ionicons name="call" size={widthRes(7)} />
            <Text style={styles.contentText}>Phone number</Text>
          </View>
          <Text style={styles.contentDetail}>{user.phoneNumber}</Text>
        </View>
        <View>
          <View style={styles.content}>
            <Ionicons name="person" size={widthRes(7)} />
            <Text style={styles.contentText}>Gender</Text>
          </View>
          <Text style={styles.contentDetail}>{user.gender}</Text>
        </View>
        <View>
          <View style={styles.content}>
            <Ionicons name="home" size={widthRes(7)} />
            <Text style={styles.contentText}>Town</Text>
          </View>
          <Text style={styles.contentDetail}>{user.town}</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: heightRes(2),
  },
  topText: {
    ...textStyle.defaultBoldLargeTitle,
    textAlign: 'center',
    marginVertical: heightRes(5),
  },
  contentContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 4,
    shadowOffset: {width: 2, height: 2},
    shadowColor: colors.black,
    shadowOpacity: 0.4,
    shadowRadius: 3,
    padding: heightRes(3),
  },
  content: {
    marginTop: heightRes(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentText: [
    textStyle.defaultRegularSubheadline,
    {marginLeft: heightRes(1)},
  ],
  contentDetail: [textStyle.defaultBoldHeadline, {marginTop: heightRes(1)}],
});
