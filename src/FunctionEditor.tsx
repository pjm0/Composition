import { useState, useEffect } from 'react'
// import { StrictMode } from 'react'
import './FunctionEditor.css'
import ViewPort from './ViewPort.tsx'
import FunctionSelect from './FunctionSelect.tsx'
import ParamList from './ParamList.tsx'
import { functions } from './Functions.js'

const FunctionEditor = (props) => {

const [functionEntry, setFunctionEntry] = [props.functionEntry, props.setFunctionEntry];
const functionName = functionEntry.name;

return (<div className="FunctionEditor">
    <h3 className="Label">{props.functionEntry.id}</h3>
	<ViewPort fn={functionEntry.renderFn}></ViewPort>
	<FunctionSelect functions={functions} functionName={functionName} setFunctionName={props.fnEntrySetters.setFunctionName} ></FunctionSelect>
	<ParamList paramInfo={functionEntry.params} setFunctionValues={props.fnEntrySetters.setFunctionValues}></ParamList>
	</div>);
}

export default FunctionEditor;