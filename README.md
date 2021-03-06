# Filtration Efficiency of Fibrous Respirators
This interactive graph estimates the filtration efficiency spectrum of idealized fibrous filters. The goal of the experiment is to "design" a respirator which is both efficient at removing particles from the incoming air and breathable.

**Can you design a respirator that filters 95% of particles AND has a pressure drop lower than 343 Pa?**

[**Try it out!**](https://hartery5.github.io/FiltrationEfficiency/)

## Description
This demonstration allows the user to observe how different mechanisms of filtration scavenge differently sized particles in the air. In general, a particle is lost to a respirator via four mechanisms: 
1. direct impaction onto fibers, 
2. interception by fibers, 
3. diffusion onto fibers (diffusiophoresis), 
4. scavenging by the fiber's electric field (electrophoresis & dielectrophoresis). 

Impaction only occurs for the most massive particles, as they carry more momentum, and are less able to navigate the porous structure of the respirator. Interception occurs for particles which are able navigate the porous structure of the respirator, but are still large enough that they will collide with a fiber as they zoom by. Diffusiophoresis is mostly restricted to the smallest particles, which are so small that their trajectory can be altered by the Brownian motion of the surrounding air. As a result of their trajectory being randomly altered by collisions with air molecules, these particles will randomly deposit onto fibers. Lastly, the fibers of a respirator may be charged themseleves, creating electric fields within the respirator. Particles of most sizes will be attracted towards the fibers when an electric field is present. Calculations of the amount of material scavenged by diffusiophoresis, interception and impaction are based on models presented in [2]. These are sometimes referred to as the "mechanical" mechanisms of filtration. Calculations of the amount of material scavenged by both dielectrophoresis and electrophoresis are based on the model of Brown [3].

Watch how the filtration efficiency spectrum changes as you vary the input parameters. By isolating and/or combining changes in input parameters, **try to identify how sensitive each mechanism is to varations in a parameter.** Qualitatively, how sensitive is "Impaction" to particle density? To fiber dielectric constant? **Why?**

This demonstration is also meant to highlight that estimations of the total filtration efficiency will differ based on how particles are detected. The gray spectra highlight the measurement sensitivity of two different methods of detecting particles, "Scanning Mobility Particle Size Spectrometry" (SMPS) and "Photometric". The choice of particle detection method will mean that the "total filtration efficiency" is only valid for a certain range of particles. **Can you design a respirator that will filter more than 95% of particles, no matter which method is measured?**

For more detailed information, consult the [Technical Summary](https://github.com/hartery5/FiltrationEfficiency/blob/main/TECHNICALSUMMARY.md). The code is provided with no warranty of correctness. Real world respirators will behave differently due to non-idealities not captured by this model.

## User-Variable Parameters
In order to predict the number of particles that are lost to the respirator as air flows through it, several parameters are needed:
1. Material Parameters (e.g. solidity, fiber diameter, thickness, dielectric constant, surface charge density), 
2. Particle Parameters (e.g. particle size, density, dielectric constant), and 
3. Test Parameters (particle velocity). 

#### Charge Density
This parameter describes how densely charges are distributed across the surface of the fibers.

#### Filter Thickness
The thickness of the filter.

#### Dielectric Constant (particle)
A physical parameter which describes how a neutral particle will behave in a static electric field. 

#### Fiber Diameter
Self-descriptive

#### Solidity
Related to the porosity (Solidity = 100 - Porosity). 

#### Particle Density
Self-descriptive

#### Dielectric Constant (fiber)
See description for "dielectric constant (particle)."

#### Particle Velocity
Assumed to be equal to the average air velocity through the respirator. However, it is more common to think of filtration in terms of flow rate. A calculation of the mean flow rate of air through a filter with a surface area of ~140 cm² is provided.

## References

[1] Wiedensohler, A. "An approximation of the bipolar charge distribution for particles in the submicron size range." Journal of aerosol science 19.3 (1988): 387-389.

[2] Kulkarni, Pramod, Paul A. Baron, and Klaus Willeke, eds. Aerosol measurement: principles, techniques, and applications. John Wiley & Sons, 2011.

[3] Brown, R. C. "Capture of dust particles in filters by linedipole charged fibres." Journal of Aerosol Science 12.4 (1981): 349-356.

[4] Bohren, Craig F., and Donald R. Huffman. Absorption and scattering of light by small particles. John Wiley & Sons, 2008.
