import { Dispatch, SetStateAction, SyntheticEvent } from 'react'

export type AmountInputButtonsProps = {
	submitHandler: (event: SyntheticEvent<Element, Event>) => void
	amountToAddState: number
	setAmountToAddState: Dispatch<SetStateAction<number>>
	buttonInnerText?: string
	useSpecialSubmit?: boolean
}

export type debounceProps = {
	callback: (event: SyntheticEvent<Element, Event>) => void
	delay: number
	dependencies: number[]
}

export enum GlobalWidths {
	Mobile = 633
}