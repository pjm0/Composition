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
		x += xShift;
		y += yShift;
		return [mod((nAtan2(y,x)+angleShift)*angleDivisions,1),
			mod(radiusDivisions*(x**2 + y**2)**0.5, 1)]
		};	
	};

	const axialGrid = ({xScale, yScale, xShift, yShift}) => {
		return ([x,y])=>[mod((x+xShift)*xScale, 1), mod((y+yShift)*yScale, 1)];;
	};

	const functions = {		
		"radialGrid": {
			f: radialGrid,
			size: [5, 2, 2],
			params: {
				angleDivisions: {min: 1, max: 32, step: 1, defaultValue: 1},
				radiusDivisions: {min: 1, max: 16, step: 1, defaultValue: 1}, 
				xShift: {min: 0, max: 1, step: 0.01, defaultValue: 0},
				yShift: {min: 0, max: 1, step: 0.01, defaultValue: 0},
				angleShift: {min: 0, max: 1, step: 0.01, defaultValue: 0}
			},
			values: {
				angleDivisions: 1,
				radiusDivisions: 1, 
				xShift: 0,
				yShift: 0,
				angleShift: 0
			}
		},
		"axialGrid": {
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
		}
	};



export { functions, composition, f, g, h };


