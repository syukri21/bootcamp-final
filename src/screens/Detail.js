import React from 'react';
import { View, Text, Thumbnail, Container, Content } from 'native-base';
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
		title: 'Detail',
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
									<View
										key={key}
										style={{
											backgroundColor: 'wheat',
											borderBottomColor: 'red',
											borderBottomWidth: 2
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
										<Thumbnail
											square
											style={{ width: 200, height: 200 }}
											source={{
												uri: _.find(
													this.props.product.results,
													(x) => x.id === parseInt(e.product_id)
												).image_url
											}}
										/>
										<Text>{e.qty} buah</Text>
										<Text>Rp, {e.price}000</Text>
									</View>
								))}
						</View>
						<Text>Uang Anda Habis Segini Rp, {this.props.navigation.getParam('total', null)}000</Text>
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
