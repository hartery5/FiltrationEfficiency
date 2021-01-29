var ctx = document.getElementById('myChart').getContext('2d');
Chart.defaults.global.defaultFontFamily = 'Arial';
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'scatter',

    // The data for our dataset
    data: {
        datasets: [
	    {
		label: 'SMPS Sensitivity',
		fill: true,
		backgroundColor: 'rgba(50,50,50,0.5)',
		borderColor: 'rgba(56,108,176,0.0)',
		data: [],
		order: 0,
            },
	    {
		label: 'Photometer Sensitivity',
		fill: true,
		backgroundColor: 'rgba(150,150,150,0.5)',
		borderColor: 'rgba(56,108,176,0.0)',
		data: [],
		order: 1,
            },
	    {
		label: 'Total',
		fill: false,
		backgroundColor: 'rgb(255, 255, 255,255)',
		borderColor: 'rgb(0, 0, 0)',
		data: [],
		order: 1,
            },
	    {
		label: '(Di-)Electrophoretic',
		fill: true,
		backgroundColor: 'rgb(127, 201, 127)',
		borderColor: 'rgba(127,201,127,0)',
		data: [],
		order: 2,
            },
	    {
		label: 'Diffusiophoretic',
		fill: true,
		backgroundColor: 'rgb(253,192,134)',
		borderColor: 'rgba(253,192,134,0)',
		data: [],
		order: 3,
            },
	    {
		label: 'Interception',
		fill: true,
		backgroundColor: 'rgb(255,255,153)',
		borderColor: 'rgba(255,255,153,0)',
		data: [],
		order: 4,
            },
	    {
		label: 'Impaction',
		fill: true,
		backgroundColor: 'rgb(56,108,176)',
		borderColor: 'rgba(56,108,176,0)',
		data: [],
		order: 5,
            },
	    ]
    },
  
    // Configuration options go here
    options: {
        responsive: true,
        maintainAspectRatio: false,
	tooltips: {enabled: false},
	hover: {mode: null},
        elements: {
            point:{
                radius: 0
            },
	    line: {
		tension: 0
	    }
        },
	layout: {
          padding: {
              top: 12,
	      right: 12
          }
	},
        scales: {
            xAxes: [{
                type: 'logarithmic',
                position: 'bottom',
                ticks: {
                  min: 10,
                  max: 2500,
		  callback: function(value, index, values) {
                      return value;
                  },
                },
		offset: true,
                scaleLabel: {
                  labelString: 'Particle Diameter (nm)',
                  display: true,
                },
		gridLines: {borderDash: [5,5],
			    drawTicks: false,
			    color: 'rgba(0, 0, 0, 0.2)',
			    zeroLineColor: 'rgba(0, 0, 0, 0)',
		},
            }],
            yAxes: [{
		ticks: {
                    min: 0,
                    max: 100,
		    stepsize: 5,
		},
		scaleLabel: {
                    labelString: 'Filtration Efficiency (%)',
                    display: true
		},
		offset: true,
		gridLines: {borderDash: [5,5],
			    drawTicks: false,
			    color: 'rgba(0,0,0,0.2)',
			    zeroLineColor: 'rgba(0,0,0,0)',
		}
            }]
        }
    }
});

let X = [];
let Y1 = [];
let Y2 = [];
let Y3 = [];
let Y4 = [];
let Y5 = [];
let ddiam = 1.022;
let numPts = 256;
let pi = 3.14159;
let k = 1.38e-23;
let mu = 1.81e-5;
let e0 = 8.854e-12;
let C = 1.602e-19;
let T = 293.15;

let _a = 0.05;
let _t = 0.002;
let _df = 3.0e-6;
let _sigma = 200.0e-6;
let _ep = 2.0;
let _ef = 2.0;
let _rhop = 2160.0;
let _U = 0.10;
let MPPS = 1e6;
let YMIN = 1e6;
let FTOT1;
let FTOT2;
let DP;
let Ku;
let E;
let E_el;
let E_diff;
let E_int;
let E_imp;
let Stk;
let Cc;
let R;

