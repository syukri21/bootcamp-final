import React, { Component } from 'react';
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
import { connect } from 'react-redux';
import { ALL_PRODUCTS } from '../redux/actions/product';
import { ADD_ORDER, ALL_ORDERS, UPDATE_ORDER, DELETE_ORDER } from '../redux/actions/orders';
import { _ } from 'lodash';

class CartItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			qty: props.e.qty,
			price: props.e.price,
			show: true
		};
	}

	handleChangeText = (data) => (e) => {
		this.setState({
			qty: parseInt(e),
			price: parseInt(e) * parseInt(this.getData(data.product_id, 'price'))
		});
	};

	getData = (item, type) => {
		if (item) {
			return this.props.product.results && this.props.product.results.find((e) => e.id == item)[type];
		}
	};

	handleUpdate = (id) => () => {
		data = {
			qty: this.state.qty,
			price: this.state.price
		};
		this.props.dispatch(UPDATE_ORDER(id, data));
	};
	handleDelete = (id) => () => {
		this.props.dispatch(DELETE_ORDER(id));
		this.setState({
			show: false
		});
	};

	getRef = (ref) => (this.ref = ref);

	render() {
		const { e } = this.props;
		if (!this.state.show) return <View />;
		return (
			<ListItem thumbnail ref={this.getRef}>
				<Left>
					<Thumbnail square source={{ uri: this.getData(e.product_id, 'image_url') }} />
				</Left>
				<Body>
					<Text>{this.getData(e.product_id, 'name')}</Text>
					<Text note numberOfLines={1}>
						Harga : {'Rp, ' + this.state.price + '000'}
					</Text>
					<Text note numberOfLines={1}>
						Qty : {this.state.qty}
					</Text>

					<Input
						style={{ color: 'black', textAlign: 'center' }}
						placeholderTextColor='gray'
						placeholder='fill your quantity !'
						onChangeText={this.handleChangeText(e)}
					/>
				</Body>
				<Right>
					<View style={{ flexDirection: 'column', justifyContent: 'center' }}>
						<Button onPress={this.handleUpdate(e.id)} small success style={{ marginBottom: 10 }}>
							<Text>Update</Text>
						</Button>
						<Button onPress={this.handleDelete(e.id)} small danger>
							<Text>Delete</Text>
						</Button>
					</View>
				</Right>
			</ListItem>
		);
	}
}

const mapStateToProps = (theme) => ({
	order: state.orderReducer
});

export default connect(mapStateToProps)(CartItem);
