import { alterarFilme, alterarImagem, buscarPorId, buscarPorNome, deletarFilme, inserirFilme, listartTodosFilme } from '../repository/filmeRepository.js';
import { Router } from 'express';
import multer from 'multer';

const server = Router();
const upload = multer({ dest: 'storage/capasFilmes' });

server.post('/filme', async (req, resp) => {
    try{
        const novoFilme = req.body;
        
        if(!novoFilme.nome) throw new Error('Nome do filme obrigatório!');
        if(!novoFilme.sinopse) throw new Error('Sinopse do filme obrigatório!');
        if(!novoFilme.avaliacao) throw new Error('Avaliação do filme obrigatório!');
        if(!novoFilme.lancamento) throw new Error('Data de lançamento do filme obrigatório!');
        if(novoFilme.disponivel === undefined) throw new Error('Campo disponivel é obrigatório!');
        if(!novoFilme.usuario) throw new Error('Usuario não logado!');

        const filmeInserido = await inserirFilme(novoFilme);
        
        resp.send(filmeInserido);
    }catch(error){
        resp.status(400).send({
            error: error.message
        })
    }
})

server.put('/filme/:id/capa', upload.single('capa'), async (req, resp) => {
    try {
        const { id } = req.params;
        const imagem = req.file.path;

        const resposta = await alterarImagem(imagem, id);
        if(resposta != 1) throw new Error('Imagem não pode ser salva');
        resp.status(204).send();  
    } catch (error) {
        resp.status(400).send({
            error: error.message
        });
    }
});

server.get('/filme', async (req, resp) => {
    try {
        const resposta = await listartTodosFilme();
        resp.send(resposta);
    } catch (error) {
        resp.status(400).send({
            error:error.message
        });
    }
});


server.get('/filme/busca', async (req, resp) => {
    try {
        const  nome = req.query.nome;
        const resposta = await buscarPorNome(nome);
        if(!resposta) throw new Error('Filme não encontrado!');

        resp.send(resposta);
    } catch (error) {
        resp.status(404).send({
            error:error.message
        });
    }
});


server.get('/filme/:id', async (req, resp) => {
    try {
        const  id = Number(req.params.id);
        const resposta = await buscarPorId(id);
        if(!resposta) throw new Error('Filme não encontrado!');

        resp.send(resposta);
    } catch (error) {
        resp.status(404).send({
            error:error.message
        });
    }
});


server.delete('/filme/:id', async (req, resp) => {
    try {
        const  {id} = req.params;
        const resposta = await deletarFilme(id);
        if(!resposta) throw new Error('Filme não pode ser removido!');

        resp.status(204).send();
    } catch (error) {
        resp.status(400).send({
            error:error.message
        });
    }
});


server.put('/filme/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const filme = req.body;
        
        if(!filme.nome) throw new Error('Nome do filme obrigatório!');
        if(!filme.sinopse) throw new Error('Sinopse do filme obrigatório!');
        if(!filme.avaliacao) throw new Error('Avaliação do filme obrigatório!');
        if(!filme.lancamento) throw new Error('Data de lançamento do filme obrigatório!');
        if(filme.disponivel == undefined) throw new Error('Campo disponivel é obrigatório!');
        if(!filme.usuario) throw new Error('Usuario não logado!');

        const resposta = await alterarFilme(id, filme);
        if(resposta != 1) throw new Error('Filme não pode ser alterado!');
        else resp.status(204).send();



    }catch (error) {
        resp.status(400).send({
            error:error.message
        });
    }
});
export default server;
