/* css added */

.debit-card .debit-card-body{
	display: none;
}

.debit-card .debit-card-body.active{
	display: block;
}

.activeCTA{
	background-color: green;
}


/* React code */

import React, { useState } from "react"
import "./DebitCard.css"
import cards from "../../cards.json"
export const DebitCard = () => {

	const [cardDetailActive, setCardDetailActive] = useState(0);
	const [unMaskCardDetials, setUnMaskCardDetials] = useState(false);
	const cardDetails = (index) => {
		setCardDetailActive(index);
		setUnMaskCardDetials(false);
	}

	const unMaskDetails = () => {
		setUnMaskCardDetials(!unMaskCardDetials);
	}

	const formatCreditCardNumber = (number) => {
		const groups = number.match(/.{1,4}/g);
		return groups.join(' ');
	}

	return (
		<div className="mt-50 layout-column justify-content-center align-items-center" >
			<div className="card outlined" style={{ width: '1000px' }}>
				<div data-testid="debit-card">
					<h3 style={{ textAlign: 'center' }}>Card Details</h3>
					<br />
					{!unMaskCardDetials &&
						<div className="debit-card">
							{/* Display Card Details here */}
							{
								cards.map((card, index) => {
									return (
										<div onClick={unMaskDetails} key={index} id={index} className={`debit-card-body ${index === cardDetailActive ? 'active' : ''}`} data-testid="debit-card-body">
											<p className="debit-card-bank" data-testid="debit-card-bank-name">{card.bank}</p>
											<p className="debit-card-no" data-testid="debit-card-no">{card.number.slice(0, 4)} XXXX XXXX XXXX</p>
											<br />
											<div style={{ height: '45px', backgroundColor: 'black' }} className="debit-card-stripe"></div>
											<p>
												<span className="debit-card-holder-name" data-testid="debit-card-holder-name">{card.name}</span>
												<span className="debit-card-date" data-testid="debit-card-expiry-date">XX/XX</span>
												<span className="debit-card-cvv" data-testid="debit-card-cvv">XXX</span></p>
										</div>
									)
								})
							}
						</div>
					}
					{unMaskCardDetials &&
						<div className="debit-card">
							{
								cards.map((card, index) => {
									return (
										<div onClick={unMaskDetails} key={index} id={index} className={`debit-card-body ${index === cardDetailActive ? 'active' : ''}`} data-testid="debit-card-body">
											<p className="debit-card-bank" data-testid="debit-card-bank-name">{card.bank}</p>
											<p className="debit-card-no" data-testid="debit-card-no">{formatCreditCardNumber(card.number)}</p>
											<br />
											<div style={{ height: '45px', backgroundColor: 'black' }} className="debit-card-stripe"></div>
											<p>
												<span className="debit-card-holder-name" data-testid="debit-card-holder-name">{card.name}</span>
												<span className="debit-card-date" data-testid="debit-card-expiry-date">{card.expiry}</span>
												<span className="debit-card-cvv" data-testid="debit-card-cvv">{card.cvv}</span></p>
										</div>
									)
								})
							}
						</div>
					}
				</div>
				<div>
					<h3 style={{ textAlign: "center" }}>Cards List</h3>
					<div className="debit-card-list" data-testid="debit-card-list">
						{/* Render the card list of all 6 cards imported from Cards.json here. */}
						{
							cards.map((card, index) => {
								return (
									<div onClick={() => cardDetails(index)} key={index} className={`list-card ${index === cardDetailActive ? 'activeCTA' : ''}`} data-testid={`list-card-${index}`}><p className="list-card-title">Card {index + 1}</p></div>
								)
							})}
					</div>
				</div>
			</div>
		</div>
	)
}