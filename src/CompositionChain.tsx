import { useState } from 'react'
// import { StrictMode } from 'react'
import './CompositionChain.css'
import ViewPort from './ViewPort.tsx'
import FunctionEditor from './FunctionEditor.tsx'
import ParamList from './ParamList.tsx'
import { composition, functions } from './Functions.js'

const generateRenderFn = (functionEntry) => {
	const fnMaker = functionEntry.f;
	const values = functionEntry.values;
	return fnMaker(values);
}

const loadFunction = (fnName) => {
	const functionEntry = functions[fnName];
	functionEntry[fnName] = fnName;
	functionEntry.renderFn = functionEntry.f(functionEntry.values);
	return functionEntry;
}

const CompositionChain = (params) => {
	const [fnList, setFnList] = useState([]);
	const [nextId, setNextId] = useState(0);

	const renderFnList = fnList.map((entry)=>entry.renderFn);
	console.log(renderFnList);
	// const compositionRenderFn = renderFnList.reduce(composition, ([x,y])=>[x,y]);
	const compositionRenderFn = ([x,y])=>[x,y];

	const addFunction = (fnName) => {
		const functionEntry = loadFunction(fnName);
		functionEntry.id = nextId;
		setNextId(nextId+1);
		console.log("functionEntry", functionEntry);
		setFnList([...fnList, functionEntry]);
	}

	const getFnEntrySetters = (id) => {
		const functionEntry = fnList[id];

		const setFnEntry = (functionEntry) => {
			const newFnList = [...fnList];
			newFnList[id] = {...functionEntry};
			functionEntry.id = id;
			const fnMaker = functionEntry.f;
			const values = functionEntry.values;
			functionEntry.renderFn = generateRenderFn(functionEntry);
			setFnList(newFnList);
		}

		const setFunctionName = (name) => {
			const newFunctionEntry = functions[name];
			newFunctionEntry.fnName = name;
			const params = newFunctionEntry.params;
			// newFunctionEntry.values = Object.keys(params).map((name)=>[name, params[name].defaultValue);
			newFunctionEntry.renderFn = generateRenderFn(functionEntry);

			setFnEntry(newFunctionEntry);
		}

		const setFunctionValues = (label, value) => {
			const newFunctionEntry = {...functionEntry};
			newFunctionEntry.values[label] = value;
			newFunctionEntry.renderFn = generateRenderFn(functionEntry);
			setFnEntry(newFunctionEntry);
		}
		return {setFnEntry, setFunctionName, setFunctionValues}
	}
const f = renderFnList[0]?renderFnList.reduce(composition):([x,y])=>[x,y];
	return (<div className="CompositionChain">
		<ViewPort fn={f}size="256"/>
		<div>
		{fnList.map((functionEntry)=>(<FunctionEditor key={functionEntry.id} functionEntry={functionEntry} addFunction={addFunction} fnEntrySetters={getFnEntrySetters(functionEntry.id)}/>))}
		</div>
		<button className="AddFunction" onClick={()=>addFunction("radialGrid")}>+</button>
		
{/*			<div>
		{renderFnList.map((functionEntry)=>(<ViewPort key={functionEntry.id} fn={functionEntry.renderFn}/>))}
		</div>*/}
		</div>);
}

export default CompositionChain;