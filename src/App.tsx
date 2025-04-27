import { useState } from 'react'
import '../style/App.css'
import ViewPort from './ViewPort.tsx'
import FunctionEditor from './FunctionEditor.tsx'
import CompositionChain from './CompositionChain.tsx'
import { f, g, h, composition } from './Functions.js'

const comp=composition;

function App() {

  return (
    <>
    <CompositionChain></CompositionChain>
    </>
    )
}

export default App
