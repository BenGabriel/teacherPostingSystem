import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../utils/colors';
import {heightRes, widthRes} from '../utils/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import textStyle from '../utils/textStyle';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {rejectPosting} from '../redux/slice/user/userSlice';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

const MyJob = () => {
  const navigation = useNavigation();
  const {school, rejected} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const reject = () => {
    dispatch(rejectPosting());
    navigation.replace('Home');
  };

  const ts = `border: 1px solid #dddddd; text-align: left; padding: 8px;`
  async function printPDF() {
    const results = await RNHTMLtoPDF.convert({
      html: `
      <html>
      <head>
      <style>
      
      td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }
      td:nth-child(odd){
        font-weight: bold;

      }
      
      tr {
        background-color: #f3f3f3;
      }
      </style>
      </head>
      <body>
      
      <h2>Teacher Posting Printout</h2>
      
      <table style="font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;">
        <tr>
          <td>Name</td>
          <td>${school?.firstName} ${school?.lastName}</td>
        </tr>
        <tr>
          <td>Phone Number</td>
          <td>${school?.phoneNumber}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>${school?.email}</td>
        </tr>
        <tr>
          <td>School Address</td>
          <td>${school?.Address}</td>
        </tr>
        <tr>
          <td>School Town</td>
          <td>${school?.Town}</td>
        </tr>
        <tr>
          <td>School Name</td>
          <td>${school?.Schoolname}</td>
        </tr>
      </table>
      
      </body>
      </html>`,
      fileName: 'test',
      base64: true,
    });

    await RNPrint.print({filePath: results.filePath});
  }
  return (
    <View style={styles.container}>
      <Ionicons
        name="chevron-back-outline"
        size={widthRes(6)}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Ionicons
          name="bonfire"
          size={widthRes(10)}
          color={colors.primary}
          style={{marginVertical: heightRes(3)}}
        />
        <View style={{flex: 1, alignSelf: 'center'}}>
          <View style={styles.item}>
            <Text
              style={[textStyle.defaultRegularSubheadline, {color: '#808080'}]}>
              Name
            </Text>
            <Text style={styles.itemText}>
              {school?.firstName} {school?.lastName}
            </Text>
          </View>
          <View style={styles.item}>
            <Text
              style={[textStyle.defaultRegularSubheadline, {color: '#808080'}]}>
              Phone Number
            </Text>
            <Text style={styles.itemText}>{school?.phoneNumber}</Text>
          </View>
          <View style={styles.item}>
            <Text
              style={[textStyle.defaultRegularSubheadline, {color: '#808080'}]}>
              Email
            </Text>
            <Text style={styles.itemText}>{school?.email}</Text>
          </View>
          <View style={styles.item}>
            <Text
              style={[textStyle.defaultRegularSubheadline, {color: '#808080'}]}>
              School Address
            </Text>
            <Text style={styles.itemText}>{school?.Address}</Text>
          </View>
          <View style={styles.item}>
            <Text
              style={[textStyle.defaultRegularSubheadline, {color: '#808080'}]}>
              School Town
            </Text>
            <Text style={styles.itemText}>{school?.Town}</Text>
          </View>
          <View style={styles.item}>
            <Text
              style={[textStyle.defaultRegularSubheadline, {color: '#808080'}]}>
              School Name
            </Text>
            <Text style={styles.itemText}>{school?.Schoolname}</Text>
          </View>
          <TouchableOpacity style={styles.print} onPress={printPDF}>
            <Ionicons name="print" size={widthRes(7)} />
          </TouchableOpacity>
        </View>
        {rejected === 3 ? (
          <View style={styles.error}>
            <Text
              style={[
                textStyle.defaultRegularFootnote,
                {color: '#CF4F66', textAlign: 'center'},
              ]}>
              You have exceeded the amount of times you can reject
            </Text>
          </View>
        ) : (
          <Button
            title="Reject Job"
             click={reject}
          />
        )}
      </View>
    </View>
  );
};

export default MyJob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: heightRes(2),
  },
  content: {
    flex: 1,
    marginVertical: heightRes(1),
    borderRadius: 15,
    alignItems: 'center',
    elevation: 2,
    shadowOffset: {width: 2, height: 2},
    shadowColor: colors.black,
    shadowOpacity: 0.4,
    shadowRadius: 3,
    backgroundColor: colors.white,
    paddingVertical: heightRes(3),
    paddingHorizontal: heightRes(2),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: heightRes(1),
  },
  itemText: [
    textStyle.defaultBoldSubheadline,
    {
      width: '62%',
      textAlign: 'right',
    },
  ],
  error: {
    backgroundColor: '#FFE5EB',
    width: '100%',
    padding: heightRes(1),
    borderRadius: 10,
    marginVertical: heightRes(3),
  },
  print:{
    alignSelf:'flex-end',
    marginVertical: heightRes(4)
  }
});
