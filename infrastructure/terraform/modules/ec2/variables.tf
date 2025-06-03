variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "subnet_id" {
  description = "ID of the subnet where the instance will be launched"
  type        = string
}

variable "security_group_id" {
  description = "ID of the security group"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "ssh_public_key_path" {
  description = "Path to the SSH public key file"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
} 