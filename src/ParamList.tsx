import { useState } from 'react'

const ParamList = (props) => {
	const paramInfo = props.paramInfo;

	return (
		<div className="Params">
		{Object.keys(paramInfo).map((p)=>(<div key={p} className="Param">
			{p}<input type="number"
			min={paramInfo[p].min}
			max={paramInfo[p].max}
			step={paramInfo[p].step}
			defaultValue={paramInfo[p].defaultValue}
			onChange={(e)=>{
				props.setFunctionValues(p, e.target.value);
			}}>
			</input>
			</div>))}

		</div>
		)
};

export default ParamList;