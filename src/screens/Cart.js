import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native';
import {
	Container,
	Header,
	Content,
	Button,
	Icon,
	List,
	ListItem,
	Text,
	View,
	Image,
	Thumbnail,
	Left,
	Body,
	Right,
	Input
} from 'native-base';
import CartItem from '../components/cartItem';
import { connect } from 'react-redux';
import { ALL_PRODUCTS } from '../redux/actions/product';
import { ADD_ORDER, ALL_ORDERS, UPDATE_ORDER } from '../redux/actions/orders';
import { ADD_TRANSACTION } from '../redux/actions/transaction';
import { _ } from 'lodash';

const datas = [
	'Simon Mignolet',
	'Nathaniel Clyne',
	'Dejan Lovren',
	'Mama Sakho',
	'Alberto Moreno',
	'Emre Can',
	'Joe Allen',
	'Phil Coutinho'
];
class Cart extends Component {
	constructor(props) {
		super(props);
		state = {
			total: 0
		};
	}

	componentDidMount() {
		this.props.dispatch(ALL_ORDERS());
		this.props.dispatch(ALL_ORDERS());
	}

	static navigationOptions = ({ navigation }) => ({
		title: 'YOUR CART',
		headerLeft: <Icon active name='md-cart' style={{ color: '#FFFFFF', marginLeft: 20 }} />,
		headerStyle: {
			backgroundColor: '#f4511e'
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold'
		},
		headerRight: (
			<Button
				onPress={() => {
					AsyncStorage.setItem('token', 'dwd');
					navigation.navigate('Login');
				}}
				transparent
				style={{ height: '100%' }}
			>
				<Icon active name='md-log-out' style={{ color: '#FFFFFF' }} />
			</Button>
		)
	});

	getData = (item, type) => {
		if (item) {
			return this.props.product.results && this.props.product.results.find((e) => e.id == item)[type];
		}
	};

	handleSubmit = async () => {
		const token = await AsyncStorage.getItem('token');
		if (token.length < 6 && token) {
			return this.props.navigation.navigate('Login');
		}

		await this.props.dispatch(ALL_ORDERS());

		await this.setState({
			total:
				_.sumBy(this.props.order.results.filter((e) => e.transaction_id === null), (e) => e.qty * e.price) || 0
		});

		if (this.state.total === 0) {
			alert('Your dont have any transcation, please add item to cart !');
			return;
		}

		await this.props.dispatch(
			ADD_TRANSACTION({
				total: this.state.total
			})
		);

		const transaction_id = this.props.transaction.add.id;

		await this.props.order.results
			.filter((e) => e.transaction_id === null)
			.map((item) => this.props.dispatch(UPDATE_ORDER(item.id, { ...item, transaction_id: transaction_id })));

		this.props.navigation.navigate('Detail', {
			id: transaction_id,
			total: this.state.total
		});
	};

	render() {
		const { results } = this.props.order;
		return (
			<Container>
				<Content>
					<List>
						{this.props.order.results
							.filter((e) => e.transaction_id === null)
							.map((e) => <CartItem key={e.id} e={e} {...this.props} />)}
					</List>
				</Content>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						padding: 20,
						backgroundColor: '#F4501C'
					}}
				>
					<Button full onPress={this.handleSubmit} light vertical transparent>
						<Icon active name='md-cash' />
						<Text>SUBMIT TRANSACTION</Text>
					</Button>
				</View>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	order: state.orderReducer,
	product: state.productReducer,
	transaction: state.transactionReducer
});

export default connect(mapStateToProps)(Cart);