let chargeslider;
let thicknessslider;
let epslider;
let fiberslider;
let aslider;
let rhoslider;
let efslider;
let uslider;
function setup() {
  framerate = 10;
  textSize(15);
  noStroke();
  let canvas = createCanvas(1200, 350);
  canvas.parent('myContainer');
  
  let x = 10.0e-9;
  let px = 10.0e-9;
  for(let i =0; i< numPts; i++){
   X.push(x);
   x = px*ddiam;
   px = x;
  }
  print(px*1e9);
  
  textSize(15);
  background(200,200,200);
  fill(0,0,0);
  chargeslider = createSlider(0.0, 255, 0);
  chargeslider.position(250, 25);
  chargeslider.style('width', '80px');
  
  thicknessslider = createSlider(0.0, 255, 0);
  thicknessslider.position(250, 50);
  thicknessslider.style('width', '80px');
  
  epslider = createSlider(0.0, 255, 0);
  epslider.position(250, 75);
  epslider.style('width', '80px');
  
  fiberslider = createSlider(0.0, 255, 192);
  fiberslider.position(250, 100);
  fiberslider.style('width', '80px');

  aslider = createSlider(0.0, 255, 0);
  aslider.position(750, 25);
  aslider.style('width','80px');

  rhoslider = createSlider(0.0,255,255);
  rhoslider.position(750,50);
  rhoslider.style('width','80px');

  efslider = createSlider(0.0,255,0);
  efslider.position(750,75);
  efslider.style('width','80px');

  uslider = createSlider(0.0,255,99);
  uslider.position(750,100);
  uslider.style('width','80px');
  
  updateData(_a,_t,_df,_ef,_ep,_rhop,_U,_sigma);
  updateChart();
}

function addunit(x, s){
    // Helper function to add units to formatted strings.
    let str = nf(x,1,1);
    let list = [str,s];
    return join(list,' ')
}

function draw() {
    background(255,255,255);

    // Grabs values from sliders
    updateValues();
    // Calculations
    updateData();
    // Updates Chart
    updateChart();
    // Updates Text Display
    updateText();
}

function updateValues(){
    // Subfunction to grab values.
    _sigma = 250e-6*chargeslider.value()/255.0;
    _t = 0.009*thicknessslider.value()/255.0 + 0.001;
    _ep = pow(10.0,epslider.value()/128.0) + 1.0;
    _df = 8e-6*fiberslider.value()/255.0+2e-6;
    _a = 0.15*aslider.value()/255.0+0.05;
    _rhop = 1660.0*rhoslider.value()/255.0+500.0;
    _ef = 8.0*efslider.value()/255.0+2.0;
    _U = 0.245*uslider.value()/255.0+0.005;
}


function updateText(){
    // Display Parameters
    textStyle(BOLD);
    text("Parameters",10,15);
    textStyle(NORMAL);
    text("Fiber Charge Density: ",10,32.5);
    text(addunit(_sigma*1e6,'μC m⁻²'),chargeslider.x+chargeslider.width,32.5);
    text("Filter Thickness: ",10,57.5);
    text(addunit(_t*1e3,'mm'),thicknessslider.x+thicknessslider.width,57.5);
    text("Dielectric Constant (particle): ",10,82.5);
    text(addunit(_ep,''),epslider.x+epslider.width,82.5);
    text("Fiber Diameter: ",10,107.5);
    text(addunit(_df*1e6,'μm'),fiberslider.x+fiberslider.width,107.5);
    text("Solidity:",510,32.5);
    text(addunit(100*_a,'%'),aslider.x+aslider.width,32.5);
    text("Particle Density:",510,57.5);
    text(addunit(_rhop,'kg m⁻³'),rhoslider.x+rhoslider.width,57.5);
    text("Dielectric Constant (fiber):",510,82.5);
    text(addunit(_ef,''),efslider.x+efslider.width,82.5);
    text("Particle Velocity:",510,107.5);
    text(addunit(_U*100.,'cm s⁻¹'),aslider.x+aslider.width,107.5);
       
    // Display Diagnostics
    textStyle(BOLD);
    text("Results",10,140);
    textStyle(NORMAL);
    text("Total Filtration Efficiency (SMPS):",10,157.5);
    text(addunit(FTOT1,'%'),275,157.5);
    text("Total Filtration Efficiency (TSI8130A):",10,182.5);
    text(addunit(FTOT2,'%'),275,182.5);  
    text("Methodological Bias (SMPS-8130A):",10,207.5);
    text(addunit(FTOT1-FTOT2,'%'),275,207.5);
    text("Pressure Drop:",10,232.5);
    text(addunit(DP,'Pa'),275,232.5);  
    text("Most Penetrating Particle Size:",10,257.5);
    text(addunit(MPPS*1e9,'nm'),275,257.5);
    text("Flow Rate:",10,282.5);
    text(addunit(_U*100.*141.8/16.67,'L min⁻¹'),275,282.5);
}

