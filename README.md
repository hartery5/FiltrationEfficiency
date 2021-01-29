# FiltrationEfficiency
Estimates the filtration efficiency of spectrum of idealized fibrous filters.

Check it out: https://hartery5.github.io/FiltrationEfficiency/.

## Description
This demonstration allows the user to observe how different mechanisms of filtration are affected by material parameters (solidity, fiber diameter, thickness, dielectric constant, surface charge density), particle parameters (particle size, density, dielectric constant), and test parameters (particle velocity). The calculations assume that the filter is being tested with a specific size distribution of aerosol particles. The size distribution is assumed to be log-normal, with a count median diameter of 75 nm, and a geometric standard deviation of 1.86. Surface charges on the particles are assumed to follow the Boltzmann distribution (as is the case for particles exiting a Bipolar Diffusion charger) [1].

Calculations of the amount of material scavenged by diffusiophoresis, interception and impaction are based on [2]. Calculations of the amount of material scavenged by both dielectrophoresis and electrophoresis are based on [3].

This demonstration is also meant to highlight that estimations of the total filtration efficiency will differ based on how the particle spectrum is measured. While the total filtration efficiency measured by scanning mobility particle size spectrometers (SMPS's) will be sensitive directly to the test particle distribution, the total filtration efficiency measured by a photometer will sensitive to much coarser particulate as a result of the fundamental nature of light scattering. Estimations of the sensitivity of a photometer are based on calculations of scattering intensity from [4].

Several non-idealities including aerodynamic particle shape factors and light scattering factors have not been accounted for. This is meant to be a (relatively) simple exercise :).

### Parameters
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
The velocity of the particle through the respirator. Corresponds to the flow rate of air through a respirator with a surface area of ~150 cm^2.

## References

[1] Wiedensohler, A. "An approximation of the bipolar charge distribution for particles in the submicron size range." Journal of aerosol science 19.3 (1988): 387-389.

[2] Kulkarni, Pramod, Paul A. Baron, and Klaus Willeke, eds. Aerosol measurement: principles, techniques, and applications. John Wiley & Sons, 2011.

[3] Brown, R. C. "Capture of dust particles in filters by linedipole charged fibres." Journal of Aerosol Science 12.4 (1981): 349-356.

[4] Bohren, Craig F., and Donald R. Huffman. Absorption and scattering of light by small particles. John Wiley & Sons, 2008.
