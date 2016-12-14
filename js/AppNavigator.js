
import React, { Component } from 'react';
import { BackAndroid, StatusBar, NavigationExperimental, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';

import { closeDrawer } from './actions/drawer';

import Home from './appComponents/home/Home'
import ListItem from './appComponents/listItem/ListItem'
import ListItemCategory from './appComponents/listItemCategory/ListItemCategory'
import ItemDetail from './appComponents/itemDetail/ItemDetail'
import SearchItem from './appComponents/searchItem/SearchItem'
import ProfileEmpty from './appComponents/profileEmpty'
import ProfileDetail from './appComponents/profileDetail'
import AddItem from './appComponents/addItem'
import AskEmail from './appComponents/askEmail'
import CodeEmail from './appComponents/codeEmail'
import ListMessage from './appComponents/listMessage'
import MessageDetail from './appComponents/messageDetail'
import CreateMessage from './appComponents/createMessage'


// import Home from './components/home/';
import Anatomy from './components/anatomy/';
import NHBadge from './components/badge/';
import NHButton from './components/button/';
import NHCard from './components/card/';
import NHCardImage from './components/card/card-image';
import NHCardShowcase from './components/card/card-showcase';
import NHCardList from './components/card/card-list';
import NHCardHeaderAndFooter from './components/card/card-header-and-footer';
import NHCheckbox from './components/checkbox/';
import NHDeckSwiper from './components/deckswiper/';
import NHForm from './components/form/';
import NHIcon from './components/icon/';
import NHInputGroup from './components/inputgroup/';
import NHLayout from './components/layout/';
import NHList from './components/list/';
import NHBasicList from './components/list/basic-list';
import NHListDivider from './components/list/list-divider';
import NHListIcon from './components/list/list-icon';
import NHListAvatar from './components/list/list-avatar';
import NHListThumbnail from './components/list/list-thumbnail';
import NHPicker from './components/picker/';
import NHRadio from './components/radio/';
import NHSearchbar from './components/searchbar/';
import NHSpinner from './components/spinner/';
import NHTabs from './components/tabs/';
import NHThumbnail from './components/thumbnail/';
import NHTypography from './components/typography/';
import SplashPage from './components/splashscreen/';
import SideBar from './components/sidebar';
import statusBarColor from './themes/base-theme';
import LoginPage from './appComponents/loginPage';
import RegisterPage from './appComponents/registerPage';


import decode from 'jwt-decode'

const {
    popRoute,
} = actions;

const {
    CardStack: NavigationCardStack,
} = NavigationExperimental;

class AppNavigator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataUser: {},
            messages: [],
            token: ''
        }
    }

    static propTypes = {
        drawerState: React.PropTypes.string,
        popRoute: React.PropTypes.func,
        closeDrawer: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
            routes: React.PropTypes.array,
        }),
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            const routes = this.props.navigation.routes;

            if (routes[routes.length - 1].key === 'home') {
                return false;
            }

            this.props.popRoute(this.props.navigation.key);
            return true;
        });

        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        try {
            let token = await AsyncStorage.getItem("myKey");
            console.log("token: ", token)
            if (token !== null){
                this.setState({token: token})
                this.setState({dataUser: decode(token)});
                this._appendMessage('Recovered selection from disk: ' + token);
            } else {
                console.log("else")
                this._appendMessage('Initialized with no selection on disk.');
            }
        } catch (error) {
            console.log("catch")
            this._appendMessage('AsyncStorage error: ' + error.message);
        }
    }

    _appendMessage = (message) => {
        this.setState({messages: this.state.messages.concat(message)});
    };

    componentDidUpdate() {
        if (this.props.drawerState === 'opened') {
            this.openDrawer();
        }

        if (this.props.drawerState === 'closed') {
            this._drawer.close();
        }

    }

    popRoute() {
        this.props.popRoute();
    }

    openDrawer() {
        this._drawer.open();
    }

    _renderScene(props) { // eslint-disable-line class-methods-use-this

        switch (props.scene.route.key) {
            case 'splashscreen':
                return <SplashPage />;
            case 'anatomy':
                return <Anatomy />;
            case 'badge':
                return <NHBadge />;
            case 'button':
                return <NHButton />;
            case 'card':
                return <NHCard />;
            case 'cardImage':
                return <NHCardImage />;
            case 'cardShowcase':
                return <NHCardShowcase />;
            case 'cardList':
                return <NHCardList />;
            case 'cardHeaderAndFooter':
                return <NHCardHeaderAndFooter />;
            case 'checkbox':
                return <NHCheckbox />;
            case 'deckswiper':
                return <NHDeckSwiper />;
            case 'form':
                return <NHForm />;
            case 'icon':
                return <NHIcon />;
            case 'inputgroup':
                return <NHInputGroup />;
            case 'layout':
                return <NHLayout />;
            case 'list':
                return <NHList />;
            case 'basicList':
                return <NHBasicList />;
            case 'listDivider':
                return <NHListDivider />;
            case 'listIcon':
                return <NHListIcon />;
            case 'listAvatar':
                return <NHListAvatar />;
            case 'listThumbnail':
                return <NHListThumbnail />;
            case 'picker':
                return <NHPicker />;
            case 'radio':
                return <NHRadio />;
            case 'searchbar':
                return <NHSearchbar />;
            case 'spinner':
                return <NHSpinner />;
            case 'tabs':
                return <NHTabs />;
            case 'thumbnail':
                return <NHThumbnail />;
            case 'typography':
                return <NHTypography />;

            case 'home':
                return <Home />;
            case 'authPage':
                return <AuthPage />;
            case 'loginPage':
                return <LoginPage />;
            case 'registerPage':
                return <RegisterPage />;
            case 'itemDetail':
                return <ItemDetail />;
            case 'listItem':
                return <ListItem />;
            case 'listItemCategory':
                return <ListItemCategory />;
            case 'searchItem':
                return <SearchItem />;
            case 'profileEmpty':
                return <ProfileEmpty />;
            case 'profileDetail':
                return <ProfileDetail />;
            case 'addItem':
                return <AddItem />;
            case 'askEmail':
                return <AskEmail />;
            case 'codeEmail':
                return <CodeEmail />;
            case 'listMessage':
                return <ListMessage />
            case 'messageDetail':
                return <MessageDetail />
            case 'createMessage':
                return <CreateMessage />

            default :
                return <Home />;
        }
    }

    closeDrawer() {
        if (this.props.drawerState === 'opened') {
            this.props.closeDrawer();
        }
    }

    render() {
        return (
            <Drawer
                ref={(ref) => { this._drawer = ref; }}
                type="overlay"
                tweenDuration={150}
                content={<SideBar navigator={this._navigator} />}
                tapToClose
                acceptPan={false}
                onClose={() => this.closeDrawer()}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
                tweenHandler={(ratio) => {  // eslint-disable-line
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2,
            },
          };
        }}
                negotiatePan
            >
                <StatusBar
                    backgroundColor={statusBarColor.statusBarColor}
                    barStyle="default"
                />
                <NavigationCardStack
                    navigationState={this.props.navigation}
                    renderOverlay={this._renderOverlay}
                    renderScene={this._renderScene}
                />
            </Drawer>
        );
    }
}

const bindAction = dispatch => ({
    closeDrawer: () => dispatch(closeDrawer()),
    popRoute: key => dispatch(popRoute(key)),
});

const mapStateToProps = state => ({
    drawerState: state.drawer.drawerState,
    navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
