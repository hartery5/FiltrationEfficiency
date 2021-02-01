# Technical Summary
## Abstract
This document is intended to be a supplementary guide for formatting a lecture for undergraduate physics students and above. ( WORK IN PROGRESS)

## Theory
### Impaction

### Interception

### Diffusiophoresis

### (Di-) Electrophoresis

## Methods
### Total Filtration Efficiency
Per the current Code of Federal Regulations (CFR), respirators assessed for the N95 standard should be tested with a lognormal size distribution of NaCl particles. The size distribution needs to have a count median diameter of 75 +/- 20 nm and a geometric standard deviation less than 1.86. To measure the particle size distribution, a "Scanning Mobility Particle Size Spectrometer" (SMPS) is used. As such, the size distribution of test particles is labelled "SMPS" on the interactive graph. However, the CFR also states that the upstream and downstream concentration of particles needs to be measured with a **photometer.** A photometer is an instrument which measures the total amount of light scattered light by an aerosol sample, where the light source is typically a laser.¹ Since large particles scatter more light, the measurement will be more sensitive to the abundance of large particles (>100 nm; Mie & Geometric Scatterers), even though they are less abundant than the small particles the respirator is intended to be tested by (<100 nm; Rayleigh scatterers). The sensitivity of the instrument to the test particle spectrum is estimated with light scattering calculations from Bohren & Huffman (1983). The sensitivity of the instrument is dependent on the refractive index of the test particle as well as the wavelength of the laser. Here, calculations assume that the wavelength of the laser is 658 nm (typical of the solid state diodes used in particle detection systems) and that the refractive index of the particle is 1.54 [5]. While NaCl particles are roughly cubic in shape, these calculations assume they are spheres.

The separation in the test particle spectrum and the sensitivity of the photometer leads to known deviations in total fitlration efficiency between photometric and number-based counting systems [6]. If the minimum in filtration efficiency is <100 nm, then the filtration efficiency calculated from CPC or SMPS based measurements will be lower than the filtration efficiency calculated from photometric based measurements (and vice versa). 

A further complication to this calculation is that the CFR stipulate that the particles must be neutralized. In practice this is accomplished with an "aerosol neutralizer", however this is a misnomer. In truth, an aerosol neutralizer is ~50% efficient at neutralizing particles 75 nm in size. The neutralizer is more efficient for smaller particles, and less efficient for larger particles. As a result, there is still a sizeable fraction of the particle size distribution which is charged. Thus, in order to know how many particles are lost due to electrophoresis and dielectrophoresis, the fraction of charged particles needs to be known a priori. Fortunately, the fraction of charged particles exiting an aerosol neutralizer is well-known and can be calculated according to Wiedensohler (1988).

¹A notable exception is the sun photometer, which uses the sun as the light source to measure the optical depth of the atmosphere.

## Questions
Here are some research questions for you to consider:

1. What test conditions would remove the methodological bias between the CPC- and photometer-based measurements?
2. The "total filtration efficiency" is also a function of the charge distribution across the aerosol particles. What is the expected distribution of charges in reality?
