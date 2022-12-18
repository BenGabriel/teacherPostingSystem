import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../utils/colors';
import textStyle from '../utils/textStyle';
import {heightRes, widthRes} from '../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../redux/slice/user/userSlice';

const Home = () => {
  const navigation = useNavigation();
  const {school, user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text
        style={[textStyle.defaultBoldTitle3, {marginTop: heightRes(3)}]}
        onPress={() => {
          dispatch(logoutUser()), navigation.replace('Login');
        }}>
        Welcome {user?.firstName},
      </Text>
      <View style={styles.top}>
        <Ionicons name="bonfire" size={widthRes(7)} color={colors.primary} />
        <Text style={[textStyle.defaultBoldBody, {marginLeft: 10}]}>
          Teacher Recruitment Portal
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.content}
          activeOpacity={0.6}
          onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={widthRes(10)} />
          <Text style={styles.contentText}>Profile</Text>
        </TouchableOpacity>
        {school === null ? (
          <TouchableOpacity
            style={styles.content}
            activeOpacity={0.6}
            onPress={() => navigation.navigate('GetPosted')}>
            <Ionicons name="briefcase" size={widthRes(10)} />
            <Text style={styles.contentText}>Get Posted</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.content}
            activeOpacity={0.6}
            onPress={() => navigation.navigate('MyJob')}>
            <Ionicons name="medal" size={widthRes(10)} />
            <Text style={styles.contentText}>My Job</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.content} activeOpacity={0.6}>
          <MaterialIcons name="support-agent" size={widthRes(10)} />
          <Text style={styles.contentText}>Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: heightRes(2.5),
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: heightRes(4),
  },
  content: {
    width: '46%',
    marginVertical: heightRes(1),
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowOffset: {width: 2, height: 2},
    shadowColor: colors.black,
    shadowOpacity: 0.4,
    shadowRadius: 3,
    backgroundColor: colors.white,
    paddingVertical: heightRes(3),
  },
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: heightRes(2),
  },
  contentText: {
    ...textStyle.defaultRegularSubheadline,
    marginTop: heightRes(1),
  },
});
