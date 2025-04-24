import { useState } from 'react'
// import { StrictMode } from 'react'
import './CompositionChain.css'
import ViewPort from './ViewPort.tsx'
import FunctionEditor from './FunctionEditor.tsx'
import ParamList from './ParamList.tsx'
import { composition, functions } from './Functions.js'

const loadFunction = (fnName) => {
	const functionEntry = functions[fnName];
	functionEntry.f = functions[fnName].f;
	functionEntry[fnName] = fnName;
	functionEntry.renderFn = functionEntry.f(functionEntry.values);
	return functionEntry;
}


const CompositionChain = (params) => {
	const [fnList, setFnList] = useState([]);
	const [nextId, setNextId] = useState(0);

	const addFunction = (fnName) => {
		const functionEntry = loadFunction(fnName);
		functionEntry.id = nextId;
		setNextId(nextId+1);
		console.log("functionEntry", functionEntry);
		setFnList([...fnList, functionEntry]);
	}

	const getFnEntrySetters = (id) => {
		const functionEntry = fnList[id];

		const generateRenderFn = () => {
			const fnMaker = functionEntry.f;
			const values = functionEntry.values;
			return fnMaker(values);
		}

		const setFnEntry = (functionEntry) => {
			const newFnList = [...fnList];
			newFnList[id] = {...functionEntry};
			functionEntry.id = id;
			const fnMaker = functionEntry.f;
			const values = functionEntry.values;
			functionEntry.renderFn = generateRenderFn();
			setFnList(newFnList);
		}

		const setFunctionName = (name) => {
			const newFunctionEntry = functions[name];
			newFunctionEntry.fnName = name;
			newFunctionEntry.values = Object.keys(newFunctionEntry.params).map((name)=>[name, paramEntry[name]["defaultValue"]]);
			newFunctionEntry.renderFn = generateRenderFn();

			setFnEntry(newFunctionEntry);
		}

		const setFunctionValues = (label, value) => {
			const newFunctionEntry = {...functionEntry};
			newFunctionEntry.values[label] = value;
			newFunctionEntry.renderFn = generateRenderFn();
			setFnEntry(newFunctionEntry);
		}
		return {setFnEntry, setFunctionName, setFunctionValues}
	}

	return (<div className="CompositionChain">
		<div>
		{fnList.map((functionEntry)=>(<FunctionEditor key={functionEntry.id} functionEntry={functionEntry} addFunction={addFunction} fnEntrySetters={getFnEntrySetters(functionEntry.id)}/>))}
		</div>
		<button className="AddFunction" onClick={()=>addFunction("radialGrid")}>+</button>
		<ViewPort/>
		</div>);
}

export default CompositionChain;