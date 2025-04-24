import { useState } from 'react'
// import { StrictMode } from 'react'
import './FunctionNode.css'
import ViewPort from './ViewPort.tsx'
import ConnectionPanel from './ConnectionPanel.tsx'
import renderFunction from './RenderFunction.tsx'

function analyzeArrowFunction(funcText) {
  const paramsRegex = /\((.*?)\)/;
  const returnsRegex = /=>\s*(\[[^\]]+\]|[^,]+)(\s*,\s*(\[[^\]]+\]|[^,]+))*/;

  const paramsMatch = funcText.match(paramsRegex);
  const returnsMatch = funcText.match(returnsRegex);

  let numParams = 0;
  if (paramsMatch && paramsMatch[1]) {
    numParams = paramsMatch[1].split(',').length;
  }

  let numReturns = 0;
  if (returnsMatch) {
    numReturns = returnsMatch[0].split(',').length;
  }

  return [numParams, numReturns];
}

function formatArrowFunction(arrowFuncInfo) {
  const [numParams, numReturns] = arrowFuncInfo;
  const params = Array.from({ length: numParams }, (_, i) => String.fromCharCode(97 + i));
  const returns = Array.from({ length: numReturns }, (_, i) => String.fromCharCode(97 + numParams + i));

  return `(${params.join(", ")}) => [${returns.join(", ")}]`;
}


//   const [currentId, setCurrentId] = useState(0);

//   const assignId = (
// ) => {
//     const newId = currentId;
//     setCurrentId(id => id + 1);
//     return newId;
//   };


const instantiate = (f, fns) => {
  return ()=>f(...fns.map((g)=>g()));
}

const composition = (f, g) => {
  return (args) => f(...g(args));
}

const evaluate = (f) => f();

const infixFns = ["+", "-", "*", "/"].map((s)=>eval(`(a,b)=>a${s}b`));
// console.log(infixFns.map((f)=>f(1, 2)));

const constantFns = [1,2].map((n)=>(()=>n));
// console.log(constantFns.map(evaluate));

//const add = (a,b)=>a+b;


const instantiatedFns = infixFns.map((f)=>instantiate(f,constantFns));
// console.log(instantiatedFns.map(evaluate));
// const toSource = Function.prototype.toString;
// console.log(constantFns.map(toSource));
// console.log(instantiatedFns.map(toSource));
Function.prototype.toString((n)=>(()=>n));

const CompositionFunctionNode = (props) => {
	const render = () => {

	}
	const DEFAULT_SIZE = 256;
	const func = eval(props.code);
    const [width, setWidth] = useState(DEFAULT_SIZE);
    const [height, setHeight] = useState(DEFAULT_SIZE);
    // const [code, setCode] = useState(props.code);
    const [fn, setFn] = useState(props.fn);
    const [paramCt, returnCt] = props.paramCt, props.returnCt;
    const prototype = formatArrowFunction([paramCt, returnCt]);
    const id = 0;
    // const [id, setId] = useState(props.getNextNodeId());
    console.log("ID: ", id);
	// console.log(props.code, [paramCt, returnCt], prototype);
	const updateCode = (e) => {
		setCode(e.target.value);
	}
	// renderFunction();
	return (<div className='FunctionNode'>
{/*    <ConnectionPanel id={id} direction="out" code="" varList={[...Array(returnCt).keys()]}/>
		<h3 className='Label'>{paramCt} &rarr; {returnCt}</h3>

		<ViewPort fn={fn} width={width} height={height}/>
    <ConnectionPanel id={id} direction="in" code="" varList={[...Array(paramCt).keys()]}/>*/}
	</div>);
}

export default FunctionNode