
import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import {
    Container,
    Header,
    Title,
    Content,
    Text, H3, H2, H1,
    Button,
    Icon,
    Footer,
    FooterTab,
    Card,
    CardItem,
    Thumbnail,
    View
} from 'native-base';

import navigateTo from '../../actions/sideBarNav';
import {getItemsByCategoryId} from '../../actions/categoryId';
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

import DataItemCategory from './DataItemCategory'

class ListItemCategory extends Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
        navigateTo: React.PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: false,
            tab3: false,
            messages: []
        };
    }

    navigateTo(route) {
        this.props.navigateTo(route, 'ListItem');
    }

    toggleTab1() {
        this.setState({
            tab1: true,
            tab2: false,
            tab3: false,
        });
    }

    toggleTab2() {
        this.setState({
            tab1: false,
            tab2: true,
            tab3: false,
        });
    }

    toggleTab3() {
        this.setState({
            tab1: false,
            tab2: false,
            tab3: true,
        });
    }

    componentWillMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        try {
            var value = await AsyncStorage.getItem("myKey");
            if (value !== null){
                let CategoryId = this.props.navigation.routes[this.props.navigation.routes.length - 1].data
                this.props.getItemsByCategoryId(value, CategoryId)
                this._appendMessage('Recovered selection from disk: ' + value);
            } else {
                console.log("else")
                this._appendMessage('Initialized with no selection on disk.');
            }
        } catch (error) {
            console.log("catch: ", error)
            this._appendMessage('AsyncStorage error: ' + error.message);
        }
    }

    _appendMessage = (message) => {
        this.setState({messages: this.state.messages.concat(message)});
    };

    render() {
        const {items} = this.props
        console.log('item category: ', items)

        let ItemCategoryNodes = items.map(function (item) {
            return(
                <DataItemCategory key={item.id} items={item} />
            )
        })

        return (
            <Container theme={myTheme} style={styles.container}>

                <Header>
                    <Title style={{alignSelf: 'center'}}>List Item By Category</Title>
                    <Button transparent onPress={() => this.navigateTo('SearchItem')}>
                        <Icon name="ios-search" />
                    </Button>
                    <Button transparent onPress={() => this.navigateTo('listAvatar')}>
                        <Icon name="ios-mail" />
                    </Button>
                </Header>

                <Content>

                    <Card style={{ flex: 0, backgroundColor: 'black', borderWidth: 0 }}>
                        {ItemCategoryNodes}
                    </Card>
                </Content>

                <Footer>
                    <FooterTab>
                        <Button
                            active={this.state.tab1}
                            onPress={() => this.navigateTo('home')} >
                            Feed
                        </Button>
                        <Button active={this.state.tab2} onPress={() => this.toggleTab2()} >
                            Add Item
                        </Button>
                        <Button active={this.state.tab3} onPress={() => this.toggleTab3()} >
                            Profile
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer()),
        navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
        getItemsByCategoryId: (token, id) => dispatch(getItemsByCategoryId(token, id)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    items: state.categoryId
});

export default connect(mapStateToProps, bindAction)(ListItemCategory);
