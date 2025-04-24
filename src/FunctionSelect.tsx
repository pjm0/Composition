import { useState } from 'react'

const FunctionSelect = (props) => {
	const handleFunctionSelectUpdate = (e) => {
		props.setFunctionName(e.target.value);
	}
	return (
		<select defaultValue="radialGrid" onChange={handleFunctionSelectUpdate}>
		{Object.keys(props.functions).map((functionName) => (
			<option key={functionName} value={functionName}>
			{functionName}
			</option>
			))}
		</select>
		)
};

export default FunctionSelect;