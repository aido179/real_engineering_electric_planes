import React, { Component } from 'react';
import './App.css';
import * as output from './outputCalculations.js';
import MathJax from 'react-mathjax-preview'
import eq from './equations.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //constants
      densityOfAir:1.2,
      gravity:9.8,
      frontArea:7.2,
      meanAccel:0.112,
      battWheelEff:0.85,
      brakeEff:0.97,
      totalWeight:36000,
      roadGradient:0,
      timeOnGrade:0,
      packingBurden:0.48,
      //Variables
      range:804670,
      avgVelocity:22.352,
      meanRollingResistance:0.0063,
      coeffDrag:0.36,
      energyDensity:250,
      battCost:190,
      //outputs
      dragComponent: 0,
      rollingResistanceComponent:0,
      roadGradientComponent:0,
      inertialComponent:0,
      battCapWS: 0,
      battCapKWH: 0,
      weight:0,
      cost:0,
      //Conversions
      conversionMPH: 50,
      conversionMPS: 22.352,
      conversionMiles: 500,
      conversionMetres: 804670,
    };

    this.handleChange = this.handleChange.bind(this);
    this.milesToMetres = this.milesToMetres.bind(this);
    this.metresToMiles = this.metresToMiles.bind(this);
    this.mphToMps = this.mphToMps.bind(this);
    this.mpsToMph = this.mpsToMph.bind(this);
  }
  handleChange(event){
    //update state with new value
    let state = event.target.getAttribute("data-var");
    this.setState({[state]: event.target.value});
    //calculate outputs
    this.calculateOutput();
    //force new values to be rendered
    this.forceUpdate();
  }
  calculateOutput(){
    //uses special form of set state acceptinga  function so that asynchronous
    //state updates don't screw things up.
    this.setState((prevState, props)=>({dragComponent:               output.DragComponent(prevState)}));
    this.setState((prevState, props)=>({rollingResistanceComponent:  output.RollingResistanceComponent(prevState)}));
    this.setState((prevState, props)=>({roadGradientComponent:       output.RoadGradientComponent(prevState)}));
    this.setState((prevState, props)=>({inertialComponent:           output.InertialComponent(prevState)}));
    this.setState((prevState, props)=>({battCapWS:                   output.BattCapWS(prevState)}));
    this.setState((prevState, props)=>({battCapKWH:                  output.BattCapKWH(prevState)}));
    this.setState((prevState, props)=>({weight:                      output.Weight(prevState)}));
    this.setState((prevState, props)=>({cost:                        output.Cost(prevState)}));
  }
  milesToMetres(event){
    this.setState({conversionMiles: event.target.value});
    this.setState({conversionMetres: (event.target.value*1609.34).toFixed(2)});
  }
  metresToMiles(event){
    this.setState({conversionMetres: event.target.value});
    this.setState({conversionMiles: (event.target.value/1609.34).toFixed(2)});
  }
  mphToMps(event){
    this.setState({conversionMPH: event.target.value});
    this.setState({conversionMPS: (event.target.value*0.44704).toFixed(2)});
  }
  mpsToMph(event){
    this.setState({conversionMPS: event.target.value});
    this.setState({conversionMPH: (event.target.value/0.44704).toFixed(2)});
  }
  componentDidMount(){
    this.calculateOutput();
    this.forceUpdate();
  }
  render() {
    return (
      <div className="App">
        <div className="patreon-link">
          <a href="https://www.patreon.com/realengineering">
            <img className="img-third" alt="patreon logo" src="/img/patreon.png"/>
          </a>
        </div>
        <header className="App-header">
          <img src="/img/logo500.png" className="App-logo" alt="logo" />
          <div className="Video-box">
            <iframe title="youtube video"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/YzRlga2-Hho"
              frameBorder="0"
              gesture="media"
              allow="encrypted-media"
              allowFullScreen>
            </iframe>
          </div>
          <h1 className="App-title">Are Electric Planes Possible?</h1>
        </header>
        <article className="App-content">
          <section className="row">
            <div className="col">
              <p>
                Over the past decade we have seen multiple industries looking to transition to renewable fuel sources, and while we have been making huge strides in the production of renewable energy, the technology required to allow every industry to use it has not kept pace.
              </p>
              <p>
                In theory we could replace every coal burning power plant in the world in the morning, and manage just fine, <strong>IF</strong> we had a reasonable way of storing that energy cost effectively and efficiently. This energy storage dilemma is slowing our adoption of renewable energy, and one of the industries this is most apparent is the aviation and aerospace industry.
              </p>
              <p>
                Elon Musk is running around pushing electric vehicles and solar powered homes, yet every time a Falcon 9 rocket launches it burns 147 tonnes of fossil fuel. Boeing and Airbus are in a constant battle to create the most fuel efficient plane, allowing their customers to save on ever increasing fuel costs and increase their bottom line.
              </p>
              <p>
                So what gives? Why isn’t every industry on earth clawing at the prospect of transitioning to renewable energy fuels? The aviation industry has one massive hurdle to overcome before it can successful adopt renewable energy. The energy density of our storage methods.
              </p>
            </div>
          </section>
          <div className="row">
            <div className="col col100 text-center">
              <img src="/img/elon.png"
              alt="An elongated muskrat."
              title="An elongated muskrat."
              className="smallImage"/>
            </div>
          </div>


          <section className="row">
            <div className="col">
              <h2>Energy Density</h2>
              <p>
                Energy density is a measure of the energy we can harness from 1 kilogram of an energy source. For kerosene, the fuel jet airliners use, that’s about 43 MJ/kg. Currently even our best lithium ion batteries come in around 1 MJ/kg. Battery energy is over 40 times heavier than jet fuel.
              </p>
              <h3>Explain that like I'm 5...</h3>
              <p>
                A plane flies when lift equals the weight of the plane, so when we increase the weight, we have to increase the lift, which requires more power. Needing more power means we need more batteries, which increases the weight again. So are caught in a catch 22 of design. We could end the video there, but going by the demographic breakdown of this channel, we can go a little deeper. To really understand why this is such a difficult problem, let’s do some back of the envelope calculations to convert two planes, the Airbus a320 and a Cessna, to battery power.
              </p>
              <p>
                Ultimately, we want to know the power requirements of flight and how it will draw on the energy supply of the battery. The work-energy theorem tells us that Work = F × ∆x, where delta x is the distance over which a force acts. Power is work per unit time, so P equals work divided time.  (Work/∆t). Inserting our equation for work and we get an equation for power that equals Force multiplied by distance divided by time, otherwise known as velocity. Here delta v is the speed of whatever is getting pushed on.
              </p>
            </div>
          </section>

          <MathJax math={eq.equations[0]} />

          <section className="row">
            <div className="col">
              <p>
                When a plane is flying at a constant height, we know that the the force of lift and the force of gravity are balanced. That means the upward force of lift (Flift) has to be equal in magnitude to the downward pull of gravity, which equals the mass of the plane multiplied by gravity (Mplane × g).
              </p>
              <p>
                So, the power required for lift equals the mass of the plane multiplied by gravity and delta V.
              </p>
            </div>
          </section>

          <MathJax math={eq.equations[1]} />

          <section className="row">
            <div className="col">
              <p>
                The question is, what is delta v? It’s the downward velocity of the air that the plane pushes downward. So let’s call it ∆vz. To find its value, we have to think about the mechanism of lift.
              </p>
              <p>
                The lift an airplane provides is equal to the rate it delivers downward momentum to the air it displaces, which has three big pieces: 1. the downward velocity of the air, ∆vz, 2. the forward velocity of the plane, vflight, 3. and the relevant cross-sectional area of an airplane. Whatever the area comes out to, the plane needs to stream momentum downward at the rate equal to the mass of the plane multiplied by gravity.  (˙p = Mplane × g).
              </p><p>
                This means that the force of gravity must be equal in magnitude to the downward velocity of the deflected air, times the rate at which air mass gets deflected:
              </p>
            </div>
          </section>

          <MathJax math={eq.equations[2]} />

          <section className="row">
            <div className="col">
              <p>
                The mass of air that the plane affects is simply the volume of the cylinder that it sweeps out per unit time, times the density of air. If we call the relevant cross section Asweep, then the volume it sweeps out per unit time is Asweep × vflight. Therefore M˙air = ρair × Asweep × vflight (5)
              </p>
              <p>
                The only outstanding quantity is the area (Asweep). This changes with the relative velocity of the plane and the air around it, but at cruising speed, the plane dissipates vortices that have roughly the radius of the length of the plane’s wings. Thus the relevant area scales like Asweep ∼ L2 . Putting it all together, we have FLift = ρair × L2 × vflight × ∆vz (6) Here it’s clear that the plane is sweeping out a tube of air and shifting it downward. Moreover, that downward acceleration of air is equal to the downward pull of gravity on the plane. It avoids falling by constantly paying the tax of streaming momentum downward via the air.
              </p>
              <p>
                Now we can solve for ∆vz in terms of quantities we can easily measure.
              </p>
            </div>
          </section>

          <MathJax math={eq.equations[3]} />

          <section className="row">
            <div className="col">
              <p>
                Plugging this in to our power equation, the power needed for lift is:
              </p>
            </div>
          </section>

          <MathJax math={eq.equations[4]} />

         <section className="row">
           <div className="col">
             <p>
               With this equation at hand, we can start noticing what variables really impact the energy requirements of the plane. Notice that as the plane flies faster the power drawn by the engine actually gets smaller, but this equation neglects to consider drag. It just so happens, that the total power needed to fly is minimized when the force of lift and the force of drag become equal, so we simply to to double our power requirements to get our total power requirement at cruising speed.
             </p>
           </div>
         </section>

         <MathJax math={eq.equations[5]} />
         <MathJax math={eq.equations[6]} />

         <section className="row">
           <div className="col">
             <p>
               Now we are getting a real picture of why increasing the mass of a plane is such a huge issue. The mass component of this equation is not only squared, but also doubled. Doubling the mass will increase our power requirements 8 fold.
             </p><p>
               With this knowledge in hand, let’s start calculating the real world consequences of converting an Airbus a320 and a Cessna to battery power.
             </p>
           </div>
        </section>

        [TAB.2 here]

        <section className="row">
          <div className="col">
            <p>
              To start, we can take the battery weight to be the usual mass fraction that’s devoted to fuel, about ≈ 20% for both. We also need to take into account the fact that at the cruising height, the atmosphere is much thinner than at ground level. For the Cessna, the density falls by factor of 2, and for the Airbus, a factor of 3. Let’s be generous, and take the specific power of leading edge Li-ion systems, about 0.340 kW/kg. To meet the power demand, the Airbus and would demand:
            </p>
          </div>
        </section>

        <MathJax math={eq.equations[7]} />

        <section className="row">
          <div className="col">
            <p>
              while the Cessna would need:
            </p>
          </div>
        </section>

        <MathJax math={eq.equations[8]} />

        <section className="row">
          <div className="col">
            <p>
              batteries respectively. For the Cessna, this compares very favorably with the typical weight of fuel it would carry otherwise, and it isn’t terrible for the Airbus, but planes aren’t drag cars. It’s great if we can get them up to speed for a spurt, but we want to make flights of standard duration.
            </p>
            <p>
              For the Airbus that’s a 7 hr flight from JFK to LHR and for a Cessna, that might be a four hour flight from New York to South Carolina. The energy capacity required for a trip is given by:
            </p>
          </div>
        </section>

        <MathJax math={eq.equations[9]} />

        <section className="row">
          <div className="col">
            <p>
              Again if we use leading edge figures for Lithium ion battery capacity, we can store about 1 MJ/kg.
            </p>
          </div>
        </section>

        <MathJax math={eq.equations[10]} />
        [TAB 3]

        <section className="row">
          <div className="col">
            <p>
              For the Cessna, the equivalent battery weight is around 500 kg or just less than two thirds the weight of the plane without fuel. For the A320, the required battery weight is around 250 000 kilograms or about 4 times the weight of the empty airplane! Compared to the typical 20% that’s allocated to fuel, this is devastating. Cost:
            </p>
            <p>
              We found the required battery size by simply equating the energy needed for the standard trip to the energy content of a battery. In reality, whatever extra battery weight we add is going to increase the power required, and shorten our range. For the Cessna, the required battery weight isn’t colossally different than the weight of jet fuel that would be in its place, so we shouldn’t expect this correction to have devastating effect on the range. For the Airbus however, the battery weight is more than four times the plane itself, so the range will be affected significantly.
            </p>
            <p>
              Now that we half a base figure for how heavy the batteries are going to be, we can calculate the actual range, let’s assume that at the very least, we’re not going to accept reduction in flight speed or increases in total energy used per flight. How much is the range diminished for flights of similar speed and total energy?
            </p>
          </div>
        </section>

        <MathJax math={eq.equations[11]} />
        <MathJax math={eq.equations[12]} />
        <MathJax math={eq.equations[13]} />

        <section className="row">
          <div className="col">
            <p>
              As expected, this downgrades the Cessna’s flight time from 4 hr to about 2 hr. Not negligible, but livable. A Cessna usually holds about 150 kg fuel and another couple 100 kg of passengers and luggage. It is easy to imagine endowing the Cessna with the required battery capacity through a combination of lowering the carrying capacity, lowering speed and increasing wingspan, lighter parts with more efficient electric engines. In fact, this is exactly what we are seeing with small electric aircraft coming to market in the past few years, like the Alpha Electro.
            </p>
            <p>
              However, the downgrade is substantial for the a320, taking us from 7 hours down to just 20 min, less than one twentieth of the way across the Atlantic.
            </p>
            <p>
              If we plot the flight duration as a function of battery mass for both planes, we can see that the Cessna is already sitting around the optimum and could actually increase our battery capacity and improve our flight range. It’s a different story for the airbus, where we overshot our optimum battery capacity significantly. Reducing our battery weight to 60 tonnes will increase our flight duration by about 15 minutes. So we could last a little bit longer before crashing into the ocean, assuming we could find a place to fit those 60 tonnes of batteries in the first place.
            </p>
            <p>
              But we have been seeing great strides with short range small aircraft coming to market, and if we fly very slowly with low drag wings we can even build a solar powered drone that never has to land. We won’t be seeing airliners using electric engines any time soon, unless we can find a more energy dense medium for storing that energy. We will be exploring one such possibility in our next video. The Truth about Hydrogen.
            </p>
          </div>
        </section>

  <MathJax math={eq.equations[0]} />


        </article>
        <footer>
          <a href="https://www.youtube.com/channel/UCR1IuLEqb6UEA_zQ81kwXfg"><img src="/img/logo500.png" className="footer-icon" alt="logo" /></a>
          <a href="https://github.com/aido179/real_engineering_battery"><img src="/img/GitHub-Mark-Light-64px.png" className="footer-icon" alt="logo" /></a>
          <a href="http://apbsoftware.ie"><img src="/img/apb.png" className="footer-icon" alt="logo" /></a>

        </footer>
      </div>
    );
  }
}

class VariableInput extends Component{
  render() {
    let val = this.props.state[this.props.var];
    return (
      <input type="number" data-var={this.props.var} onChange={this.props.handleChange} value={val}></input>
    )
  }
}

export default App;
