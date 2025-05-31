# 🛠️ Comandos para Demonstração

## 🚀 Inicialização do Projeto

### Backend
```bash
cd backend
npm install
npm run dev
# Servidor rodando em http://localhost:3000
```

### Frontend
```bash
cd frontend
npm install
npm start
# Aplicação rodando em http://localhost:3001
```

---

## 🗄️ Comandos MySQL

### Criar banco de dados
```sql
CREATE DATABASE IF NOT EXISTS crud_app;
USE crud_app;
```

### Verificar tabelas criadas
```sql
SHOW TABLES;
DESC students;
DESC tasks;
```

### Inserir dados de exemplo
```sql
INSERT INTO students (name, age, belt, weight, martialArts, phone, email, address, active) 
VALUES 
('João Silva', 25, 'blue', 75.5, '["jiujitsu"]', '11999999999', 'joao@email.com', 'Rua A, 123', true),
('Maria Santos', 22, 'purple', 60.0, '["muaythai", "jiujitsu"]', '11888888888', 'maria@email.com', 'Rua B, 456', true);
```

---

## 🏗️ Terraform Commands

### Inicializar Terraform
```bash
cd infrastructure/terraform
terraform init
```

### Planejar infraestrutura
```bash
terraform plan
```

### Aplicar mudanças
```bash
terraform apply -auto-approve
```

### Destruir recursos (cuidado!)
```bash
terraform destroy
```

### Ver estado atual
```bash
terraform show
```

---

## 🤖 Ansible Commands

### Testar conectividade
```bash
ansible all -m ping -i inventory/prod
```

### Rodar playbook
```bash
ansible-playbook -i inventory/prod playbook.yml
```

### Rodar com verbose
```bash
ansible-playbook -i inventory/prod playbook.yml -vvv
```

---

## 📦 AWS CLI Commands

### Listar instâncias EC2
```bash
aws ec2 describe-instances --query 'Reservations[*].Instances[*].[InstanceId,State.Name,Tags[?Key==`Name`].Value]' --output table
```

### Ver status do RDS
```bash
aws rds describe-db-instances --query 'DBInstances[*].[DBInstanceIdentifier,DBInstanceStatus]' --output table
```

### Listar buckets S3
```bash
aws s3 ls
```

---

## 🐛 Comandos de Debug

### Logs do backend
```bash
# Windows PowerShell
Get-Content -Path "backend.log" -Tail 50 -Wait

# Linux/Mac
tail -f backend.log
```

### Testar API com cURL
```bash
# Health check
curl http://localhost:3000/health

# Listar estudantes
curl http://localhost:3000/api/students

# Criar estudante
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste Silva",
    "age": 30,
    "belt": "white",
    "weight": 80,
    "martialArts": ["jiujitsu"],
    "phone": "11777777777",
    "email": "teste@email.com",
    "address": "Rua Teste, 789",
    "active": true
  }'
```

---

## 🎨 Demonstração Visual

### Mostrar responsividade
1. Abrir DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Testar em diferentes resoluções:
   - iPhone SE (375x667)
   - iPad (768x1024)
   - Desktop (1920x1080)

### Mostrar animações
1. Hover sobre cards
2. Transições de página
3. Loading states
4. Feedback visual nos botões

---

## 📊 Queries úteis para demonstração

### Estatísticas do sistema
```sql
-- Total de alunos
SELECT COUNT(*) as total_alunos FROM students;

-- Alunos por faixa
SELECT belt, COUNT(*) as quantidade 
FROM students 
GROUP BY belt;

-- Alunos por modalidade
SELECT 
  SUM(JSON_CONTAINS(martialArts, '"jiujitsu"')) as jiujitsu,
  SUM(JSON_CONTAINS(martialArts, '"muaythai"')) as muaythai
FROM students;

-- Alunos ativos vs inativos
SELECT 
  active, 
  COUNT(*) as quantidade 
FROM students 
GROUP BY active;
```

---

## 🔧 Troubleshooting Rápido

### Backend não conecta ao MySQL
```bash
# Verificar se MySQL está rodando
# Windows
Get-Service | Where-Object {$_.Name -like "*mysql*"}

# Linux/Mac
sudo service mysql status
```

### Frontend não conecta ao backend
```bash
# Verificar CORS no backend
# Verificar portas: backend (3000), frontend (3001)
netstat -an | grep 3000
netstat -an | grep 3001
```

### Limpar cache do navegador
```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

---

## 📝 Dados de Exemplo para Demo

### Aluno 1
- Nome: Carlos Machado
- Idade: 28
- Faixa: Roxa (purple)
- Peso: 82kg
- Modalidades: Jiu-Jitsu
- Telefone: (11) 98765-4321
- Email: carlos.machado@email.com

### Aluno 2
- Nome: Ana Paula Costa
- Idade: 24
- Faixa: Azul (blue)
- Peso: 58kg
- Modalidades: Muay Thai e Jiu-Jitsu
- Telefone: (11) 91234-5678
- Email: ana.costa@email.com

### Aluno 3
- Nome: Roberto Santos
- Idade: 35
- Faixa: Preta (black)
- Peso: 90kg
- Modalidades: Jiu-Jitsu
- Telefone: (11) 95555-5555
- Email: roberto.santos@email.com 