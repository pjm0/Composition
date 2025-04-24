import { useState } from 'react'
import './App.css'
import ViewPort from './ViewPort.tsx'
import FunctionEditor from './FunctionEditor.tsx'
import CompositionChain from './CompositionChain.tsx'
import { f, g, h, composition } from './Functions.js'

const comp=composition;

function App() {

  return (
    <>
    <CompositionChain></CompositionChain>
{/*   <FunctionEditor functionName="radialGrid"></FunctionEditor>
<br/>*/}
    <ViewPort fn={f}></ViewPort>
    <ViewPort fn={g}></ViewPort>
    <ViewPort fn={h}></ViewPort>

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
    </>
    )
}

export default App
