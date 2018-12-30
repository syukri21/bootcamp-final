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
	Input,
	Card,
	CardItem
} from 'native-base';
import { connect } from 'react-redux';
import { ALL_PRODUCTS } from '../redux/actions/product';
import { ADD_ORDER, ALL_ORDERS, UPDATE_ORDER, DELETE_ORDER } from '../redux/actions/orders';
import { _ } from 'lodash';
import NumericInput from 'react-native-numeric-input';
import { TouchableOpacity } from 'react-native';

class CartItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			qty: props.e.qty,
			price: props.e.price,
			show: true
		};
	}

	handleChangeText = (data) => async (e) => {
		await this.setState({
			qty: e,
			price: parseInt(e) * parseInt(this.getData(data.product_id, 'price'))
		});
		this.handleUpdate(data.id);
	};

	getData = (item, type) => {
		if (item) {
			return this.props.product.results && this.props.product.results.find((e) => e.id == item)[type];
		}
	};

	handleUpdate = (id) => {
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
			<Card thumbnail ref={this.getRef}>
				<CardItem style={{ backgroundColor: '#007AFF' }}>
					<Left>
						<Text style={{ color: '#fff' }}>{this.getData(e.product_id, 'name')}</Text>
					</Left>
				</CardItem>
				<CardItem>
					<Left
						style={{
							backgroundColor: '#E9F6FB55',
							flex: 0,
							width: '30%',
							height: 120,
							position: 'relative'
						}}
					>
						<Thumbnail
							square
							source={{ uri: this.getData(e.product_id, 'image_url') }}
							style={{ flex: 1, height: 120 }}
						/>
						<TouchableOpacity
							onPress={this.handleDelete(e.id)}
							style={{ position: 'absolute', top: 0, left: -10 }}
						>
							<Icon style={{ color: '#D9544E', fontSize: 30 }} active name='md-close' />
						</TouchableOpacity>
					</Left>
					<Body
						style={{
							justifyContent: 'center'
						}}
					>
						<View>
							<View style={{ flexDirection: 'row' }}>
								<Icon
									active
									name='md-cart'
									style={{ marginRight: 10, marginBottom: 10, color: '#D9544E' }}
								/>
								<Text numberOfLines={1} style={{ color: '#D9544E' }}>
									{'Rp, ' + this.state.price + '000'}
								</Text>
							</View>

							<Text style={{ color: '#82B649' }} note numberOfLines={1}>
								Qty : {this.state.qty}
							</Text>
						</View>
					</Body>
					<Right style={{ position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
						<NumericInput
							valueType='integer'
							value={parseInt(this.state.qty)}
							onChange={this.handleChangeText(e)}
							minValue={0}
							inputStyle={{
								width: 40,
								opacity: 0
							}}
						/>
						<Text
							style={{
								position: 'absolute',
								left: '50%',
								textAlign: 'center',
								transform: [ { translateX: -5 } ]
							}}
						>
							{this.state.qty}
						</Text>
					</Right>
				</CardItem>
			</Card>
		);
		x;
	}
}

const mapStateToProps = (theme) => ({
	order: state.orderReducer
});

export default connect(mapStateToProps)(CartItem);
