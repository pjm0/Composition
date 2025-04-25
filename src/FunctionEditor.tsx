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
const functionName = functionEntry.name;

return (<div className="FunctionEditor">
	<ViewPort fn={functionEntry.renderFn}></ViewPort>
	<FunctionSelect functions={functions} functionName={functionName} setFunctionName={props.fnEntrySetters.setFunctionName} ></FunctionSelect>
	<ParamList functionEntry={functionEntry} setFunctionValues={props.fnEntrySetters.setFunctionValues}></ParamList>
	</div>);
}

export default FunctionEditor;