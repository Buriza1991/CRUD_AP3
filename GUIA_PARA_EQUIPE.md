# 🚀 Guia para Executar o Projeto CRUD AP3

## Para a Equipe - Como Executar o Projeto

### 📋 Pré-requisitos
- Node.js versão 18 ou superior
- Git instalado
- Editor de código (VS Code recomendado)

### 🔧 Configuração Inicial

1. **Clone o repositório**
```bash
git clone [URL_DO_SEU_REPOSITORIO]
cd CRUD_AP3-main
```

2. **Instale as dependências do projeto raiz**
```bash
npm install
```

3. **Instale as dependências do frontend e backend**
```bash
npm run setup
```

### ▶️ Como Executar

**Opção 1: Executar tudo de uma vez (Recomendado)**
```bash
npm start
```
Isso vai iniciar automaticamente:
- Backend na porta 3001
- Frontend na porta 3000

**Opção 2: Executar separadamente**

Frontend apenas:
```bash
npm run start:frontend
```

Backend apenas:
```bash
npm run start:backend
```

### 🌐 Acessos

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

### 🛠️ Comandos Úteis

```bash
# Instalar dependências
npm run setup

# Executar o projeto completo
npm start

# Executar apenas frontend
npm run start:frontend

# Executar apenas backend
npm run start:backend

# Fazer build para produção
npm run build

# Executar testes
npm test
```

### 📂 Estrutura do Projeto

```
CRUD_AP3-main/
├── frontend/          # Aplicação React
├── backend/           # API Node.js/Express
├── infrastructure/    # Configurações AWS/Terraform
├── ansible/          # Scripts de automação
└── docs/             # Documentação
```

### 🤝 Para Colaborar

1. **Crie uma branch para sua feature**
```bash
git checkout -b minha-feature
```

2. **Faça suas alterações e commit**
```bash
git add .
git commit -m "Adiciona nova funcionalidade"
```

3. **Envie para o repositório**
```bash
git push origin minha-feature
```

### 🔧 Solução de Problemas

**Erro: "npm start não funciona"**
- Execute `npm run setup` primeiro
- Certifique-se de estar na pasta raiz do projeto

**Erro: "Porta já em uso"**
- O frontend usa porta 3000 e backend porta 3001
- Feche outros processos nessas portas ou altere no código

**Erro: "Dependências não encontradas"**
- Execute `npm run setup` novamente
- Verifique se tem Node.js instalado: `node --version`

### 📱 Como Compartilhar com a Equipe

1. **Via GitHub/GitLab:**
   - Faça push do código para um repositório
   - Compartilhe o link com a equipe
   - Cada pessoa clona e segue este guia

2. **Via ZIP:**
   - Compacte a pasta do projeto
   - Compartilhe o arquivo
   - Cada pessoa descompacta e segue este guia

3. **Hospedagem Online (Recomendado):**
   - Use Vercel, Netlify ou Heroku
   - Deploy automático a partir do GitHub
   - Toda a equipe acessa via URL pública

### 🌐 Deploy Online (Opcional)

**Frontend no Vercel:**
```bash
cd frontend
npm install -g vercel
vercel
```

**Backend no Heroku:**
```bash
cd backend
npm install -g heroku
heroku create seu-app-backend
git push heroku main
```

### 📞 Suporte

Se alguém da equipe tiver problemas:
1. Verifique se seguiu todos os passos
2. Execute `npm run setup` novamente
3. Reinicie o terminal
4. Entre em contato com o responsável do projeto

---

**🎉 Pronto! Agora toda a equipe pode executar o projeto facilmente!** 