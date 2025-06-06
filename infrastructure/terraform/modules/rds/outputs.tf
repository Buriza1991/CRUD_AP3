output "db_instance_id" {
  description = "The RDS instance ID"
  value       = aws_db_instance.app.id
}

output "db_instance_address" {
  description = "The address of the RDS instance"
  value       = aws_db_instance.app.address
}

output "db_instance_endpoint" {
  description = "The connection endpoint of the RDS instance"
  value       = aws_db_instance.app.endpoint
}

output "db_instance_name" {
  description = "The database name"
  value       = aws_db_instance.app.db_name
}

output "db_instance_username" {
  description = "The master username for the database"
  value       = aws_db_instance.app.username
  sensitive   = true
}

output "db_instance_port" {
  description = "The database port"
  value       = aws_db_instance.app.port
} 