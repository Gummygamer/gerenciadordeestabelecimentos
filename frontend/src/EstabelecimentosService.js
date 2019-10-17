import axios from 'axios';
const API_URL = 'http://localhost:5000';

export default class EstabelecimentosService{

    constructor(){}


    getEstabelecimentos() {
        const url = `${API_URL}/api/estabelecimentos/`;
        return axios.get(url).then(response => response.data);
    }  
    getEstabelecimentosByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }
    getEstabelecimento(pk) {
        const url = `${API_URL}/api/estabelecimentos/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    getEstabelecimentosNear(pk) {
        const url = `${API_URL}/api/estabelecimentosnear/${pk}`;
        return axios.get(url).then(response => response.data);
    }
    deleteEstabelecimento(estabelecimento){
        const url = `${API_URL}/api/estabelecimentos/${estabelecimento.pk}`;
        return axios.delete(url);
    }
    createEstabelecimento(estabelecimento){
        const url = `${API_URL}/api/estabelecimentos/`;
        return axios.post(url,estabelecimento);
    }
    updateEstabelecimento(estabelecimento){
        const url = `${API_URL}/api/estabelecimentos/${estabelecimento.pk}`;
        return axios.put(url,estabelecimento);
    }
}

