import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import colors from '../utils/colors';
import Input from '../components/Input';
import {heightRes, widthRes} from '../utils/responsive';
import Button from '../components/Button';
import textStyle from '../utils/textStyle';
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch} from 'react-redux';
import {saveUser} from '../redux/slice/user/userSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const emailRegex = RegExp(
    /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
  );
  const tescomRegex = RegExp(/^([0-9]{4})[A-Z]{2}$/);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [genderError, setGenderError] = useState('');
  const [openTown, setOpenTown] = useState(false);
  const [valueTown, setValueTown] = useState(null);
  const [townError, setTownError] = useState('');
  const [uploaded, setUploaded] = useState(false);

  const [items, setItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ]);

  const [town, setTown] = useState([
    {
      label: 'Nkpunano',
      value: 'Nkpunano',
    },
    {
      label: 'Ajuonu Obimo',
      value: 'Ajuonu Obimo',
    },
    {
      label: 'Uzo-Uwani',
      value: 'Uzo-Uwani',
    },
    {
      label: 'Nsukka',
      value: 'Nsukka',
    },
    {
      label: 'Odemgbo',
      value: 'Odemgbo',
    },
    {
      label: 'Edem Ani',
      value: 'Edem Ani',
    },
    {
      label: 'Alor-Uno',
      value: 'Alor-Uno',
    },
    {
      label: 'Obukpa',
      value: 'Obukpa',
    },
    {
      label: 'Agu-Umabor',
      value: 'Agu-Umabor',
    },
    {
      label: 'Umabor',
      value: 'Umabor',
    },
    {
      label: 'Ede Oballa',
      value: 'Ede Oballa',
    },
    {
      label: 'Eha-Ndiagu',
      value: 'Eha-Ndiagu',
    },
    {
      label: 'Ezebunagu',
      value: 'Ezebunagu',
    },
    {
      label: 'Amaho Ibagwa Ani',
      value: 'Amaho Ibagwa Ani',
    },
    {
      label: 'Okpuje',
      value: 'Okpuje',
    },
    {
      label: 'Opi Agu',
      value: 'Opi Agu',
    },
    {
      label: 'Nkofi Edem - Ani',
      value: 'Nkofi Edem - Ani',
    },
    {
      label: 'Opi',
      value: 'Opi',
    },
    {
      label: 'Okutu',
      value: 'Okutu',
    },
    {
      label: 'Odenigbo',
      value: 'Odenigbo',
    },
    {
      label: 'Ede-Enu',
      value: 'Ede-Enu',
    },
  ]);

  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    tescom: '',
  });

  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    tescom: '',
  });

  const onChange = useCallback(
    (name, value) => {
      setError(prev => ({...prev, [name]: ''}));
      setDetails(prev => ({...prev, [name]: value}));
    },
    [details],
  );

  const errorHandler = useCallback(
    (name, value) => {
      setError(prev => ({...prev, [name]: value}));
    },
    [details],
  );

  const handleSubmit = () => {
    if (details.firstName.length < 2) {
      return errorHandler('firstName', 'Enter a valid first name');
    }
    if (details.lastName.length < 2) {
      return errorHandler('lastName', 'Enter a valid last name');
    }
    if (!emailRegex.test(details.email)) {
      return errorHandler('email', 'Enter a valid Email');
    }
    if (details.phoneNumber.length < 11) {
      return errorHandler('phoneNumber', 'Enter a valid Phone Number');
    }
    if (!tescomRegex.test(details.tescom)) {
      return errorHandler('tescom', 'Enter a valid Tescom Number');
    }
    if (value === null) {
      return setGenderError('Select your Gender');
    }
    if (valueTown === null) {
      return setTownError('Select your Town');
    }
    if (details.password.length < 6) {
      return errorHandler(
        'password',
        'Password must be more than 6 characters',
      );
    }
    const data = {
      firstName: details.firstName,
      lastName: details.lastName,
      email: details.email,
      phoneNumber: details.phoneNumber,
      gender: value,
      town: valueTown,
      password: details.password,
    };

    dispatch(saveUser(data));
    navigation.replace('Login');
  };

  const openDocument = async () => {
    setUploaded(true)
    DocumentPicker.pickSingle({
      type: [DocumentPicker.types.pdf],
    }).then(res => console.log(res));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center'}}
      showsVerticalScrollIndicator={false}>
      <Image
        source={require('../applogo.png')}
        style={{
          width: widthRes(40),
          height: widthRes(20),
          resizeMode: 'contain',
        }}
      />
      <View style={{width: '100%'}}>
        <Text style={styles.text}>First Name</Text>
        <Input
          error={error.firstName}
          onChange={text => onChange('firstName', text)}
        />
        <Text style={styles.text}>Last Name</Text>
        <Input
          error={error.lastName}
          onChange={text => onChange('lastName', text)}
        />
        <Text style={styles.text}>Email</Text>
        <Input error={error.email} onChange={text => onChange('email', text)} />
        <Text style={styles.text}>Phone Number</Text>
        <Input
          keyboardType="numeric"
          error={error.phoneNumber}
          onChange={text => onChange('phoneNumber', text)}
          maxlength={11}
        />
        <Text style={styles.text}>Tescom Number</Text>
        <Input
          keyboardType="numeric"
          error={error.tescom}
          onChange={text => onChange('tescom', text)}
          maxlength={6}
          placeholder={'4444AA'}
        />

        <Text style={styles.text}>Gender</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={value => {
            setOpen(value), setGenderError('');
          }}
          setValue={setValue}
          setItems={setItems}
          placeholder="Select your gender"
          style={{
            borderWidth: 1,
            borderColor: colors.gray,
          }}
          dropDownDirection="TOP"
        />
        {genderError && <Text style={styles.error}>{genderError}</Text>}
        <Text style={styles.text}>Town</Text>
        <DropDownPicker
          open={openTown}
          value={valueTown}
          items={town}
          setOpen={value => {
            setOpenTown(value), setTownError('');
          }}
          setValue={setValueTown}
          setItems={setTown}
          placeholder="Select your Town"
          style={{
            borderWidth: 1,
            borderColor: colors.gray,
          }}
          searchable
          dropDownDirection="TOP"
          flatListProps={{
            nestedScrollEnabled: true,
          }}
        />

        {townError && <Text style={styles.error}>{townError}</Text>}
        <Text style={styles.text}>Password</Text>
        <Input
          error={error.password}
          onChange={text => onChange('password', text)}
          secure
        />
        <Text style={styles.text}>Upload your certificate</Text>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            padding: heightRes(3),
            alignSelf: 'flex-start',
            borderRadius: 20,
            borderColor: colors.gray,
          }}
          onPress={openDocument}>
          <Ionicons name="md-duplicate" size={widthRes(8)} />
        </TouchableOpacity>
        {uploaded && (
          <Text style={[styles.text, {color: 'green'}]}>
            Certificate uploaded
          </Text>
        )}
        <Text
          style={{
            textAlign: 'right',
            ...textStyle.defaultRegularFootnote,
            marginTop: heightRes(1),
          }}>
          Already have an account?{' '}
          <Text
            style={{color: colors.primary}}
            onPress={() => navigation.goBack()}>
            Sign In
          </Text>
        </Text>
      </View>
      <Button
        title="Register"
        containerStyle={{
          marginVertical: heightRes(5),
        }}
        click={handleSubmit}
      />
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: colors.white,
    padding: heightRes(3),
  },
  text: {
    ...textStyle.defaultBoldSubheadline,
    marginTop: heightRes(2),
    marginBottom: heightRes(0.7),
  },
  error: {
    ...textStyle.defaultRegularFootnote,
    color: colors.red,
    marginTop: 5,
  },
});
