import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'

import  EstabelecimentosList from './EstabelecimentosList'
import  EstabelecimentoCreateUpdate  from './EstabelecimentoCreateUpdate'
import  EstabelecimentosNear from './EstabelecimentosNear'
import './App.css';

const BaseLayout = () => (
  <div className="container-fluid">
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Gerenciador de Estabelecimentos</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-item nav-link" href="/">ESTABELECIMENTOS</a>
      <a className="nav-item nav-link" href="/estabelecimento">CRIAR ESTABELECIMENTO</a>

    </div>
  </div>
</nav>  

    <div className="content">
      <Route path="/" exact component={EstabelecimentosList} />
      <Route path="/estabelecimento/:pk"  component={EstabelecimentoCreateUpdate} />
      <Route path="/estabelecimentosnear/:pk"  component={EstabelecimentosNear} />
      <Route path="/estabelecimento/" exact component={EstabelecimentoCreateUpdate} />

    </div>

  </div>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <BaseLayout/>
      </BrowserRouter>
    );
  }
}

export default App;

