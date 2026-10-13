# Hair Day

Aplicação web de agendamento para corte de cabelo. Permite marcar um horário escolhendo data, horário disponível e nome do cliente, visualizar os agendamentos do dia divididos por período (manhã/tarde/noite) e cancelar um agendamento existente.

## Funcionalidades

- **Agendar horário** — escolha de data (não permite datas passadas), seleção de um horário disponível e nome do cliente.
- **Horários disponíveis** — a lista de horários (09h às 21h, de hora em hora) é calculada dinamicamente: horários já ocupados no dia selecionado e horários no passado (quando a data é hoje) ficam marcados como indisponíveis.
- **Visualização por período** — os agendamentos do dia selecionado são exibidos em três seções: Manhã (até 12h), Tarde (13h–18h) e Noite (19h–21h).
- **Cancelamento** — cada agendamento listado tem um ícone de cancelar, que remove o agendamento após confirmação.

## Arquitetura

- **JavaScript vanilla** (ES Modules), sem framework de UI — manipulação direta do DOM.
- **Webpack 5** como bundler (`webpack.config.js`), com `babel-loader` para transpilar e `html-webpack-plugin`/`copy-webpack-plugin` para gerar o `dist/index.html` e copiar os assets estáticos.
- **dayjs** (com locale `pt-br`) para manipulação de datas/horas.
- **json-server** simulando a API REST de agendamentos (`server.json`), servida em `http://localhost:3333`.

### Organização do código (`src`)

```
main.js                  Ponto de entrada: importa estilos e módulos
libs/dayjs.js             Configuração do dayjs (locale pt-br)
services/                 Chamadas HTTP à API (fetch)
  api-config.js            Base URL da API
  schedule-new.js           POST /schedules
  schedule-fetch-by-day.js  GET /schedules (filtrado por dia no client)
  schedule-cancel.js        DELETE /schedules/:id
modules/
  page-load.js             Carrega os agendamentos do dia ao abrir a página
  form/
    submit.js               Envio do formulário de novo agendamento
    date-change.js           Recarrega agendamentos ao trocar a data
    hours-load.js            Renderiza a lista de horários disponíveis/indisponíveis
    hours-click.js           Seleção de horário (clique) no formulário
  schedules/
    load.js                  Orquestra busca + renderização dos agendamentos do dia
    show.js                  Renderiza os agendamentos nas seções manhã/tarde/noite
    cancel.js                Cancelamento de um agendamento (com confirmação)
utils/opening-hours.js     Lista fixa dos horários de funcionamento
styles/                    CSS (global, formulário, agendamentos)
```

### Modelo de dados (API — `server.json`)

Cada agendamento em `schedules` tem o formato:

```json
{
  "id": "1700000000000",
  "name": "Nome do cliente",
  "when": "2026-10-13T09:00:00.000Z"
}
```

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- npm

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar a API fake (json-server)

```bash
npm run server
```

Sobe em `http://localhost:3333`, persistindo os agendamentos em `server.json`.

### 3. Rodar a aplicação em desenvolvimento

Em outro terminal:

```bash
npm run dev
```

Abre automaticamente em `http://localhost:3000` (configurado em `webpack.config.js`).

> A URL da API está fixa em `src/services/api-config.js` (`http://localhost:3333`). Ajuste esse arquivo caso a API rode em outro host/porta.

### Build de produção

```bash
npm run build
```

Gera os arquivos estáticos em `dist/`.

## Stack

JavaScript (ES Modules), Webpack, Babel, dayjs, json-server.
