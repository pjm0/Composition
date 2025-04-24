import { useState } from 'react'
import './App.css'
import ViewPort from './ViewPort.tsx'
import FunctionEditor from './FunctionEditor.tsx'
import CompositionChain from './CompositionChain.tsx'

// const comp = (f, g) => {
//   return (args) => f(g(args));
// }
// const mod = (a,b)=>((a%b)+b) % b;
// const nSin = (n)=>0.5+0.5*Math.sin(n*2*Math.PI);
// const nCos = (n)=>0.5+0.5*Math.cos(n*2*Math.PI);
// const nAtan2 = (y, x)=>Math.atan2(y,x)/2/Math.PI;

// const f = ([x,y])=>[mod(nAtan2(y,x)*4,1), mod(2*(x**2 + y**2)**0.5, 1)];

// const h = ([x,y])=>[mod(y+0.5,1),mod(x+0.5,1)];


function App() {

  return (
    <>
    <CompositionChain></CompositionChain>
 {/*   <FunctionEditor functionName="radialGrid"></FunctionEditor>
    <br/>*/}
{/*   <ViewPort fn={f}></ViewPort>
   <ViewPort fn={g}></ViewPort>
   <ViewPort fn={h}></ViewPort>*/}
{/*   
   <ViewPort fn={comp(f,f)}></ViewPort>
   <ViewPort fn={comp(f,g)}></ViewPort>
   <ViewPort fn={comp(f,h)}></ViewPort>

   <ViewPort fn={comp(g,f)}></ViewPort>
   <ViewPort fn={comp(g,g)}></ViewPort>
   <ViewPort fn={comp(g,h)}></ViewPort>

   <ViewPort fn={comp(h,f)}></ViewPort>
   <ViewPort fn={comp(h,g)}></ViewPort>
   <ViewPort fn={comp(h,f)}></ViewPort>

   <ViewPort fn={comp(f,comp(f,f))}></ViewPort>
   <ViewPort fn={comp(f,comp(f,g))}></ViewPort>
   <ViewPort fn={comp(f,comp(f,h))}></ViewPort>
   <ViewPort fn={comp(g,comp(f,f))}></ViewPort>
   <ViewPort fn={comp(g,comp(f,g))}></ViewPort>
   <ViewPort fn={comp(g,comp(f,h))}></ViewPort>
   <ViewPort fn={comp(h,comp(f,f))}></ViewPort>
   <ViewPort fn={comp(h,comp(f,g))}></ViewPort>
   <ViewPort fn={comp(h,comp(f,h))}></ViewPort>

   <ViewPort fn={comp(g,f)} size={256}></ViewPort>
   <ViewPort fn={comp(g,g)} size={256}></ViewPort>
   <ViewPort fn={comp(g,h)} size={256}></ViewPort>
   <ViewPort fn={comp(g,f)} size={256}></ViewPort>
   <ViewPort fn={comp(g,g)} size={256}></ViewPort>
   <ViewPort fn={comp(g,h)} size={256}></ViewPort>
   <ViewPort fn={comp(g,f)} size={256}></ViewPort>
   <ViewPort fn={comp(g,g)} size={256}></ViewPort>
   <ViewPort fn={comp(g,h)} size={256}></ViewPort>

   <ViewPort fn={comp(h,f)} size={256}></ViewPort>
   <ViewPort fn={comp(h,g)} size={256}></ViewPort>
   <ViewPort fn={comp(h,f)} size={256}></ViewPort>*/}
    </>
    )
}

export default App
