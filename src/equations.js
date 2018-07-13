module.exports = {
  equations: [
    String.raw`
    $$
    P = \frac{Work}{\Delta t} = F \times   \frac{\Delta x}{\Delta t} = F \times \Delta v
    $$
    `,
    String.raw`
    $$
    P_{lift} = F_{lift} \times \Delta v = M_{plane} \times g \times \Delta v
    $$
    `,
    String.raw`
    $$
    F_{lift} = M_{plane} \times g(3) = {M}'_{air} \times \Delta v_{z}
    $$
    `,
    String.raw`
    $$
    \Delta v_{z} = M_{plane} \times \frac{g}{\rho_{air}} \times L^2 \times v_{flight}
    $$
    `,
    String.raw`
    $$
    P_{lift} = M^2_{plane} \times \frac{g^2}{\rho _{air}} \times L^2 \times v_{flight}
    $$
    `,
    String.raw`
    $$
    P_{total} = 2 \times P_{lift'}
    $$
    `,
    String.raw`
    $$
    P_{total} = 2 \times M^2_{plane} \times \frac{g^2}{\rho _{air}} \times L^2 \times v_{flight}
    $$
    `,
    String.raw`
    $$
    \frac{10500 Kw}{0.340Kw/Kg} \approx 31000kg
    $$
    `,
    String.raw`
    $$
    \frac{35 Kw}{0.340Kw/Kg} \approx 100kg
    $$
    `,

    String.raw`
    $$
    E_{battery} = P_{lift} \times T_{flight}
    $$
    `,
    String.raw`
    $$
    \varepsilon _{battery} = 1 \text{MJ/Kg}
    $$
    `,
    String.raw`
    $$
    T_{flight} = \frac{E_{flight}}{2P_{lift}}
    $$
    `,
    String.raw`
    $$
    T_{flight} = \frac{ \nu _{flight}\rho _{air} L^2_{wing}   }{2g} \times \frac{ E_{flight} }{(M_{plane} + M_{battery})^2}
    $$
    `,
    String.raw`
    $$
    T_{flight} = \frac{ \nu _{flight}\rho _{air} L^2_{wing}   }{2g} \times \frac{ E_{flight} }{(M_{plane} +     \frac{E_{flight}}{\varepsilon _{battery}}      )^2}
    $$
    `



  ]
}
