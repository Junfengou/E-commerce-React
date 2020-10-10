import React, { Component } from "react";
import { ProductConsumer } from "../context"
import { Link } from "react-router-dom"
import styled from "styled-components"

export default class Details extends Component {
	render() {
		return (
			<ProductConsumer>
				{value => {
					const {id, company, img, info, price, title, inCart} = value.detailProduct
					return (
						<div className="container py-5">
							{/* title */}
							<div className="row">
								<div className="col-10 mx-auto text-center text-slanted text-blue my-5">
									<h1>{title}</h1>
								</div>
							</div>
							{/*end of title */}

							{/* Product info */}
							<div className="row">
								<div className="col-10 mx-auto col-md-6 my-3 ">
									<img src={img} alt="product" className="img-fluid" />
								</div>
							{/* Product text */}
								<div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
									<h2>model : {title}</h2>
									<h4 className="text-title text-uppercase text-muted mt-3 mb-2">
										made by : <span className="text-uppercase">{company}</span>
									</h4>
									<h4 className="text-blue">
										<strong>price : <span>${price}</span>
										</strong>
									</h4>
									<p className="text-capitalize font-weight-bold mt-3 mb-0">
										some info about product: 
									</p>
									<p className="text-muted">
										{info}
									</p>
									{/* buttons */}
									<div>
										<Link to="/">
											<ButtonContainer>
												back to products
											</ButtonContainer>
										</Link>

										<ButtonContainer cart
										disabled={inCart ? true : false}
										onClick={() => {
											value.addToCart(id);
										}}>
											{inCart ? "in Cart" : "add to cart"}
										</ButtonContainer>
									</div>
								</div>
							</div>
						</div>
					)
				}}
			</ProductConsumer>
		);
	}
}


const ButtonContainer = styled.button`
	text-transform: capitalize;
	font-size: 1.4rem;
	background: transparent;
	//border: 5rem soild var(--customColor);
	border: solid var(--customColor);
	border-color: ${props => props.cart ? "var(--mainYellow)" : "var(--customColor)"};
	margin: 0.5rem;
	color: ${props => props.cart ? "var(--mainYellow)" : "var(--customColor)"};
	border-radius: 0.5rem;
	padding: 0.2rem, 0.5rem;
	cursor: pointer;
	margin: 0.2rem, 0.5rem, 0.2rem, 0;
	transition: all 0.5s ease-in-out;
	&:hover {
		background: ${props => props.cart ? "var(--mainYellow)" : "var(--customColor)"};
		color: ${props => props.cart ? "var(--mainWhite)" : "var(--mainWhite)"};
	}
	&:focus {
		outline: none;
	}
`;
