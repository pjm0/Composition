import { useState } from 'react'
// import { StrictMode } from 'react'
import '../style/CompositionChain.css'
import ViewPort from './ViewPort.tsx'
import FunctionEditor from './FunctionEditor.tsx'
import ParamList from './ParamList.tsx'
import { composition, chain, functions } from './Functions.js'

const DEBUG_MODE = false;

const generateRenderFn = (functionEntry) => {
	const fnMaker = functionEntry.f;
	const values = functionEntry.values;
	return fnMaker(values);
}

const loadFunction = (fnName) => {
	const functionEntry = {...functions[fnName]};
	functionEntry.values = {...functionEntry.values};
	functionEntry.renderFn = generateRenderFn(functionEntry);
	return functionEntry;
}

const CompositionChain = (params) => {
	const [fnList, setFnList] = useState([]);
	// const [nextId, setNextId] = useState(0);

	const renderFnList = fnList.map((entry)=>entry.renderFn);
	const accumulatorFnList = [...(fnList.keys().map((i)=>chain(renderFnList.slice(0,i+1))))];
	console.log("accumulatorFnList", accumulatorFnList);

	// console.log("fnList", fnList);
	// console.log("renderFnList", renderFnList.length, renderFnList);
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
			const newFunctionEntry = loadFunction(name);
			newFunctionEntry.id = id;
			const newFnList = [...fnList];
			newFnList[id] = newFunctionEntry;
			setFnList(newFnList);
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
	// const f = renderFnList[0]?renderFnList.reduceRight(composition):([x,y])=>[x,y];
	const f = chain(renderFnList);//[0]?renderFnList.reduceRight(composition):([x,y])=>[x,y];
	const g = renderFnList[0]?renderFnList.reduce(combine):([x,y])=>[x,y];
	return (<>
		<div className="CompositionChain">
{/*		<div>{[...(accumulatorFnList.entries().map((i, fn)=>(<ViewPort key={i} label={i} f={fn}></ViewPort>)))]}
		</div>*/}
		<div>
		{fnList.map((functionEntry)=>{
			const testPoint = [Math.random(),Math.random()];
			console.log("accumulatorFnList", accumulatorFnList, accumulatorFnList[functionEntry.id], testPoint, accumulatorFnList[functionEntry.id](testPoint));
			return (<FunctionEditor key={functionEntry.id} label={functionEntry.id} accumulatorFn={accumulatorFnList[functionEntry.id]} functionEntry={functionEntry} addFunction={addFunction} fnEntrySetters={getFnEntrySetters(functionEntry.id)}/>)
		})}
		</div>
		{/*<div className="AddFunction">*/}
		<div className="AddFunctionButton" onClick={()=>addFunction("radialGrid")}>&#xFF0B;</div>
		</div>
		<ViewPort className="MainViewer" fn={f}size={400}/>

		</>);
}

export default CompositionChain;