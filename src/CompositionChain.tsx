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
	const functionEntry = {...functions[fnName]};
	// functionEntry[name] = fnName;
	functionEntry.values = {...functionEntry.values};
	functionEntry.renderFn = generateRenderFn(functionEntry);
	return functionEntry;
}

const CompositionChain = (params) => {
	const [fnList, setFnList] = useState([]);
	// const [nextId, setNextId] = useState(0);

	const renderFnList = fnList.map((entry)=>entry.renderFn);
	console.log("fnList", fnList);
	console.log("renderFnList", renderFnList.length, renderFnList);
	// const compositionRenderFn = renderFnList.reduce(composition, ([x,y])=>[x,y]);
	const compositionRenderFn = ([x,y])=>[x,y];

	const addFunction = (fnName) => {
		const functionEntry = loadFunction(fnName);
		functionEntry.id = fnList.length;//nextId;
		// setNextId(nextId+1);
		console.log("functionEntry", functionEntry);
		setFnList([...fnList, functionEntry]);
	}

	const getFnEntrySetters = (id) => {
		console.log("getFnEntrySetters", id);
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
			// const newFunctionEntry = {...functions[name]};
			// newFunctionEntry.id = id;
			// // newFunctionEntry.fnName = name;
			// newFunctionEntry.values = {...newFunctionEntry.values};
			// newFunctionEntry.renderFn = generateRenderFn(newFunctionEntry);
			const newFunctionEntry = loadFunction(name);
			newFunctionEntry.id = id;
			const newFnList = [...fnList];
			newFnList[id] = newFunctionEntry;
			setFnList(newFnList);
			// setFnEntry(newFunctionEntry);
		}

		const setFunctionValues = (label, value) => {
			const functionEntry = fnList[id];
			console.log("id", id, fnList);
			const newFunctionEntry = {...functionEntry};
			console.log(functionEntry, newFunctionEntry, label);
			newFunctionEntry.values[label] = value;
			newFunctionEntry.renderFn = generateRenderFn(functionEntry);
			setFnEntry(newFunctionEntry);
		}
		return {setFnEntry, setFunctionName, setFunctionValues}
	}
	const combine = (f, g)=>([x,y])=>[f(x)+g(x),f(y)+g(y)];
	const f = renderFnList[0]?renderFnList.reduceRight(composition):([x,y])=>[x,y];
	const g = renderFnList[0]?renderFnList.reduce(combine):([x,y])=>[x,y];
	return (<div className="CompositionChain">
		<ViewPort className="MainViewer" fn={f}size="200"/>
		<br/>
		<div>
		{fnList.map((functionEntry)=>(<FunctionEditor key={functionEntry.id} label={functionEntry.id} functionEntry={functionEntry} addFunction={addFunction} fnEntrySetters={getFnEntrySetters(functionEntry.id)}/>))}
		</div>
		{/*<div className="AddFunction">*/}
		<div className="AddFunctionButton" onClick={()=>addFunction("radialGrid")}>+</div>
		{/*</div>*/}
{/*			<div>
		{renderFnList.map((functionEntry)=>(<ViewPort key={functionEntry.id} fn={functionEntry.renderFn}/>))}
		</div>*/}
		</div>);
}

export default CompositionChain;