function updateChart() {
    // Clear Chart Data
    chart.data.datasets[0].data = [{}];
    chart.data.datasets[1].data = [{}];
    chart.data.datasets[2].data = [{}];
    chart.data.datasets[3].data = [{}];
    chart.data.datasets[4].data = [{}];
    chart.data.datasets[5].data = [{}];
    chart.data.datasets[6].data = [{}];

    // Update Total Filtration Data
    let Y6 = [];
    let Y7 = [];
    YMIN = 1e6;
    YMAX1 = 0;
    YMAX2 = 0;
    MPPS = 1e6;
    for(let i=0;i<X.length;i++){
	if (X[i]*1e9<2500){
	    chart.data.datasets[2].data.push({x:X[i]*1e9,y:Y1[i]});
	    if (Y1[i]<YMIN){
		YMIN = Y1[i];
		MPPS = X[i];
	    }
	    Y6[i] = lognormal(X[i],1.86, 75.0e-9);
	    Y7[i] = lognormal(X[i],1.42, 4.68e-7);
	    if (Y6[i]>YMAX1){
		YMAX1 = Y6[i];
	    }
	    if (Y7[i]>YMAX2){
		YMAX2 = Y7[i];
	    }
	}
    }

    // Custom Autoscale
    if (YMIN>99.0) {
	YMIN = floor(YMIN/0.1)*0.1;
    	chart.options.scales.yAxes[0].ticks.min = YMIN;
    	chart.options.scales.yAxes[0].ticks.stepSize = 0.1;
    } else if (YMIN>90.0) {
	YMIN = floor(YMIN/1.0)*1.0;
    	chart.options.scales.yAxes[0].ticks.min = YMIN;
    	chart.options.scales.yAxes[0].ticks.stepSize = 1;
    } else if (YMIN>50.0) {
    	YMIN = floor(YMIN/5.0)*5.0;
    	chart.options.scales.yAxes[0].ticks.min = YMIN;
    	chart.options.scales.yAxes[0].ticks.stepSize = 5;
    } else {
    	YMIN = floor(YMIN/10.0)*10.0;
    	YMIN = max(0,YMIN);  
    	chart.options.scales.yAxes[0].ticks.min = YMIN;
    	chart.options.scales.yAxes[0].ticks.stepSize = 10;
    }

    let tempy1;
    let tempy2;
    // Component-Wise Plots
    for(let i=0;i<X.length;i++){
	if ((X[i]*1e9<2500) & (Y2[i]>YMIN)){
	    chart.data.datasets[3].data.push({x:X[i]*1e9,y:Y2[i]});
	} else if (X[i]*1e9<2500){
	    chart.data.datasets[3].data.push({x:X[i]*1e9,y:YMIN});
	}
	if ((X[i]*1e9<2500) & (Y3[i]>YMIN)){
	    chart.data.datasets[4].data.push({x:X[i]*1e9,y:Y3[i]});
	} else if (X[i]*1e9<2500){
	    chart.data.datasets[4].data.push({x:X[i]*1e9,y:YMIN});
	}
	if ((X[i]*1e9<2500) & (Y4[i]>YMIN)){
	    chart.data.datasets[5].data.push({x:X[i]*1e9,y:Y4[i]});
	} else if (X[i]*1e9<2500){
	    chart.data.datasets[5].data.push({x:X[i]*1e9,y:YMIN});
	}
	if ((X[i]*1e9<2500) & (Y5[i]>YMIN)){
	    chart.data.datasets[6].data.push({x:X[i]*1e9,y:Y5[i]});
	} else if (X[i]*1e9<2500){
	    chart.data.datasets[6].data.push({x:X[i]*1e9,y:YMIN});
	}
	tempy1 = (Y6[i]/YMAX1)*(100.0 - YMIN) + YMIN;
        tempy2 = (Y7[i]/YMAX2)*(100.0 - YMIN) + YMIN;
	chart.data.datasets[0].data.push({x:X[i]*1e9,y:tempy1});
	chart.data.datasets[1].data.push({x:X[i]*1e9,y:tempy2});
    }
    
    chart.update();
}

