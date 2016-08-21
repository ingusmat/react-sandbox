"use strict";

const React = require('react');
const ReactRouter = require('react-router');
const Link = ReactRouter.Link;
const NotFoundPage = require('./NotFoundPage');
const Layout = require('./Layout');
const Medal = require('./Medal');
const Flag = require('./Flag');
const athletes = require('./../../app/athletes');

class AthletePage extends React.Component {
  render() {
    const id = this.props.params.id;
    this.athlete = athletes.filter((athlete) => athlete.id === id)[0];
    if (!this.athlete) {
      return <NotFoundPage/>
    }
    const headerStyle = {backgroundImage:`url(/img/${this.athlete.cover})`};
    return (
      <Layout>
        <nav className="atheletes-menu">
          {athletes.map(athlete => {
            const status = athlete.id === this.athlete.id ? 'active' : null;
            return <Link key={athlete.id} to={`/athlete/${athlete.id}`} className={status}>
              {athlete.name}
            </Link>
          })}
        </nav>
        <div className="athlete">
          <header style={headerStyle}/>
          <div className="picture-container">
            <img src={`/img/${this.athlete.image}`}/>
            <h2 className="name"><Flag code={this.athlete.country}/> {this.athlete.name} ({this.athlete.country})</h2>
          </div>
          <section className="description">
            Olympic medalist from <strong><Flag code={this.athlete.country} showName="true"/></strong>,  
            born in {this.athlete.birth} (Find out more on <a href={this.athlete.link} target="_blank">Wikipedia</a>).
          </section>
          <section className="medals">
            <p>Winner of <strong>{this.athlete.medals.length}</strong> medals:</p>
            <ul>{
              this.athlete.medals.map((medal, i) => <Medal key={i} {...medal}/>)
            }</ul>
          </section>
        </div>
        <div class="navigateBack">
          <Link to="/">« Back to the index</Link>
        </div>
      </Layout>
    );
  }
}

module.exports = AthletePage;