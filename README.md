# Saúde para Todos - ODS 3

Uma plataforma web dedicada ao **Objetivo de Desenvolvimento Sustentável 3** das Nações Unidas: **Saúde e Bem-estar**.

## 📋 Sobre o Projeto

Esta aplicação promove o acesso universal à saúde e bem-estar, oferecendo ferramentas práticas e informações relevantes para cuidados de saúde preventivos e cotidianos.

## 🎯 Funcionalidades

### ✨ Principais Recursos

- **Busca de Postos de Saúde**: Encontre unidades de saúde próximas à sua localização
- **Calculadora de IMC**: Calcule seu Índice de Massa Corporal com categorização automática
- **Notícias de Saúde**: Feed dinâmico com notícias atualizadas sobre saúde pública
- **Dicas de Bem-estar**: Sistema de dicas rotativas para promover hábitos saudáveis
- **Links Úteis**: Acesso direto aos principais órgãos de saúde do Brasil

### 📱 Seções Funcionais

- **Consultas**: Formulário completo com validações (CPF, telefone, CEP e UF), endereço e histórico local
- **Diário de Saúde**: Registro de sintomas e bem-estar com histórico persistido em `localStorage` e exportação em PDF
- **Controle de Hidratação**: Meta diária, barra de progresso e armazenamento local
- **Medicamentos**: Cadastro com horário, marcação de dose tomada e controle da lista

### 🔗 Recursos Adicionais

- **Carteira de Vacinação Digital**: Link direto para o portal ConecteSUS
- **Contatos de Emergência**: Números importantes (SAMU, Bombeiros, Ouvidoria SUS)
- **Telemedicina**: Acesso aos serviços de telemedicina do SUS

## 🆕 Atualizações Recentes

- Menu superior com aba **Links Úteis** em formato compacto (menu expansível)
- Navegação SPA refinada para abrir/fechar links úteis por hover sem prejudicar clique
- Máscaras de entrada em tempo real para **CPF**, **telefone**, **CEP** e normalização de **UF**
- Persistência de dados no navegador com `localStorage` em consultas, diário, hidratação e medicamentos
- Exportação de histórico do diário em **PDF** (via impressão do navegador)
- Organização do JavaScript em módulos (`js/modules`) para manutenção mais simples

## 🏗️ Estrutura do Projeto

```
PaginaOds/
├── .gitignore          # Arquivos ignorados no versionamento
├── LICENSE             # Licença MIT
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos CSS
├── js/
│   └── modules/
│       ├── config.js   # Constantes de configuração
│       ├── data.js     # Dados de dicas e notícias
│       ├── messages.js # Mensagens de interface
│       ├── render.js   # Funções de renderização
│       ├── utils.js    # Utilitários comuns
│       └── script.js   # Orquestração da aplicação
└── README.md           # Documentação
```

## 🎨 Características Técnicas

### Design

- **Responsivo**: Adaptado para desktop, tablet e mobile
- **Acessível**: Interface clara e navegação intuitiva
- **Moderno**: Design limpo com gradientes e animações suaves

### Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com variáveis CSS e grid/flexbox
- **JavaScript**: Funcionalidades interativas e SPA (Single Page Application)

### Funcionalidades Interativas

- Navegação SPA sem recarregamento de página
- Sistema de notícias com auto-atualização
- Calculadora de IMC com validação
- Dicas dinâmicas com destaque aleatório
- Formulários funcionais com validações e persistência local
- Animações e transições suaves

## 🌟 Links Úteis Incluídos

- **Ministério da Saúde**: Portal oficial do governo
- **DATASUS**: Sistema de informações de saúde do SUS
- **Anvisa**: Agência Nacional de Vigilância Sanitária
- **Fiocruz**: Fundação Oswaldo Cruz
- **Hospital Einstein**: Centro de excelência em saúde
- **INCA**: Instituto Nacional de Câncer

## 🚀 Como Usar

### 💻 **Executar Localmente**

1. **Clone ou baixe** os arquivos do projeto
2. **Abra** o arquivo `index.html` em qualquer navegador moderno
3. **Navegue** pelas diferentes seções usando o menu superior
4. **Experimente** as funcionalidades interativas:
   - Busque postos de saúde na sua região
   - Calcule seu IMC
   - Explore as dicas de saúde
   - Acesse os links úteis

### 🌐 **Deploy Online**

O projeto é totalmente estático e pode ser hospedado em:

- **GitHub Pages** (grátis)
- **Netlify** (grátis)
- **Vercel** (grátis)
- Qualquer servidor web

### 📥 **Clone do Repositório**

```bash
git clone https://github.com/PaesLeandro/saude-para-todos-ods3.git
cd saude-para-todos-ods3
```

Depois, abra o `index.html` no seu navegador favorito!

## 🎯 Objetivos do ODS 3

O projeto contribui para os seguintes objetivos:

✅ **Acesso Universal**: Facilitar o acesso a informações e serviços de saúde  
✅ **Prevenção**: Promover hábitos saudáveis e cuidados preventivos  
✅ **Promoção**: Disseminar conhecimento sobre saúde e bem-estar  
✅ **Equidade**: Oferecer informações gratuitas e acessíveis a todos  
✅ **Qualidade**: Conectar usuários a serviços de saúde de qualidade  
✅ **Cobertura**: Apoiar a cobertura universal de saúde  
✅ **Emergência**: Fornecer contatos para situações de emergência

## 📞 Contatos de Emergência

- **192** - SAMU (Serviço de Atendimento Móvel de Urgência)
- **193** - Bombeiros
- **156** - Ouvidoria SUS

## 🌐 Recursos Externos

- **Vacinação**: [ConecteSUS Paciente](https://conectesus-paciente.saude.gov.br/)
- **Telemedicina**: [Web Atendimento SUS](https://webatendimento.saude.gov.br/)
- **OMS Brasil**: [PAHO Brasil](https://www.paho.org/pt/brasil)

## 🤝 Como Contribuir

1. **Fork** este repositório
2. **Crie** uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. **Abra** um Pull Request

## 📦 Deploy

Este projeto é estático e pode ser publicado manualmente em GitHub Pages, Netlify, Vercel ou qualquer servidor web.

## 🗂️ O que enviar para o GitHub

### ✅ Enviar (recomendado)

- Código-fonte do projeto (`index.html`, `css/`, `js/`)
- Documentação principal (`README.md`, `LICENSE`)
- `.gitignore`

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Desenvolvido com ❤️ para promover saúde e bem-estar para todos**

_Em conformidade com os Objetivos de Desenvolvimento Sustentável das Nações Unidas_
