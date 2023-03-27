import React from 'react';
import App from './App';
import {render, cleanup, fireEvent} from '@testing-library/react';
import cards from "./cards.json"
import '@testing-library/jest-dom/extend-expect';


const renderApp = () => render(<App/>);

const TEST_IDS = {
	DEBIT_CARD: 'debit-card',
	DEBIT_CARD_BODY: 'debit-card-body',
	DEBIT_CARD_BANK_NAME: 'debit-card-bank-name',
	DEBIT_CARD_NO: 'debit-card-no',
	DEBIT_CARD_HOLDER_NAME: 'debit-card-holder-name',
	DEBIT_CARD_EXPIRY_DATE: 'debit-card-expiry-date',
	DEBIT_CARD_CVV: 'debit-card-cvv',
	DEBIT_CARD_LIST: 'debit-card-list',
	LIST_CARD: 'list-card-'
}

let app, getByTestId, queryByTestId, getByText;

afterEach(() => {
    cleanup()
});

beforeEach(() => { 
	({app, getByTestId, queryByTestId, getByText} = renderApp())
})

it('Test initial rendering of the app', () => {
	expect(queryByTestId(TEST_IDS.DEBIT_CARD)).toBeNull()
	let cardList = getByTestId(TEST_IDS.DEBIT_CARD_LIST)
	expect(cardList.children.length).toBe(cards.length)
})

it('Test initial rendering of card', () => {
	let card = getByTestId(TEST_IDS.LIST_CARD + '0')
	expect(card.textContent).toBe('Card 1')

	fireEvent.click(card)
	expect(queryByTestId(TEST_IDS.DEBIT_CARD)).toBeInTheDocument()
})

it('Test masking of the data initially on the card', () => {
	let card = getByTestId(TEST_IDS.LIST_CARD + '0')
	fireEvent.click(card)
	let cardNo = getByTestId(TEST_IDS.DEBIT_CARD_NO)
	expect(cardNo.textContent).toBe('4111 XXXX XXXX XXXX')
	let cardName = getByTestId(TEST_IDS.DEBIT_CARD_HOLDER_NAME)
	expect(cardName.textContent).toBe('XXXX XXXX')
	let cardExpiry = getByTestId(TEST_IDS.DEBIT_CARD_EXPIRY_DATE)
	expect(cardExpiry.textContent).toBe('XX/XX')
	let cardCvv = getByTestId(TEST_IDS.DEBIT_CARD_CVV)
	expect(cardCvv.textContent).toBe('XXX')
	let cardBank = getByTestId(TEST_IDS.DEBIT_CARD_BANK_NAME)
	expect(cardBank.textContent).toBe('Bank of HackerLand')
})

it('Test Masking an Unmasking of the data on click', () => {
	let card = getByTestId(TEST_IDS.LIST_CARD + '3')
	fireEvent.click(card)
	let cardNo = getByTestId(TEST_IDS.DEBIT_CARD_NO)
	expect(cardNo.textContent).toBe('3782 XXXX XXXX XXXX')
	let cardName = getByTestId(TEST_IDS.DEBIT_CARD_HOLDER_NAME)
	expect(cardName.textContent).toBe('XXXX XXXX')
	let cardExpiry = getByTestId(TEST_IDS.DEBIT_CARD_EXPIRY_DATE)
	expect(cardExpiry.textContent).toBe('XX/XX')
	let cardCvv = getByTestId(TEST_IDS.DEBIT_CARD_CVV)
	expect(cardCvv.textContent).toBe('XXX')

	fireEvent.click(cardNo)
	expect(cardNo.textContent).toBe('3782 8224 6310 0055')
	expect(cardName.textContent).toBe('CHARLIE BROWN')
	expect(cardExpiry.textContent).toBe('07/30')
	expect(cardCvv.textContent).toBe('874')

})

it('Test through masking and unmasking cycle of card', () => {
	let card = getByTestId(TEST_IDS.LIST_CARD + '4')
	fireEvent.click(card)
	let cardNo = getByTestId(TEST_IDS.DEBIT_CARD_NO)
	expect(cardNo.textContent).toBe('6011 XXXX XXXX XXXX')
	let cardName = getByTestId(TEST_IDS.DEBIT_CARD_HOLDER_NAME)
	expect(cardName.textContent).toBe('XXXX XXXX')
	let cardExpiry = getByTestId(TEST_IDS.DEBIT_CARD_EXPIRY_DATE)
	expect(cardExpiry.textContent).toBe('XX/XX')
	let cardCvv = getByTestId(TEST_IDS.DEBIT_CARD_CVV)
	expect(cardCvv.textContent).toBe('XXX')

	fireEvent.click(cardNo)

	expect(cardNo.textContent).toBe('6011 1111 1111 1117')
	expect(cardName.textContent).toBe('DAKOTA JAMES')
	expect(cardExpiry.textContent).toBe('03/21')
	expect(cardCvv.textContent).toBe('876')

	fireEvent.click(cardNo)

	expect(cardNo.textContent).toBe('6011 XXXX XXXX XXXX')
	expect(cardName.textContent).toBe('XXXX XXXX')
	expect(cardExpiry.textContent).toBe('XX/XX')
	expect(cardCvv.textContent).toBe('XXX')

})