import React, { Component } from 'react';
import { ListView, Image } from 'react-native';
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
	Thumbnail,
	Card,
	CardItem,
	Left,
	Body,
	Right
} from 'native-base';
import { connect } from 'react-redux';
import { ALL_PRODUCTS } from '../redux/actions/product';
import { ADD_ORDER } from '../redux/actions/orders';

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
class ListScreen extends Component {
	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state = {
			basic: true,
			listViewData: datas
		};
	}

	componentDidMount() {
		this.props.dispatch(ALL_PRODUCTS());
	}

	handleAddCart = (data) => () => {
		let newData = {
			product_id: data.id,
			qty: 1,
			price: data.price
		};

		this.props.dispatch(ADD_ORDER(newData));
	};

	static navigationOptions = {
		title: 'Daftar Belanja',
		headerStyle: {
			backgroundColor: '#f4511e'
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold'
		}
	};

	render() {
		console.log(this.props);
		let { results } = this.props.product;
		results = results || datas;
		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		return (
			<Container>
				<Content>
					<List
						leftOpenValue={75}
						rightOpenValue={-75}
						dataSource={this.ds.cloneWithRows(results)}
						renderRow={(data) => (
							<Card style={{ marginHorizontal: 10, flexDirection: 'row' }}>
								<View style={{ flex: 2 }}>
									<CardItem
										cardBody
										style={{
											flexDirection: 'row',
											marginTop: 10,
											padding: 10,
											alignItems: 'flex-start',
											width: '100%'
										}}
									>
										<View
											style={{
												alignItems: 'flex-start',
												justifyContent: 'flex-start',
												padding: 20,
												flex: 3
											}}
										>
											<Text>{data.name}</Text>
											<View style={{ marginVertical: 10, flexDirection: 'row' }}>
												<Icon
													active
													name='md-cart'
													style={{ color: '#D0021B', marginRight: 10 }}
												/>
												<Text style={{ color: '#D0021B' }}>
													Rp, {data.price.toLocaleString().split(/\s/).join(',')}.000
												</Text>
											</View>
										</View>
									</CardItem>
									<CardItem style={{ backgroundColor: '#BDE4F288' }}>
										<Left>
											<Button transparent>
												<Icon active name='chatbubbles' />
												<Text>4 Comments</Text>
											</Button>
										</Left>
									</CardItem>
								</View>
								<View style={{ flex: 1 }}>
									<Image
										source={{ uri: data.image_url }}
										style={{ height: 100, width: '100%', flex: 1 }}
									/>
								</View>
							</Card>
						)}
						renderLeftHiddenRow={(data) => (
							<Button full onPress={() => alert(data)}>
								<Icon active name='information-circle' />
							</Button>
						)}
						renderRightHiddenRow={(data, secId, rowId, rowMap) => (
							<Button full onPress={this.handleAddCart(data)}>
								<Icon active name='add' />
							</Button>
						)}
					/>
				</Content>
				<View style={{ flexDirection: 'row', justifyContent: 'center', padding: 20 }}>
					<Button style={{ marginRight: 10 }} onPress={() => this.props.navigation.navigate('Cart')}>
						<Text>Cart</Text>
					</Button>
				</View>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	product: state.productReducer
});

export default connect(mapStateToProps)(ListScreen);
