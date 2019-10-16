import React, { Component } from 'react';
import EstabelecimentosService from './EstabelecimentosService';

const estabelecimentosService = new EstabelecimentosService();

class EstabelecimentoCreateUpdate extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        const { match: { params } } = this.props;
        if(params && params.pk)
        {
          estabelecimentosService.getEstabelecimento(params.pk).then((c)=>{
            this.refs.nome.value = c.nome;
            this.refs.endereco.value = c.endereco;
          })
        }
      }

      handleCreate(){
        estabelecimentosService.createEstabelecimento(
        {
            "nome": this.refs.nome.value,
            "endereco": this.refs.endereco.value,
        }          
        ).then((result)=>{
          alert("Estabelecimento criado!");
        }).catch(()=>{
          alert('Houve um erro, tente novamente.');
        });
      }
      handleUpdate(pk){
        estabelecimentosService.updateEstabelecimento(
          {
            "pk": pk,
            "nome": this.refs.nome.value,
            "endereco": this.refs.endereco.value,
        }          
        ).then((result)=>{
          console.log(result);
          alert("Estabelecimento alterado!");
        }).catch(()=>{
          alert('Houve um erro, tente novamente.');
        });
      }
      handleSubmit(event) {
        const { match: { params } } = this.props;

        if(params && params.pk){
          this.handleUpdate(params.pk);
        }
        else
        {
          this.handleCreate();
        }

        event.preventDefault();
      }

      render() {
        return (
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Nome:</label>
              <input className="form-control" type="text" ref='nome' />

            <label>
              Endereço:</label>
              <input className="form-control" type="text" ref='endereco'/>


            <input className="btn btn-primary" type="submit" value="Enviar" />
            </div>
          </form>
        );
      }  
}

export default EstabelecimentoCreateUpdate;
