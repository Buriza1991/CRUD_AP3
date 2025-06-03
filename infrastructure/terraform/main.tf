terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC Configuration
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "crud-vpc"
  }
}

# Public Subnet
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "crud-public-subnet"
  }
}

# RDS Instance
resource "aws_db_instance" "postgres" {
  identifier           = "crud-db"
  allocated_storage    = 20
  storage_type         = "gp2"
  engine              = "postgres"
  engine_version      = "13.7"
  instance_class      = "db.t3.micro"
  username            = "dbadmin"
  password            = "your_password_here" # Alterar em produção!
  skip_final_snapshot = true

  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.default.name
}

# Security Group for RDS
resource "aws_security_group" "rds" {
  name        = "crud-rds-sg"
  description = "Security group for RDS instance"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

# EC2 Instance for Application
resource "aws_instance" "app" {
  ami           = "ami-0c55b159cbfafe1f0" # Amazon Linux 2 AMI
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public.id

  tags = {
    Name = "crud-app-server"
  }
}

# Output values
output "rds_endpoint" {
  value = aws_db_instance.postgres.endpoint
}

output "app_public_ip" {
  value = aws_instance.app.public_ip
}

# VPC
module "vpc" {
  source = "./modules/vpc"

  vpc_cidr = var.vpc_cidr
  environment = var.environment
}

# Security Groups
module "security_groups" {
  source = "./modules/security_groups"

  vpc_id = module.vpc.vpc_id
  environment = var.environment
}

# EC2 Instance
module "ec2" {
  source = "./modules/ec2"

  vpc_id = module.vpc.vpc_id
  subnet_id = module.vpc.public_subnet_id
  security_group_id = module.security_groups.app_security_group_id
  environment = var.environment
}

# RDS Instance
module "rds" {
  source = "./modules/rds"

  vpc_id = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnet_ids
  security_group_id = module.security_groups.db_security_group_id
  environment = var.environment
} 