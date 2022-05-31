import { con } from './connection.js';

export async function inserirFilme(filme) {
    const command = `
    INSERT INTO tb_filme (id_usuario, nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
                  VALUES (?, ?, ?, ?, ?, ?)
    `

    const [resposta] = await con.query(command, [filme.usuario, filme.nome, filme.sinopse, 
                                            filme.avaliacao, filme.lancamento, filme.disponivel]);
    
    filme.id = resposta.insertId;
    
    return filme;
}

export async function alterarImagem(imagem, id) {
    const command = `
        UPDATE tb_filme 
            SET img_filme     = ?
        WHERE id_filme        = ?
        ` 
    const [resposta] = await con.query(command, [imagem, id]);
    
    return resposta.affectedRows;
}