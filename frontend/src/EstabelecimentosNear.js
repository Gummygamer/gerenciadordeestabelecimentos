import  React, { Component } from  'react';
import  EstabelecimentosService  from  './EstabelecimentosService';

const  estabelecimentosService  =  new  EstabelecimentosService();

class  EstabelecimentosNear extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        estabelecimentos: [],
        nextPageURL:  ''
    };
    this.nextPage  =  this.nextPage.bind(this);
    this.handleDelete  =  this.handleDelete.bind(this);
}

componentDidMount() {
    var  self  =  this;
    const { match: { params } } = this.props;
   
    estabelecimentosService.getEstabelecimentosNear(params.pk).then(function (result) {
        console.log(result);
        self.setState({ estabelecimentos:  result.data, nextPageURL:  result.nextlink})
    });
}
handleDelete(e,pk){
    var  self  =  this;
    estabelecimentosService.deleteEstabelecimento({pk :  pk}).then(()=>{
        var  newArr  =  self.state.estabelecimentos.filter(function(obj) {
            return  obj.pk  !==  pk;
        });

        self.setState({estabelecimentos:  newArr})
    });
}

nextPage(){
    var  self  =  this;
    console.log(this.state.nextPageURL);        
    estabelecimentosService.getEstabelecimentosByURL(this.state.nextPageURL).then((result) => {
        self.setState({ estabelecimentos:  result.data, nextPageURL:  result.nextlink})
    });
}

render(){
    return (
        <div  className="estabelecimentos--list">
            <table  className="table">
            <thead  key="thead">
            <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            {this.state.estabelecimentos.map( c  =>
                <tr  key={c.pk}>
                <td>{c.pk}  </td>
                <td>{c.nome}</td>
                <td>{c.endereco}</td>
                <td>
                <button  onClick={(e)=>  this.handleDelete(e,c.pk) }> Apagar</button>
                <a  href={"/estabelecimento/" + c.pk}> Alterar</a>
                </td>
            </tr>)}
            </tbody>
            </table>
            <button  className="btn btn-primary"  onClick=  {  this.nextPage  }>Próxima página</button>
        </div>
        );
  }
}
export  default  EstabelecimentosNear;