function updateData(){
    // Flush Values
    let P = [];
    let P_el = [];
    let P_diff = [];
    let P_int = [];
    let P_imp = [];
    let F = [];
    for(let i=0; i<X.length; i++){
	P.push(0.0);
	P_el.push(0.0);
	P_diff.push(0.0);
	P_int.push(0.0);
	P_imp.push(0.0);
    }

    // Main Calculation Loop
    kuwabara();
    for(let i=0; i<X.length; i++){
	let x = X[i];
	let f = 0;
	cunningham(x);
	stokes(x);
	R = x/_df;
	diffusivity(x);
	peclet(x);
	for(let n=-10; n<11; n++){
	    if(abs(n)>0){
		electrophoresis(x, n);
	    } else {
		dielectrophoresis(x);
	    }
	    diffusiophoresis(x);
	    interception(x);
	    impaction(x);

	    if (E_el<0){
		E_el = 0;
	    }
	    if (E_diff<0){
		E_diff = 0;
	    }
	    if (E_int<0){
		E_int = 0;
	    }
	    if (E_imp<0){
		E_imp = 0;
	    }
	    
	    E = E_el + E_diff + E_int + E_imp;

	    eta_tot = filtration(E);
	    eta_el = filtration(E_el);
	    eta_diff = filtration(E_el+E_diff);
	    eta_int = filtration(E_el+E_diff+E_int);
	    eta_imp = filtration(E_el+E_diff+E_int+E_imp);
	    frac = charging(x, n);

	    P[i] = P[i] + (1.0-eta_tot)*frac;
	    P_el[i] = P_el[i] + (1.0-eta_el)*frac;
	    P_diff[i] = P_diff[i] + (1.0-eta_diff)*frac;
	    P_int[i] = P_int[i] + (1.0-eta_int)*frac;
	    P_imp[i] = P_imp[i] + (1.0-eta_imp)*frac;
	    f = f + frac;
	}
	P[i] = P[i]/f;
	P_el[i] = P_el[i]/f;
	P_diff[i] = P_diff[i]/f;
	P_int[i] = P_int[i]/f;
	P_imp[i] = P_imp[i]/f;
    }


    // Calculate Filtration Efficiency Spectra & Total Filtration Efficiency
    let Cup1 = 0;
    let Cup2 = 0;
    let Cdown1 = 0;
    let Cdown2 = 0;
    for(let i=0; i<X.length; i++){
	Y1[i] = 100.0*(1.0 - P[i]);
	Y2[i] = 100.0*(1.0 - P_el[i]);
	Y3[i] = 100.0*(1.0 - P_diff[i]);
	Y4[i] = 100.0*(1.0 - P_int[i]);
	Y5[i] = 100.0*(1.0 - P_imp[i]);
	Cup1 = Cup1 + lognormal(X[i],1.86,75e-9)*log10(ddiam);
	Cdown1 = Cdown1 + P[i]*lognormal(X[i],1.86,75e-9)*log10(ddiam);
	Cup2 = Cup2 + lognormal(X[i],1.54,4.4e-7)*log10(ddiam);
	Cdown2 = Cdown2 + P[i]*lognormal(X[i],1.42,4.68e-7)*log10(ddiam);
    }
    FTOT1 = 100*(1 - Cdown1/Cup1);
    FTOT2 = 100*(1 - Cdown2/Cup2);

    pressuredrop()
}

function peclet(dp){
    // Peclet Number
    Pe = _df*_U/D;
}

function diffusivity(dp){
    // Particle Diffusivity
    D = k*T*Cc/(3*pi*mu*dp);
}

function stokes(dp){
    // Particle Stokes Number
    Stk = _rhop*pow(dp,2)*Cc*_U/(18*mu*_df);
}

function log10(x){
    // Get log base 10
    return log(x)/log(10);
}

