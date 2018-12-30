import React from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet } from 'react-native';
import {
	View,
	Text,
	Icon,
	Container,
	Content,
	Form,
	Item,
	Input,
	Header,
	Card,
	CardItem,
	Left,
	Body,
	Button,
	Right
} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { USER_REGISTER } from '../redux/actions/user';

class Register extends React.Component {
	state = {
		email: null,
		password: null,
		confirmpassword: null
	};

	handleChangeText = (type) => (value) => {
		this.setState({
			[type]: value
		});
	};

	handleSubmit = () => {
		if (!this.state.email || !this.state.password) {
			alert('isi dulu mas bro');
			return;
		}
		if (this.state.password !== this.state.confirmpassword) {
			alert('samain mas bro');
			return;
		}
		this.props.dispatch(
			USER_REGISTER({
				email: this.state.email,
				password: this.state.password
			})
		);
		this.props.navigation.navigate('Login');
	};

	static navigationOptions = {
		title: 'LOGIN',
		header: null,
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
			<View style={{ position: 'relative', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<LinearGradient
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						bottom: 0,
						right: 0,
						flex: 1,
						zIndex: 10,
						justifyContent: 'center',
						alignItems: 'center'
					}}
					colors={[ '#9E260055', '#C7350755', '#FF764B55', '#FF957455' ]}
				>
					<Card style={{ width: '80%' }}>
						<CardItem style={{ backgroundColor: '#F4511E' }}>
							<Left>
								<Text style={{ color: 'white' }}>Login</Text>
							</Left>
						</CardItem>
						<Form>
							<Item floatingLabel>
								<Input placeholder='Email' onChangeText={this.handleChangeText('email')} />
							</Item>
							<Item floatingLabel>
								<Input placeholder='Password' onChangeText={this.handleChangeText('password')} />
							</Item>
							<Item floatingLabel>
								<Input
									placeholder='Confirm Password'
									onChangeText={this.handleChangeText('confirmpassword')}
								/>
							</Item>
						</Form>
						<CardItem item style={{ marginTop: 10 }}>
							<Left>
								<Button leftIcon onPress={this.handleSubmit}>
									<Icon active name='md-log-in' />
									<Text>Register</Text>
								</Button>
							</Left>
						</CardItem>
					</Card>
				</LinearGradient>
				<Image
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						bottom: 0,
						right: 0,
						width: '100%',
						height: '100%',
						flex: 1
					}}
					source={{
						uri:
							'https://francois-roux-photography.com/images/photographs/france/montparnasse-tower-paris-vertical-black-white.jpg'
					}}
				/>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 5
	},
	buttonText: {
		fontSize: 18,
		fontFamily: 'Gill Sans',
		textAlign: 'center',
		margin: 10,
		color: '#ffffff',
		backgroundColor: 'transparent'
	}
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Register);
