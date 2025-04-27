const instantiate = (f, fns) => {
	return ()=>f(...fns.map((g)=>g()));
}

const evaluateFn = (f) => f();
const makeInfixFn = (s)=>eval(`(a,b)=>a${s}b`);
const makeConstantFn = (n)=>(()=>n);
const infixFns = ["**", "*", "/", "%", "+", "-"].map(makeInfixFn);
const constantFns = [10,20].map(makeConstantFn);

const instantiatedFns = infixFns.map((f)=>instantiate(f,constantFns));
// console.log(instantiatedFns.map(evaluateFn));
const doublyInstantiatedFns = instantiatedFns.map((f)=>instantiate(f,instantiatedFns.slice(0,1)));


const composition = (f, g) => {
	return (args) => f(g(args));
}

	const chain = (functionList) => {
		console.log("chain", functionList)
		return functionList[0]?functionList.reduceRight(composition):([x,y])=>[x,y];
	}


const mod = (a,b)=>((a%b)+b) % b;
const nSin = (n)=>0.5+0.5*Math.sin(n*2*Math.PI);
const nCos = (n)=>0.5+0.5*Math.cos(n*2*Math.PI);
const nAtan2 = (y, x)=>Math.atan2(y,x)/2/Math.PI;

const f = ([x,y])=>[mod(nAtan2(y,x)*4,1), mod(2*(x**2 + y**2)**0.5, 1)];
const g = ([x,y])=>[mod(x*2, 1), mod(y*2, 1)];
const h = ([x,y])=>[mod(y+0.5,1),mod(x+0.5,1)];

const radialGrid = ({angleDivisions,
	radiusDivisions,
	xShift,
	yShift,
	angleShift}) => {
	return ([x,y])=>{
		// x += xShift;
		// y += yShift;
		x = (x-xShift)*2;
		y = (y-yShift)*2;
		return [mod((nAtan2(y,x)-angleShift)*angleDivisions,1),
			mod(radiusDivisions*(x**2 + y**2)**0.5, 1)]
		};	
	};

	const axialGrid = ({xScale, yScale, xShift, yShift}) => {
		return ([x,y])=>[mod(mod(x+xShift,1)*xScale, 1), mod(mod(y+yShift,1)*yScale, 1)];;
	};

	const skew = (skewAngle) => {
		return ([x,y])=>{
			return [x*nCos(skewAngle)-y*nSin(skewAngle), x*nSin(skewAngle)+y*nCos(skewAngle)];
		}
	}
	const shift = (xShift, yShift) => {
		return ([x,y])=>{
			return [mod(x+xShift, 1), mod(y+yShift, 1)];
		}
	}

	const cosines = () => {
		return ([x,y])=>[nCos(x),nCos(y)]
	}

	const unsigned = () => {
		return ([x,y])=>[(x-0.5)*2,(y-0.5)*2]
	}
	const modulo = () => {
		return ([x,y])=>[mod(x,1),mod(y,1)]
	}

	const functions = {		
		"radialGrid": {
			name: "radialGrid",
			f: radialGrid,
			size: [5, 2, 2],
			params: {
				angleDivisions: {min: 1, max: 32, step: 1, defaultValue: 1},
				radiusDivisions: {min: 1, max: 16, step: 1, defaultValue: 1}, 
				xShift: {min: 0, max: 1, step: 0.01, defaultValue: 0.5},
				yShift: {min: 0, max: 1, step: 0.01, defaultValue: 0.5},
				angleShift: {min: 0, max: 1, step: 0.01, defaultValue: 0}
			},
			values: {
				angleDivisions: 1,
				radiusDivisions: 1, 
				xShift: 0.5,
				yShift: 0.5,
				angleShift: 0
			}
		},
		"axialGrid": {
			name: "axialGrid",
			f: axialGrid,
			size: [4, 2, 2],
			params: {
				xScale: {min: 1, max: 32, step: 1, defaultValue: 1},
				yScale: {min: 1, max: 32, step: 1, defaultValue: 1},
				xShift: {min: 0, max: 1, step: 0.01, defaultValue: 0},
				yShift: {min: 0, max: 1, step: 0.01, defaultValue: 0}
			},
			values: {
				xScale:  1,
				yScale:  1,
				xShift:  0,
				yShift:  0
			}
		},
		"cosines": {
			name: "cosines",
			f: cosines,
			size: [0, 2, 2],
			params: {},
			values: {}
		},
		"unsigned": {
			name: "unsigned",
			f: unsigned,
			size: [0, 2, 2],
			params: {},
			values: {}
		},
		"modulo": {
			name: "modulo",
			f: modulo,
			size: [0, 2, 2],
			params: {},
			values: {}
		},
		"shift": {
			name: "shift",
			f: shift,
			size: [2, 2, 2],
			params: {
				xShift: {min: 0, max: 1, step: 0.01, defaultValue: 1},
				yShift: {min: 0, max: 1, step: 0.01, defaultValue: 1}
			},
			values: {
				xShift: 0,
				yShift: 0  
			}
		}
	};



	export { functions, composition, chain, f, g, h };


