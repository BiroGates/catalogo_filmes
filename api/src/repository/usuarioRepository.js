import { con } from './connection.js';

export async function login (email, senha) {
    const command = `
        SELECT 
            id_usuario	id,
            nm_usuario		nome,
            ds_email		email
       from tb_usuario
      where ds_email		= ?
       and  ds_senha		= ? `

    const [resp] = await con.query(command, [email, senha]); 
    
    return resp[0];
}