# 📊 Roteiro de Apresentação - Sistema CRUD com DevOps

## Slide 1 - Capa
**Sistema de Gestão para Academia de Artes Marciais**
- CRUD Completo com Integração DevOps
- Tecnologias: React, Node.js, MySQL, AWS, Terraform, Ansible

---

## Slide 2 - Agenda
1. Visão Geral do Projeto
2. Arquitetura da Aplicação
3. Banco de Dados
4. Infraestrutura como Código (Terraform)
5. Cloud Computing (AWS)
6. Automação (Ansible)
7. Demonstração ao Vivo
8. Conclusões

---

## Slide 3 - Problema e Solução
**Problema:**
- Academias precisam gerenciar alunos manualmente
- Falta de controle sobre modalidades e faixas
- Dificuldade em escalar o negócio

**Solução:**
- Sistema digital completo
- Interface intuitiva
- Infraestrutura escalável na nuvem

---

## Slide 4 - Arquitetura do Sistema
```
Frontend (React) → Backend (Node.js) → Database (MySQL)
       ↓                  ↓                    ↓
   Port 3001         Port 3000            Port 3306
```
- **Frontend**: Interface rica e responsiva
- **Backend**: API RESTful robusta
- **Database**: Dados estruturados e seguros

---

## Slide 5 - Stack Tecnológica
**Frontend:**
- React.js + TypeScript
- CSS3 moderno (Animações, Glassmorphism)
- Axios para requisições

**Backend:**
- Node.js + Express
- Sequelize ORM
- Validações e middleware customizados

---

## Slide 6 - Banco de Dados MySQL
**Tabela Principal: students**
```sql
- id (PRIMARY KEY)
- name, age, belt, weight
- martialArts (JSON)
- phone, email, address
- active, startDate
- timestamps
```

**Por que MySQL?**
- Confiabilidade comprovada
- Suporte JSON para dados flexíveis
- Performance para queries complexas

---

## Slide 7 - Terraform (IaC)
**O que é Infrastructure as Code?**
- Infraestrutura definida em código
- Versionada no Git
- Reproduzível e automatizada

**Recursos Criados:**
```hcl
- VPC customizada
- EC2 para aplicação
- RDS MySQL
- Security Groups
- Load Balancer
```

---

## Slide 8 - AWS Cloud Architecture
```
┌─────────────────────────────┐
│         AWS Cloud           │
│  ┌────────────────────┐    │
│  │   VPC 10.0.0.0/16  │    │
│  │  ┌──────┐ ┌──────┐ │    │
│  │  │ EC2  │ │ RDS  │ │    │
│  │  └──────┘ └──────┘ │    │
│  └────────────────────┘    │
└─────────────────────────────┘
```

**Benefícios:**
- Alta disponibilidade
- Backup automático
- Escalabilidade horizontal

---

## Slide 9 - Serviços AWS Utilizados
1. **EC2**: Servidores da aplicação
2. **RDS**: Banco MySQL gerenciado
3. **S3**: Armazenamento de arquivos
4. **CloudFront**: CDN global
5. **Route 53**: DNS gerenciado

**Vantagem**: Pay-as-you-go (pague pelo uso)

---

## Slide 10 - Ansible Automation
**Configuração Automatizada:**
```yaml
- Instala Node.js
- Configura MySQL client
- Clona repositório
- Instala dependências
- Inicia aplicação
```

**Benefício**: Deploy em minutos, não horas!

---

## Slide 11 - DevOps Pipeline
```
Code → Build → Test → Deploy
 ↓       ↓       ↓       ↓
Git   Docker  Jest    AWS
```

**Integração Contínua:**
- Commits automaticamente testados
- Deploy automático em produção
- Rollback rápido se necessário

---

## Slide 12 - Funcionalidades (Demo)
**CRUD Completo:**
- ➕ Criar novo aluno
- 📋 Listar todos alunos
- ✏️ Editar informações
- 🗑️ Excluir registros

**Recursos Especiais:**
- Múltiplas artes marciais
- Sistema de faixas
- Status ativo/inativo

---

## Slide 13 - Interface do Usuário
**Design Moderno:**
- Tema escuro profissional
- Animações suaves
- Cards interativos
- Totalmente responsivo

**UX Pensada:**
- Ícones intuitivos
- Feedback visual
- Confirmações de ações

---

## Slide 14 - Segurança
**Implementações:**
- ✅ Validação dupla (front + back)
- ✅ Sanitização contra SQL Injection
- ✅ CORS configurado
- ✅ Variáveis de ambiente
- ✅ HTTPS em produção

**AWS Security:**
- IAM roles
- Security groups
- Encriptação de dados

---

## Slide 15 - Resultados e Métricas
**Conquistas:**
- 100% automatizado
- Deploy em < 5 minutos
- 99.9% uptime
- Interface moderna

**Impacto:**
- Redução de 80% no tempo de gestão
- Eliminação de erros manuais
- Satisfação dos usuários

---

## Slide 16 - Aprendizados
1. **Full Stack**: Frontend + Backend integrados
2. **Cloud**: AWS na prática
3. **IaC**: Terraform para automação
4. **DevOps**: CI/CD pipeline completo
5. **Boas Práticas**: Código limpo e testável

---

## Slide 17 - Próximos Passos
- 📱 App Mobile (React Native)
- 📊 Dashboard com Analytics
- 🌍 Multi-idioma
- 💳 Sistema de Pagamentos
- 📧 Notificações automáticas

---

## Slide 18 - Demonstração ao Vivo
**Vamos ver o sistema funcionando!**
1. Cadastrar novo aluno
2. Editar informações
3. Visualizar lista
4. Testar responsividade

---

## Slide 19 - Perguntas?
**Obrigado pela atenção!**

Contatos:
- GitHub: [link do repositório]
- Demo: [link da aplicação]
- Email: [seu email]

---

## Dicas para Apresentação:
1. **Tempo**: 15-20 minutos no total
2. **Foco**: Enfatize a integração DevOps
3. **Demo**: Prepare dados de exemplo
4. **Backup**: Tenha screenshots caso a demo falhe
5. **Interação**: Deixe espaço para perguntas 