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
    ImageBackground,
    ToastAndroid
} from 'react-native';
import Api from './Api';
//import Register from './Register';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
        }
    }
    login() {
        this.setState({
      isLoading: true
    })

    const {
      username,
      password
    } = this.state;

    if (!username || !password) {
      alert("Username and password is empty")
      this.setState({
        isLoading: false
      });
    } else {
      const body = {
        "username": username,
        "password": password
      }

      fetch('https://ngc-todo.herokuapp.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then(data => {
          const param = data.data;
          if (data.success == true) {
              alert("Success")
              this.props.navigation.navigate('Home')
            this.props.navigation.dispatch(resetAction);
          } else {
            this.setState({
              isLoading: false
            }); // loading
            alert('Login failed');
          }
        })
        .catch((error) => {
          this.setState({
            isLoading: false
          }); // loading
          console.log(error);
        });
    }
    }

test() {
    alert(this.state.username)
}
render() {
    //  console.log(this.state.Username)
    const { navigator } = this.props;
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/bc_login.png')} style={styles.back_login}>
                <View style={{ backgroundColor: 'black', marginRight: 20, marginLeft: 20, opacity: 0.5, marginBottom: 20 }}>
                    <TextInput
                        underlineColorAndroid={'transparent'}
                        placeholder="Username"
                        multiline={true}
                        style={{ color: 'black', fontSize: 16 }}
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
                <TouchableOpacity style={{ backgroundColor: 'black', marginRight: 20, marginLeft: 20, alignItems: 'center' }} onPress={() => this.login()}>
                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold', marginTop: 15, marginBottom: 15 }}>LOGIN</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', marginTop: 8 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>Don't have account ? </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}><Text style={{ color: 'blue' }}>Sing Up !</Text></TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    back_login: {
        flex: 1,
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