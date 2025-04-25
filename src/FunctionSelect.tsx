import { useState } from 'react'
import { functions } from './Functions.js'

const FunctionSelect = (props) => {
	const handleFunctionSelectUpdate = (e) => {
		props.setFunctionName(e.target.value);
	}
	return (
		<select value={props.functionName} onChange={handleFunctionSelectUpdate}>
		{Object.keys(functions).map((functionName) => (
			<option key={functionName} value={functionName}>
			{functionName}
			</option>
			))}
		</select>
		)
};

export default FunctionSelect;