import { useState, useEffect } from 'react'
// import { StrictMode } from 'react'
import './FunctionEditor.css'
import ViewPort from './ViewPort.tsx'
import FunctionSelect from './FunctionSelect.tsx'
import ParamList from './ParamList.tsx'
import { functions } from './Functions.js'

const FunctionEditor = (props) => {
	console.log("FunctionEditor", props);

	const [functionEntry, setFunctionEntry] = [props.functionEntry, props.setFunctionEntry];
	const functionName = props.functionEntry.fnName;
	const fnMaker = functionEntry.f;
	const values = functionEntry.values;
	const fn = fnMaker(values);

	const setFunctionName = (name) => {
		const newFunctionEntry = functions[name];
		console.log("newFunctionEntry", newFunctionEntry);
		newFunctionEntry.fnName = name;
		newFunctionEntry.values = Object.keys(newFunctionEntry.params).map((name)=>[name, paramEntry[name]["defaultValue"]]);
		console.log("newFunctionEntry", newFunctionEntry);
		props.setFnEntry(newFunctionEntry);
	}

	const setFunctionValues = (label, value) => {
		const newFunctionEntry = {...functionEntry};
		newFunctionEntry.values[label] = value;
		props.setFnEntry(newFunctionEntry);
	}

	return (<div className="FunctionEditor">
		<ViewPort fn={functionEntry.renderFn}></ViewPort>
		<FunctionSelect functions={functions} setFunctionName={setFunctionName} ></FunctionSelect>
		<ParamList functionEntry={functionEntry} setFunctionValues={setFunctionValues}></ParamList>
		</div>);
}

export default FunctionEditor;