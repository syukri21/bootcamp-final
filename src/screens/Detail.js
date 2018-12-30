import React from 'react';
import { Image } from 'react-native';
import {
	View,
	Text,
	Thumbnail,
	Container,
	Content,
	Icon,
	Card,
	CardItem,
	Body,
	Right,
	Left,
	Button
} from 'native-base';
import { connect } from 'react-redux';
import { ALL_PRODUCTS } from '../redux/actions/product';
import { GET_TRANSACTION } from '../redux/actions/transaction';
import { ALL_ORDERS } from '../redux/actions/orders';
import _ from 'lodash';

class Detail extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		await this.props.dispatch(ALL_ORDERS());
		if (this.props.navigation.getParam('total', null)) {
			this.props.dispatch(GET_TRANSACTION(parseInt(this.props.navigation.getParam('id', null))));
		}
	}
	static navigationOptions = {
		title: 'DETAIL TRANSACTION',
		headerRight: <Icon active name='md-cash' style={{ color: '#FFFFFF', marginRight: 30 }} />,
		headerStyle: {
			backgroundColor: '#f4511e'
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold'
		}
	};

	render() {
		return (
			<Container>
				<Content>
					<View>
						<View>
							{this.props.transaction.data.orders &&
								this.props.transaction.data.orders.map((e, key) => (
									<Card style={{ marginHorizontal: 10, flexDirection: 'row' }} key={key}>
										<View style={{ flex: 2 }}>
											<CardItem
												cardBody
												style={{
													flexDirection: 'row',
													padding: 10,
													alignItems: 'flex-start',
													width: '100%',
													backgroundColor: '#BDE4F222'
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
													<Text>
														{
															_.find(
																this.props.product.results,
																(x) => x.id === parseInt(e.product_id)
															).name
														}
													</Text>
													<View style={{ marginVertical: 10, flexDirection: 'row' }}>
														<Icon
															active
															name='md-cart'
															style={{ color: '#D0021B', marginRight: 10 }}
														/>
														<Text style={{ color: '#D0021B', marginRight: 10 }}>
															Rp, {e.price.toLocaleString().split(/\s/).join(',')}.000
														</Text>
														<Text>{e.qty} qty</Text>
													</View>
												</View>
											</CardItem>
										</View>
										<View style={{ flex: 1 }}>
											<Image
												source={{
													uri: _.find(
														this.props.product.results,
														(x) => x.id === parseInt(e.product_id)
													).image_url
												}}
												style={{ height: 100, width: '100%', flex: 1 }}
											/>
										</View>
									</Card>
								))}
						</View>
						<Card>
							<CardItem style={{ backgroundColor: '#F4501C22' }}>
								<Body>
									<Text>
										Total Belanja Anda Rp, {this.props.navigation.getParam('total', null)}000
									</Text>
								</Body>
							</CardItem>
						</Card>
					</View>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = (state) => ({
	product: state.productReducer,
	transaction: state.transactionReducer
});

export default connect(mapStateToProps)(Detail);
