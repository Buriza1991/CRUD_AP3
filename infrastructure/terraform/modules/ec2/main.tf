data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}

resource "aws_instance" "app" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  subnet_id     = var.subnet_id

  vpc_security_group_ids = [var.security_group_id]

  key_name = aws_key_pair.app.key_name

  root_block_device {
    volume_size = 20
    volume_type = "gp2"
  }

  tags = {
    Name        = "${var.environment}-app-server"
    Environment = var.environment
  }

  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y docker.io
              systemctl enable docker
              systemctl start docker
              EOF
}

resource "aws_key_pair" "app" {
  key_name   = "${var.environment}-app-key"
  public_key = file(var.ssh_public_key_path)
} 