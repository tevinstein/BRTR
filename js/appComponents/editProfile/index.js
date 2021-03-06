
import React, { Component } from 'react';
import { BackAndroid, Image, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Icon,
    Footer,
    FooterTab,
    Card,
    CardItem,
    Input,
    InputGroup,
} from 'native-base';

import {updateProfile} from '../../actions/updateProfile';
import uploader from '../../helper/uploader'
import FooterNav from '../footer'
var ImagePicker = require('react-native-image-picker');

var options = {
    title: 'Select Avatar',
    customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

import styles from './styles';
import ArizTheme from '../../themes/additemtheme'
import myTheme from '../../themes/base-theme';
import decode from 'jwt-decode'

class ProfileDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: false,
            tab3: true,
            dataUser: {},
            messages: [],
            avatarSource: this.props.route.avatar,
            newPassword: '',
            token: ''
        };
    }

    uploadImage() {
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {

            }
            else if (response.error) {

            }
            else if (response.customButton) {

            }
            else {
                const source = {uri: response.uri, isStatic: true};
                uploader(source, (res)=> {
                    this.setState({
                        avatarSource: res.postResponse.location
                    });
                })

            }
        });
    }

    saveProfile(e) {
        e.preventDefault()
        let newPassword = this.state.newPassword
        if (newPassword) {
            newPassword = this.state.newPassword.trim()
        }
        let photo = this.state.avatarSource
        if (!photo) {
          Alert.alert(
              'Change Password Failed',
              'Please add an avatar to proceed changing password',
              [
                  {text: 'OK'},
              ]
          )
        }

        this.props.updateProfile(newPassword, photo, this.props.token, this.props.navigator)
        this.setState({
            newPassword: '',
            photo: '',
        })
    }


    render() {
        const {navigator} = this.props

        return (
            <Container theme={myTheme} style={styles.container}>
                <Header>
                    <Button transparent onPress={() => navigator.pop()}>
                        <Icon name="ios-arrow-back" />
                    </Button>
                    <Title style={{alignSelf: 'center'}}>EDIT PROFILE</Title>
                    <Button transparent>
                        <Text style={{color:'black'}}>...</Text>
                    </Button>

                </Header>

                <Content>
                    <Card style={{ flex: 0, backgroundColor: '#1E1E1E', borderWidth: 0 }}>
                        <CardItem
                            style={{borderBottomWidth: 0, marginTop: 20}}
                            onPress={this.uploadImage.bind(this)}>
                            <Image
                                style={{resizeMode: 'cover',  alignSelf: 'center', width: 200, height: 200, borderRadius: 200, borderWidth: 2, borderColor: '#6CF9C8' }}
                                source={(this.state.avatarSource) ? {uri: this.state.avatarSource} : require('../../../img/img-placeholder.png')}
                            />
                        </CardItem>
                    </Card>

                    <InputGroup
                        style={{marginTop:40, marginLeft: 40, marginRight: 50}}
                        theme={ArizTheme} borderType='underline'>
                        <Input
                            onChangeText={(newPassword) => this.setState({newPassword: newPassword})}
                            value={this.state.newPassword}
                            style={{color: '#FFFFFF'}}
                            placeholder="New Password"
                            secureTextEntry/>
                    </InputGroup>

                    <Button
                        bordered style={{
                          alignSelf: 'center',
                          marginTop: 30,
                          marginBottom: 20 ,
                          width: 280,
                          borderRadius: 0,
                          borderColor:'#2effd0',
                          height: 50,
                          paddingTop: 0
                    }}
                        onPress={this.saveProfile.bind(this)}>
                        <Text style={{color: '#FFFFFF'}}>SAVE CHANGES</Text>
                    </Button>

                </Content>

                <Footer>
                    <FooterNav navigator={navigator} tab1={true} tab2={false} tab3={false}/>
                </Footer>

            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        updateProfile: (newPassword, photo, token, navigator) => dispatch(updateProfile(newPassword, photo, token, navigator)),
    };
}

export default connect(null, bindAction)(ProfileDetail);
