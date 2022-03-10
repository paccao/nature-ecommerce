import { SyntheticEvent, useEffect } from 'react'
import useTimeout from './useTimeout'
import { debounceProps } from '../models/Global'

export default function useDebounce({
	callback,
	delay,
	dependencies,
}: debounceProps) {
	const { reset, clear } = useTimeout({ callback, delay })
	useEffect(reset, [...dependencies, reset])
	useEffect(clear, [])
}
