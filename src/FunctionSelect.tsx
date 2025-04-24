import { useState } from 'react'

const FunctionSelect = (props) => {
	const handleFunctionSelectUpdate = (e) => {
		props.setFunctionName(e.target.value);
		const defaultValues = Object.keys(props.functions[e.target.value].params);
		console.log("defaultValues", defaultValues);
			// setParamValues();
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