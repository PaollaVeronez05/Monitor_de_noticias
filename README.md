# 📰 Monitor de Notícias — Web Scraper com Node.js + SQLite

![Node.js](https://img.shields.io/badge/Node.js-v24+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Cheerio](https://img.shields.io/badge/Cheerio-E88C1F?style=for-the-badge)
![License](https://img.shields.io/badge/licen%C3%A7a-MIT-blue?style=for-the-badge)

> Sistema de monitoramento e coleta automática de notícias do portal G1, com persistência em banco de dados SQLite e operações CRUD completas.

---

## 📋 Índice

<p align="center">
  <a href="#-sobre-o-projeto">
    <img src="https://img.shields.io/badge/Sobre%20o%20Projeto-1E90FF?style=for-the-badge&logo=readme&logoColor=white">
  </a>
 
  <a href="#-funcionalidades">
    <img src="https://img.shields.io/badge/Funcionalidades-1E90FF?style=for-the-badge&logo=github&logoColor=white">
  </a>

  <a href="#-tecnologias-utilizadas">
    <img src="https://img.shields.io/badge/Tecnologias-1E90FF?style=for-the-badge&logo=visualstudiocode&logoColor=white">
  </a>

  <a href="#-instalação">
    <img src="https://img.shields.io/badge/Instalação-1E90FF?style=for-the-badge&logo=windows-terminal&logoColor=white">
  </a>

  <a href="#-como-usar">
    <img src="https://img.shields.io/badge/Como%20Usar-1E90FF?style=for-the-badge&logo=node.js&logoColor=white">
  </a>
</p>

---

## 🧠 Sobre o Projeto

O **Monitor de Notícias** é um scraper desenvolvido em Node.js que acessa automaticamente o portal [G1 - Globo](https://g1.globo.com/), extrai as manchetes e URLs das notícias em destaque e as armazena em um banco de dados local SQLite.

O projeto foi desenvolvido com fins educacionais, demonstrando na prática o uso de:

- Requisições HTTP com `axios`
- Parsing de HTML com `cheerio`
- Banco de dados relacional leve com `sqlite3`
- Operações CRUD completas (Create, Read, Update, Delete)
- Funções assíncronas com `async/await`

---

## ✅ Funcionalidades

- [x] Coleta automática de manchetes do G1
- [x] Armazenamento das notícias em banco SQLite
- [x] Listagem de todas as notícias salvas
- [x] Atualização de título de uma notícia por ID
- [x] Exclusão de uma notícia por ID
- [x] Registro automático de data e hora de acesso

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|---|---|---|
| [Node.js](https://nodejs.org/) | v24+ | Ambiente de execução JavaScript |
| [axios](https://axios-http.com/) | ^1.16.0 | Cliente HTTP para requisições web |
| [cheerio](https://cheerio.js.org/) | ^1.2.0 | Parser de HTML no estilo jQuery |
| [sqlite3](https://github.com/TryGhost/node-sqlite3) | ^6.0.1 | Banco de dados SQLite para Node.js |

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) versão **18 ou superior** (testado com v24.12.0)
- [npm](https://www.npmjs.com/) (já incluído com o Node.js)
- Acesso à internet (para o scraping do G1)

Verifique sua instalação:

```bash
node --version
npm --version
```

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/monitor-noticias.git
cd monitor-noticias
```

### 2. Instale as dependências

```bash
npm install
```

Isso instalará automaticamente: `axios`, `cheerio` e `sqlite3`.

> ⚠️ A instalação do `sqlite3` pode demorar alguns segundos pois envolve a compilação de um módulo nativo.

---

## ▶️ Como Usar

### Executando o scraper

```bash
node index.js
```

O sistema irá:

1. Conectar ao banco de dados (criando-o se não existir)
2. Acessar o portal G1 e coletar as manchetes
3. Salvar cada notícia no banco com ID e timestamp
4. Aguardar 3 segundos e então:
   - **Listar** todas as notícias salvas
   - **Atualizar** o título da notícia de ID 1
   - **Deletar** a notícia de ID 2

### Personalizando o comportamento

Para alterar qual notícia é atualizada ou deletada, edite o bloco de execução no final do `index.js`:

```javascript
// Atualiza o título da notícia com ID desejado
atualizarNoticia(1, "Seu novo título aqui");

// Deleta a notícia com o ID desejado
deletarNoticia(2);
```

Para listar notícias em outro momento, basta chamar a função diretamente:

```javascript
listarNoticias();
```

---

## 📁 Estrutura do Projeto

```
monitor-noticias/
│
├── index.js              # Arquivo principal com toda a lógica
├── monitoramento.db      # Banco de dados SQLite (gerado automaticamente)
├── package.json          # Metadados e dependências do projeto
├── package-lock.json     # Lock file das dependências
├── node_modules/         # Dependências instaladas (não versionar)
└── README.md             # Documentação do projeto
```

> 💡 O arquivo `monitoramento.db` é gerado automaticamente na primeira execução. Não é necessário criá-lo manualmente.

---

## 🗄️ Banco de Dados

O projeto utiliza SQLite com uma única tabela chamada `noticias`:

```sql
CREATE TABLE IF NOT EXISTS noticias (
    id          INTEGER  PRIMARY KEY AUTOINCREMENT,
    titulo      TEXT,
    url         TEXT,
    data_acesso DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Campos

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | INTEGER | Identificador único autoincremental |
| `titulo` | TEXT | Título/manchete da notícia |
| `url` | TEXT | Link completo para a notícia |
| `data_acesso` | DATETIME | Data e hora da coleta (preenchida automaticamente) |

---

## 📊 Exemplo de Saída

```
Coletando notícias...

Banco conectado com sucesso.
Notícia salva com ID 1
Notícia salva com ID 2
...
Notícia salva com ID 8

===== NOTÍCIAS SALVAS =====

ID: 1
Título: 'É pra continuar pagando restaurante do Ciro?': investigação cita conversas
URL: https://g1.globo.com/politica/blog/...
Data: 2026-05-07 11:54:44

ID: 2
Título: Justiça manda prender patroa que agrediu empregada grávida no MA
URL: https://g1.globo.com/ma/maranhao/noticia/...
Data: 2026-05-07 11:54:44

...

Notícia 1 atualizada.
Notícia 2 removida.
```

---

## ⚠️ Possíveis Erros

### `Cannot find module './scraper.js'`

Certifique-se de que está executando o arquivo correto. O nome do arquivo principal é `index.js`:

```bash
# ❌ Errado
node scraper.js

# ✅ Correto
node index.js
```

### Erro na coleta / sem notícias salvas

O G1 pode ter alterado a estrutura do HTML. Verifique se o seletor CSS `a.feed-post-link` ainda corresponde aos elementos de manchete. Inspecione o HTML do portal e atualize o seletor no `index.js` se necessário:

```javascript
// Atualize este seletor caso o G1 mude seu HTML
$("a.feed-post-link").each((i, element) => { ... });
```

### Erro ao instalar `sqlite3`

Em alguns ambientes, a compilação nativa pode falhar. Tente:

```bash
npm install sqlite3 --build-from-source
```

Ou verifique se o `node-gyp` e suas dependências estão instalados corretamente.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um **fork** do repositório
2. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`
3. Faça o commit das suas alterações: `git commit -m 'feat: adiciona nova funcionalidade'`
4. Envie para a branch: `git push origin feature/minha-feature`
5. Abra um **Pull Request**

Por favor, siga o padrão de commits [Conventional Commits](https://www.conventionalcommits.org/pt-br/).

---

## 👥 Participantes
 
| Nome | E-mail |
|---|---|
| Paolla Veronez | [paollap.veronez@gmail.com](mailto:paollap.veronez@gmail.com) |
| Rafaela Oliveira | [rafaelacristina1510.oliveira@gmail.com](mailto:rafaelacristina1510.oliveira@gmail.com) |
 
---
<div align="center">
 Senai A Jacob Lafer
</div>
