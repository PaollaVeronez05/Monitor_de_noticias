
// IMPORTAÇÃO DAS BIBLIOTECAS

const axios = require("axios");
const cheerio = require("cheerio");
const sqlite3 = require("sqlite3").verbose();


// CONEXÃO COM O BANCO SQLITE

const db = new sqlite3.Database("monitoramento.db", (err) => {

    if (err) {
        console.log("Erro ao conectar:", err.message);
    } else {
        console.log("Banco conectado com sucesso.");
    }

});


// CRIAÇÃO DA TABELA


db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS noticias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT,
            url TEXT,
            data_acesso DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

});


// FUNÇÃO DE WEB SCRAPING


async function coletarNoticias() {

    try {

        console.log("Coletando notícias...\n");

        // Requisição para o portal
        const response = await axios.get("https://g1.globo.com/");

        // Carrega HTML
        const $ = cheerio.load(response.data);

        // Seleciona manchetes
        $("a.feed-post-link").each((i, element) => {

            const titulo = $(element).text().trim();
            const url = $(element).attr("href");

            if (titulo && url) {

                inserirNoticia(titulo, url);

            }

        });

    } catch (error) {

        console.log("Erro na coleta:", error.message);

    }

}


// CREATE - INSERIR NOTÍCIA


function inserirNoticia(titulo, url) {

    const sql = `
        INSERT INTO noticias (titulo, url)
        VALUES (?, ?)
    `;

    db.run(sql, [titulo, url], function(err) {

        if (err) {

            console.log("Erro ao inserir:", err.message);

        } else {

            console.log(`Notícia salva com ID ${this.lastID}`);

        }

    });

}


// READ - LISTAR NOTÍCIAS


function listarNoticias() {

    const sql = `SELECT * FROM noticias`;

    db.all(sql, [], (err, rows) => {

        if (err) {

            console.log("Erro ao consultar:", err.message);

        } else {

            console.log("\n===== NOTÍCIAS SALVAS =====\n");

            rows.forEach((row) => {

                console.log(`
ID: ${row.id}
Título: ${row.titulo}
URL: ${row.url}
Data: ${row.data_acesso}
                `);

            });

        }

    });

}


// UPDATE - ATUALIZAR NOTÍCIA


function atualizarNoticia(id, novoTitulo) {

    const sql = `
        UPDATE noticias
        SET titulo = ?
        WHERE id = ?
    `;

    db.run(sql, [novoTitulo, id], function(err) {

        if (err) {

            console.log("Erro ao atualizar:", err.message);

        } else {

            console.log(`Notícia ${id} atualizada.`);

        }

    });

}


// DELETE - EXCLUIR NOTÍCIA


function deletarNoticia(id) {

    const sql = `
        DELETE FROM noticias
        WHERE id = ?
    `;

    db.run(sql, [id], function(err) {

        if (err) {

            console.log("Erro ao excluir:", err.message);

        } else {

            console.log(`Notícia ${id} removida.`);

        }

    });

}


// EXECUÇÃO DO SISTEMA


(async () => {

    // Coleta e salva notícias
    await coletarNoticias();

    // Aguarda salvar os dados
    setTimeout(() => {

        // READ
        listarNoticias();

        // UPDATE
        atualizarNoticia(1, "Título atualizado manualmente");

        // DELETE
        deletarNoticia(2);

    }, 3000);

})();