# AlmoxHub — Sistema de Controle de Estoque de Enfermagem

Sistema web para controle de estoque de materiais de enfermagem, desenvolvido como projeto de avaliação da disciplina de ADS — 3º Semestre.

## Sobre o Projeto

O **AlmoxHub** resolve os principais problemas identificados no levantamento de requisitos com a equipe de enfermagem:

- ❌ Controle manual em Excel sem cálculo automático
- ❌ Sem rastreamento de validade de materiais
- ❌ Sem diferenciação entre materiais de consumo e permanentes
- ❌ Sem alertas de estoque zerado

Com o AlmoxHub:

- ✅ Cadastro digital com envio automático para nuvem (MockAPI)
- ✅ Listagem em tempo real com busca por nome
- ✅ Categorias: Material de Consumo e Material Permanente
- ✅ Controle de data de validade com badges de status
- ✅ Alertas visuais: Zerado, Vencido, Vence em breve, OK
- ✅ Interface responsiva (celular e desktop)

## Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|-----------|
| Estrutura | HTML5 Semântico |
| Estilização | CSS3 (Custom Properties, Grid, Flexbox) |
| Interatividade | JavaScript ES2020 (async/await, Fetch API) |
| Back-end | MockAPI (REST) |
| Fontes | Google Fonts — Inter + JetBrains Mono |

## Estrutura do Projeto

```
/
├── index.html        # Estrutura principal da aplicação
├── css/
│   └── style.css     # Estilos e design system
├── js/
│   └── script.js     # Lógica, requisições API e interações
├── __tests__/
│   ├── sprint1.test.js
│   ├── sprint2.test.js
│   └── sprint3.test.js
├── package.json
└── README.md
```

## Como Executar

### Opção 1 — Direto no navegador (recomendado)

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd <pasta-do-projeto>
   ```
2. Abra o arquivo `index.html` em qualquer navegador moderno.
   > Não é necessário servidor local — o sistema consome a API em nuvem.

### Opção 2 — Com Live Server (VS Code)

1. Instale a extensão **Live Server** no VS Code
2. Clique com botão direito em `index.html` → **Open with Live Server**

## API (MockAPI)

**Endpoint base:** `https://6a31d0d37bc5e1c612663048.mockapi.io/materiais`

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/materiais` | Lista todos os materiais |
| `POST` | `/materiais` | Cadastra novo material |

**Exemplo de objeto:**
```json
{
  "nome": "Seringa 10ml",
  "quantidade": 50,
  "categoria": "Consumo",
  "validade": "2025-12-31"
}
```

## IDs do Contrato Técnico (Autograding)

| ID | Elemento |
|----|---------|
| `input-nome` | Campo de nome do material |
| `input-quantidade` | Campo de quantidade |
| `btn-cadastrar` | Botão de cadastro |
| `lista-materiais` | Tabela de materiais |

## Funcionalidades — Sprint 1

- [x] Formulário de cadastro com validação
- [x] Envio POST para MockAPI
- [x] Carregamento GET ao abrir a página
- [x] Tabela preenchida dinamicamente
- [x] Tratamento de erros de conexão e campos vazios
- [x] Busca em tempo real por nome
- [x] Categorias de material
- [x] Controle de data de validade
- [x] Badges de status (OK, Zerado, Vencido, Vence em breve)
- [x] Interface responsiva (mobile-ready)
- [x] Feedback visual com notificações toast

## Histórico de Commits (Semântico)

```
feat: adiciona estrutura base HTML com IDs obrigatórios do contrato
feat: implementa design system com CSS custom properties e layout responsivo
feat: conecta GET na MockAPI e preenche tabela dinamicamente ao carregar página
feat: implementa POST ao clicar em btn-cadastrar com limpeza de formulário
feat: adiciona validação de campos e tratamento de erros de conexão
feat: adiciona campos extras de categoria e validade
feat: implementa busca em tempo real por nome do material
feat: adiciona badges de status para alertas de validade e estoque
docs: cria README com instruções de execução e documentação da API
```

---

Desenvolvido para a disciplina de **Análise e Desenvolvimento de Sistemas — ADS 3° Semestre**