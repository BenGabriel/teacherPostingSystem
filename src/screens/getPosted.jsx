import {FlatList, Modal, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../utils/colors';
import {heightRes, widthRes} from '../utils/responsive';
import AllSchools from '../utils/schools';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/Button';
import textStyle from '../utils/textStyle';
import Loader from '../components/loader';
import {saveSchool} from '../redux/slice/user/userSlice';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const GetPosted = () => {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [schools, setSchools] = useState([]);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posted, setPosted] = useState(null);

  const getAllSchools = () => {
    const withOutTown = AllSchools.filter(t => t.Town !== user.town);
    const maleAndFemaleRatio =
      user.gender === 'Male'
        ? withOutTown.filter(t => t.male < t.Female)
        : withOutTown.filter(t => t.male > t.Female);

    setSchools(maleAndFemaleRatio);
  };
  useEffect(() => {
    getAllSchools();
  }, []);

  const handleClick = () => {
    setModal(true);
    setLoading(true);

    const randomSchool = schools[Math.floor(Math.random() * schools.length)];
    dispatch(
      saveSchool({
        ...randomSchool,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      }),
    );
    setPosted(randomSchool);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const close = () => {
    setModal(false);
    navigation.replace('MyJob');
  };
  return (
    <View style={styles.container}>
      <Text style={[textStyle.defaultBoldBody, {textAlign: 'center', paddingBottom: heightRes(2)}]}>
        Available Schools
      </Text>
      <FlatList
        data={schools}
        renderItem={({item}) => (
          <Text
            style={[
              textStyle.defaultRegularSubheadline,
              {paddingVertical: heightRes(1.5)},
            ]}>
            {item.Schoolname}
          </Text>
        )}
      />
      <Button title="Post Me" click={handleClick} />
      <Modal visible={modal} style={{flex: 1}}>
        {loading ? (
          <Loader state={loading} />
        ) : (
          <View style={styles.modalContent}>
            <Ionicons
              name="checkmark-circle"
              color="green"
              size={widthRes(20)}
              style={{marginVertical: heightRes(1)}}
            />
            <Text style={textStyle.defaultRegularBody}>
              Congratulations you have been posted to
            </Text>
            <Text
              style={[
                textStyle.defaultBoldBody,
                {marginVertical: heightRes(1)},
              ]}>
              {posted?.Schoolname}
            </Text>
            <Button
              title="Proceed"
              click={close}
              containerStyle={{
                width: '80%',
                marginTop: heightRes(4),
              }}
            />
          </View>
        )}
      </Modal>
    </View>
  );
};

export default GetPosted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: heightRes(2),
  },
  modalContent: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
