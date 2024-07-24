# Controle de Caixa

## Descrição

Controle de Caixa é um aplicativo de desktop desenvolvido para gerenciar e monitorar as finanças de um negócio. O aplicativo permite registrar produtos, realizar compras, visualizar indicadores financeiros, e muito mais. É construído utilizando React para o frontend, Node.js com Express para o backend, e Electron para a integração do desktop.

## Funcionalidades

### Menu Principal

O menu principal do aplicativo oferece diversas opções para facilitar a navegação e o gerenciamento das finanças. Abaixo estão as opções disponíveis e suas respectivas funcionalidades:

1. **Dashboard**
   - **Descrição:** Tela inicial do aplicativo que fornece uma visão geral das principais métricas e indicadores financeiros do negócio.
   - **Funcionalidades:** 
     - Exibe indicadores como saldo total, despesas totais, lucro total, entre outros.
     - Gráficos e visualizações de dados financeiros.

2. **Produtos**
   - **Descrição:** Gerenciamento de produtos disponíveis para venda.
   - **Funcionalidades:**
     - Registrar novos produtos com informações detalhadas (nome, categoria, tamanho, cor, preço de compra, preço de venda, quantidade em estoque, marca, gênero e fornecedor).
     - Listar.

3. **Compras**
   - **Descrição:** Registro e acompanhamento de compras realizadas.
   - **Funcionalidades:**
     - Registrar novas compras informando o produto, quantidade, e valor de compra.
     - Visualizar histórico de compras realizadas.
     - Atualizar estoque de produtos com base nas compras.

4. **Despesas**
   - **Descrição:** Controle e visualização das despesas do negócio.
   - **Funcionalidades:**
     - Registrar novas despesas .
     - Listar despesas registradas.
     - Visualizar resumo das despesas .

5. **Relatórios**
   - **Descrição:** Geração e visualização de relatórios financeiros detalhados.
   - **Funcionalidades:**
     - Gerar relatórios de vendas, compras, despesas e lucro.
    

6. **Indicadores Financeiros**(para proximas atualizações)
   - **Descrição:** Exibição detalhada de indicadores financeiros importantes.
   - **Funcionalidades:**
     - Visualizar métricas como saldo de vendas, melhor mês de orçamento, melhor mês realizado, e comparativos com o ano anterior.
     - Análise gráfica de desempenho financeiro.

## Instalação e Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/Victor-Novais/controle-de-caixa.git
   cd controle-de-caixa

2. Instale as dependências do backend:
   ```bash
   cd backend
   npm install

2. Instale as dependências do frontend:
   ```bash\
   cd ..
   npm install


## Estrutura do Projeto

- **api/**: Contém o backend da aplicação.
  - **controllers/**: Controladores para manipulação de dados.
  - **models/**: Modelos de dados.
  - **routes/**: Definição das rotas da API.
  - **utils/**: Funções utilitárias para operações com arquivos.

- **public/**: Contém arquivos públicos do frontend.

- **src/**: Contém o código fonte do frontend em React.
  - **components/**: Componentes React utilizados na aplicação.
  - **pages/**: Páginas principais da aplicação.
  - **services/**: Serviços de API para comunicação com o backend.

## Contribuição

Sinta-se à vontade para contribuir com o projeto. Basta fazer um fork do repositório, criar um branch para sua funcionalidade ou correção, e abrir um pull request.
