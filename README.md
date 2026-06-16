# AlmoxHub — Sistema de Controle de Estoque de Enfermagem

Sistema web desenvolvido para gerenciamento de materiais de enfermagem utilizando HTML, CSS, JavaScript e MockAPI.

## Funcionalidades

### Sprint 1
- Cadastro de materiais
- Listagem de materiais
- Busca por nome
- Controle de validade
- Categorias de materiais
- Alertas visuais de estoque
- Integração com MockAPI (GET e POST)

### Sprint 2
- Baixa de estoque
- Validação de retirada
- Exclusão de materiais
- Atualização automática da tabela após alterações
- Requisições PUT e DELETE na MockAPI

---

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript ES6+
- Fetch API
- MockAPI

---

## Estrutura do Projeto

```text
PROVA-2BI-ADS-3SEM
│
├── __tests__
│   ├── sprint1.test.js
│   ├── sprint2.test.js
│   └── sprint3.test.js
│
├── .github
│   └── workflows
│       └── classroom.yml
│
├── index.html
├── main.js
├── package.json
├── README.md
└── style.css
```

---

## API

Endpoint:

```text
https://6a31d0d37bc5e1c612663048.mockapi.io/materiais
```

### Métodos Utilizados

| Método | Função |
|----------|----------|
| GET | Listar materiais |
| POST | Cadastrar material |
| PUT | Atualizar estoque |
| DELETE | Excluir material |

---

## Regras de Negócio

### Cadastro
- Nome obrigatório
- Quantidade obrigatória
- Quantidade não pode ser negativa

### Baixa de Estoque
- Quantidade retirada deve ser maior que zero
- Quantidade retirada não pode ser maior que o estoque atual

### Exclusão
- Permite remover um material do estoque

---

## IDs Obrigatórios

| ID |
|------|
| input-nome |
| input-quantidade |
| input-retirada |
| btn-cadastrar |
| lista-materiais |

---

## Classes Obrigatórias

| Classe |
|---------|
| btn-baixar |
| btn-excluir |

---

## Como Executar

1. Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
```

2. Entre na pasta

```bash
cd PROVA-2BI-ADS-3SEM
```

3. Instale as dependências

```bash
npm install
```

4. Execute os testes

```bash
npm test
```

---

## Autor

Projeto desenvolvido para a disciplina de Análise e Desenvolvimento de Sistemas.