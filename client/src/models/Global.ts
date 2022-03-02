import { Dispatch, SetStateAction, SyntheticEvent } from 'react'

export type AmountInputButtonsProps = {
	submitHandler: (event: SyntheticEvent<Element, Event>) => Promise<void>
	amountToAddState: number
	setAmountToAddState: Dispatch<SetStateAction<number>>
	buttonInnerText: string
}
