import { useState } from 'react'

const ParamList = (props) => {
	console.log("ParamList rerender", props);
	const functionEntry = props.functionEntry;
	const paramEntry = functionEntry["params"];
	const paramNames = Object.keys(paramEntry);
	const defaultParamValues = paramNames.map((name)=>[name, paramEntry[name]["defaultValue"]]);
	const paramList = props.functionEntry["params"];

	const [paramValues, setParamValues] = useState(Object.fromEntries(defaultParamValues));
	const fnMaker = props.functionEntry.f;

	return (
		<div className="Params">
		{Object.keys(paramList).map((p)=>(<div key={p} className="Param">
			{p}<input type="range"

			min={paramList[p].min}
			max={paramList[p].max}
			step={paramList[p].step}
			defaultValue={paramList[p].defaultValue}
			onChange={(e)=>{
				props.setFunctionValues(p, e.target.value);
			}}>

			</input>
			</div>))}

		</div>
		)
};

export default ParamList;