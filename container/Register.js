import React, { Component } from 'react';
import {
    AsyncStorage,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Picker,
    ImageBackground
} from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            gender: null,
            birthdate: null,
        }
    }
     registerAccount() {
    const {
      username,
      password,
      gender,
      birthdate
    } = this.state;

    if (!username || !password || !gender || !birthdate) {
      alert("Form input is empty")
    } else if (username.length <= 5) {
      alert("Username should at least 5 characters");
    } else if (password.length < 8) {
      alert("Password should at least 8 characters");
    } else {
      const body = {
        "username": username,
        "password": password,
        "gender": gender,
        "birthdate": birthdate
      }

      console.log(JSON.stringify(body));

      fetch('https://ngc-todo.herokuapp.com/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then(data => {
          console.log("sukses: " + JSON.stringify(data))
          if (data.success == true) {
            const navigateAction = NavigationActions.navigate({
              routeName: 'Login',
              action: NavigationActions.navigate({ routeName: 'Login' }),
            });
            this.props.navigation.dispatch(navigateAction);
          } else {
            if (data.message.includes("username already exists")) {
              alert("Username already exists");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../assets/bc_login.png')} style={styles.back_login}>
                    <Text style={{ color: 'brown', fontSize: 40, fontWeight: 'bold', alignSelf: 'center', marginBottom: 10 }}>REGISTER</Text>
                    <View style={{ backgroundColor: 'black', marginRight: 20, marginLeft: 20, opacity: 0.5, marginBottom: 20 }}>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            placeholder="Username"
                            style={{ color: 'black', fontSize: 16 }}
                            multiline={true}
                            maxLength={30}
                            onChangeText={(username) => this.setState({ username })}
                        />
                    </View>
                    <View style={{ backgroundColor: 'black', marginRight: 20, marginLeft: 20, opacity: 0.5, marginBottom: 20 }}>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            placeholder="Password"
                            multiline={true}
                            style={{ color: 'black', fontSize: 16 }}
                            maxLength={30}
                            onChangeText={(password) => this.setState({ password })}
                        />
                    </View>
                    <View style={{ backgroundColor: 'black', marginRight: 20, marginLeft: 20, opacity: 0.5, marginBottom: 20 }}>
                        <Picker
                            style={{ marginLeft: 25 }}
                            selectedValue={this.state.gender}
                            onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}>
                            <Picker.Item label="Gender" />
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                        </Picker>
                    </View>
                    <View style={{ backgroundColor: 'black', marginRight: 20, marginLeft: 20, opacity: 0.5, marginBottom: 20 }}>
                        <DatePicker
                            style={{ width: 205 }}
                            date={this.state.birthdate}
                            mode="date"
                            format="MM-DD-YYYY"
                            placeholder="Select Date"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(text) => { this.setState({ birthdate: text }) }}
                        />
                    </View>
                    <TouchableOpacity style={{ backgroundColor: 'black', marginRight: 20, marginLeft: 20, alignItems: 'center' }} onPress={()=> this.registerAccount()}>
                        <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', marginTop: 15, marginBottom: 15 }}>REGISTER</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    back_login: {
        height: '100%',
        width: '100%',
        justifyContent: 'center'

    },
    Input: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        opacity: 0.6
    }
});