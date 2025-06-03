# CRUD Application with DevOps Integration

Este projeto implementa um sistema CRUD com interface gráfica e integração completa com ferramentas DevOps.

## Estrutura do Projeto

```
.
├── frontend/           # Aplicação React
├── backend/           # API Node.js/Express
├── infrastructure/    # Arquivos IaC
│   ├── terraform/    # Configurações Terraform
│   └── cloudformation/ # Templates AWS CloudFormation
├── ansible/          # Playbooks Ansible
└── docs/            # Documentação adicional
```

## Tecnologias Utilizadas

- Frontend: React.js com TypeScript
- Backend: Node.js com Express
- Banco de Dados: PostgreSQL
- IaC: Terraform e AWS CloudFormation
- Configuração: Ansible

## Pré-requisitos

- Node.js 18+
- AWS CLI configurado
- Terraform instalado
- Ansible instalado
- Docker (opcional)

## Quick Start

1. Clone o repositório
2. Configure as credenciais AWS
3. Execute o Terraform para provisionar a infraestrutura
4. Use Ansible para configurar os servidores
5. Deploy da aplicação

## Desenvolvimento Local

```bash
# Frontend
cd frontend
npm install
npm start

# Backend
cd backend
npm install
npm run dev
```

## Infraestrutura

### Terraform

```bash
cd infrastructure/terraform
terraform init
terraform plan
terraform apply
```

### Ansible

```bash
cd ansible
ansible-playbook -i inventory/prod playbook.yml
```

## Documentação

Consulte a pasta `docs/` para documentação detalhada sobre:
- Arquitetura
- Deployment
- Operações
- Troubleshooting 