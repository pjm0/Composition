import { useRef, useEffect } from 'react'
// import { StrictMode } from 'react'
import '../style/ViewPort.css'

const ViewPort = ({fn=(([x,y])=>[1,0,1]), size=128}) => {
	const canvas = useRef(null);
	
	useEffect(()=>{
		const ctx = canvas.current.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const f = fn;
		const plotFn = (f, ctx) => {
			for (let px = 0; px < size; px += 1) {
				const x = (px / size);//*2-1;
				for (let py = 0; py < size; py += 1) {
					const y = (py / size);//*2-1;
					let returnValue 
					try {
						returnValue = f([x,y]);
					} catch (e) {
						returnValue = [1, 0, 1];
					}
					const color = Array.isArray(returnValue) ? returnValue : 
					[returnValue, returnValue, returnValue];
					const R = color[0];
					const G = color[1];
					const B = color.length >= 3 ? color[2] : 0;

					ctx.fillStyle = `rgb(${R * 255}, ${G * 255}, ${B * 255})`;
					ctx.fillRect(px, py, 1, 1);
				}
			}
		}
		plotFn(f, ctx);
	}, [fn]);
	return (
		<>
		<canvas className="ViewPort" ref={canvas} width={size} height={size}></canvas>
		</>
		);
}

export default ViewPort