function cunningham(dp){
    // Cunnningham Slip Correction
    let y = 65.0e-9;
    Cc = (1.0 + (y/dp)*(2.33 + 0.966*exp(-0.5*dp/y)));
}

function lognormal(dp,sigma,CMD){
    // Get fraction of aerosol at size dp based on a lognormal PDF with CMD and sigma
    return (1.0/(sqrt(2*pi)*log10(sigma)))*exp(-0.5*pow(log10(dp/CMD),2)/pow(log10(sigma),2))
}

function charging(dp,n){
    // Get fraction of aerosol with charge n based on Boltzmann distribution (Wiedensohler, 1988)
    let f;
    let j = n + 2;
    let o = 0;
    let z = 0.875;
    var a;
    let factor;
    if (abs(n)<3){
	a = [[ -26.3328, -2.3197, -0.0003, -2.3484, -44.4756],
             [35.9044, 0.6175, -0.1014, 0.6044, 79.3772],
             [ -21.4608, 0.6201, 0.3073, 0.4800, -62.8900],
             [7.0867, -0.1105, -0.3372, 0.0013, 26.4492],
             [-1.3088, -0.1260, 0.1023, -0.1553, -5.7480],
             [0.1051, 0.0297, -0.0105, 0.0320, 0.5049 ]];

	for(let i=0;i<6;i++){
	    o = o + a[i][j]*pow(log10(dp*1e9),i);
	}
	
	f = pow(10,o);
    } else {
	factor = 2*pi*e0*dp*k*T/pow(C,2);
	f = (1.0/(sqrt(2*pi*factor)))*exp(-pow(n - factor*log(z),2)/(2*factor));
    }
  return f
}

function kuwabara(){
    // Kuwabara flow parametr
    Ku = -0.5*log(_a) - 0.75 + _a - 0.25*pow(_a,2);
}

function diffusiophoresis(dp){
    // Particles lost to fiber due to diffusion
    // (Baron & Willeke, 2003)
    E_diff = 2.9*pow(Ku,-1.0/3.0)*pow(Pe,-2.0/3.0);
}

function electrophoresis(dp, n){
    // Particles lost to electrophoresis
    // Note 1: Parameterization need smoothing across valid range
    // Note 2: Cunningham Slip correction added (citation needed)
    // (Brown, 1981)
    let Npq = _sigma*abs(n)*C*Cc/(3.0*pi*mu*(1+_ef)*_U*e0*dp);
    //if (E_el<0.1){
    //	E_el = 0.82*Npq;
    //} else {
    E_el = 0.57*pow(Npq,0.83);
    //}
}
    
function dielectrophoresis(dp){
    // Particles lost to fiber due to dielectrophoresis
    // Note 1: Parameterization needs smoothing across valid range
    // Note 2: Cunningham slip correction added (citation needed)
    // (Brown, 1981)
    let Np0 = (1.0/3.0)*((_ep-1.0)/(_ep+2.0))*pow(_sigma,2)*pow(dp,2)*Cc/(e0*pow(1.0+_ef,2)*_df*mu*_U);
    //if (Np0>1.0){
    E_el = 0.47*pow(Np0,0.4);
    //} else {
    //	E_el = pi*Np0;
    //}
}

function interception(dp){
    // Particles lost due to interception with fiber
    // (Baron & Willeke)
    E_int = ((1+R)/(2*Ku))*(2*log(1+R)-1+_a+pow(1+R,-2)*(1-_a/2)-(_a/2)*pow(1+R,2));
}

function impaction(dp){
    // Particles lost from impaction onto fiber
    // (Baron & Willeke)
    E_imp = (Stk/pow(2*Ku,2))*((29.6-28*pow(_a,0.62))*pow(R,2)-27.5*pow(R,2.8));
}

function filtration(E){
    // Particle filtration based on efficiency E.
    // (Baron & Willeke)
    let eta = 1.0 - exp(-4*_a*E*_t/(pi*_df*(1-_a)));
    return eta
}

function pressuredrop(){
    // Pressure Drop across fibrous filter
    // (Davies, 1954)
    DP = (mu*_U*_t/pow(_df,2))*(64*pow(_a,1.5)*(1+56*pow(_a,3)));
}
