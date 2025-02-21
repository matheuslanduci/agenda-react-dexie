O projeto é uma agenda parecido com o Google Calendar, onde é possível criar, editar e excluir eventos.

O projeto está disponível em [https://agenda-react-dexie.vercel.app/](https://agenda-react-dexie.vercel.app/).

## Pré-requisitos

- [Bun](https://bun.sh/) ou [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

## Instalação

1. Clone o repositório

```bash
git clone https://github.com/matheuslanduci/agenda-react-dexie
```

2. Instale as dependências

```bash
cd agenda-react-dexie
bun install # ou npm install
```

3. Inicie o servidor de desenvolvimento

```bash
bun dev # ou npm run dev
```

4. Acesse o projeto em [http://localhost:3000](http://localhost:3000)

## Layout

O layout foi feito com base no Google Calendar. Pedi para o [v0.dev](https://v0.dev) gerar um layout parecido com o Google Calendar e ele fez um ótimo trabalho - porém o layout não é funcional, então tive que implementar as funcionalidades propostas.

[Acesse o layout gerado clicando aqui.](https://v0.dev/chat/google-calendar-clone-XESn4y0PfG7?b=b_37ilHlKRsb0).

## Integrações

- Armazenamento de dados com [Dexie](https://dexie.org/)
- Gerenciamento de estado com [Jotai](https://jotai.org/)
- Formulários com [React Hook Form](https://www.react-hook-form.com/)
- Validação com [Arktype](https://arktype.io/)
- Manipulação de datas com [date-fns](https://date-fns.org/)
- Estilização com [Tailwind CSS](https://tailwindcss.com/) e [ShadCN](https://ui.shadcn.com/)

### Dexie

O Dexie é uma biblioteca de banco de dados que permite criar bancos de dados indexados no navegador.

Eu precisava de um banco de dados para armazenar os eventos e o Dexie foi a escolha para isso.

### Jotai

O Jotai é uma biblioteca de gerenciamento de estado que permite criar estados atômicos e reativos.

Eu precisava gerenciar o estado de forma global na aplicação - por exemplo, o valor do Select de tipo de exibição (mês, semana, dia) - e o Jotai foi a 
escolha para isso.

### React Hook Form

O React Hook Form é uma biblioteca de formulários que permite criar formulários de forma simples. 

Já é uma escolha bem sólida no mercado e eu já tinha experiência com ela.

### Arktype

O Arktype é uma biblioteca nova que permite criar validações de forma simples e declarativa como se fosse TypeScript.

Eu queria testar essa biblioteca e ver como ela se comportava em um projeto real.

### Date-fns

O date-fns é uma biblioteca de manipulação de datas que permite fazer operações com datas de forma simples.

Também é uma escolha sólida no mercado.

### Tailwind CSS

O Tailwind CSS é uma biblioteca de estilização que permite criar estilos de forma simples e rápida.

Eu já tinha experiência com ele e queria testar a nova versão.

### ShadCN

O ShadCN é uma biblioteca de componentes que permite criar componentes de forma simples e rápida.

Implementar componentes de calendário é uma tarefa complexa e o ShadCN me ajudou muito nisso.
