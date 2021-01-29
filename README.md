# FiltrationEfficiency
Estimates the filtration efficiency of spectrum of idealized fibrous filters.

[Check it out!](https://hartery5.github.io/FiltrationEfficiency/)

## Description
This demonstration allows the user to observe how the different mechanisms of filtration by fibrous filters are affected by:
1. Material Parameters (e.g. solidity, fiber diameter, thickness, dielectric constant, surface charge density), 
2. Particle Parameters (e.g. particle size, density, dielectric constant), and 
3. Test Parameters (particle velocity). 

The calculations assume that the fibrous filter is being tested with a specific size distribution of aerosol particles. The size distribution is assumed to be log-normal, with a count median diameter of 75 nm, and a geometric standard deviation of 1.86. It is assumed that the probability distribution of surface charges on the particles follows the theory of Fuchs (1963) and Gunn (1956) (as is the case for particles exiting a bipolar diffusion charger) [1].

Calculations of the amount of material scavenged by diffusiophoresis, interception and impaction are based on [2]. Calculations of the amount of material scavenged by both dielectrophoresis and electrophoresis are based on [3].

This demonstration is also meant to highlight that estimations of the total filtration efficiency will differ based on how the particle spectrum is measured. While the total filtration efficiency calculated from scanning mobility particle size spectrometer (SMPS) measurements will be sensitive directly to the test particle distribution, the total filtration efficiency calculated from photometric measurements will be sensitive to much coarser particulate as a result of the fundamental nature of light scattering. Estimations of the sensitivity of a photometer are based on calculations of scattering intensity from [4].

Several non-idealities including (but not limited to) aerodynamic particle shape factors, light scattering factors to account for geometric shape, non-singular fiber distribution, etc. have not been accounted for. This is meant to be a (relatively) simple demonstration :smile:. The code is provided with no warranty of correctness.

## User-Variable Parameters
The user may vary the following parameters:

#### Charge Density
This parameter describes the density of charge located at the surface of the fibers. This model assumes that the fibers are line dipoles (e.g. thermoelectrets).

#### Filter Thickness
The thickness of the filter parallel to the mean flow.

#### Dielectric Constant (particle)
The static dielectric constant of the particle. Describes charge separation within a particle when embedded in an external field (mostly).

#### Fiber Diameter
Self-descriptive

#### Solidity
The volume percent of material that the fibers occupy as compared to a homogeneous slab of the filter with the same surface area and thickness.

#### Particle Density
Self-descriptive

#### Dielectric Constant (fiber)
As for the particle.

#### Particle Velocity
Assumed to be equal to the average air velocity through the respirator. While this is the fundamental physical variable, it is more common to think of filtration in terms of flow rate. A calculation of the mean flow rate of air through a filter with a surface area of ~140 cm^2 is provided.

## References

[1] Wiedensohler, A. "An approximation of the bipolar charge distribution for particles in the submicron size range." Journal of aerosol science 19.3 (1988): 387-389.

[2] Kulkarni, Pramod, Paul A. Baron, and Klaus Willeke, eds. Aerosol measurement: principles, techniques, and applications. John Wiley & Sons, 2011.

[3] Brown, R. C. "Capture of dust particles in filters by linedipole charged fibres." Journal of Aerosol Science 12.4 (1981): 349-356.

[4] Bohren, Craig F., and Donald R. Huffman. Absorption and scattering of light by small particles. John Wiley & Sons, 2008.
