import { Request, Response, NextFunction } from 'express';
import { VALID_MARTIAL_ARTS, VALID_BELTS, Address } from '../types/student';

export const validateStudentInput = (req: Request, res: Response, next: NextFunction) => {
  const { name, age, belt, weight, martialArts, phone, email, address, active } = req.body;

  // Validações básicas
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Nome é obrigatório' });
  }

  if (!age || typeof age !== 'number' || age < 5 || age > 100) {
    return res.status(400).json({ error: 'Idade deve ser um número entre 5 e 100' });
  }

  if (belt && !VALID_BELTS.includes(belt)) {
    return res.status(400).json({ error: 'Faixa inválida' });
  }

  if (!weight || typeof weight !== 'number' || weight <= 0) {
    return res.status(400).json({ error: 'Peso deve ser um número positivo' });
  }

  // Validar artes marciais
  if (!Array.isArray(martialArts) || martialArts.length === 0) {
    return res.status(400).json({ error: 'Selecione pelo menos uma arte marcial' });
  }

  if (!martialArts.every(art => VALID_MARTIAL_ARTS.includes(art))) {
    return res.status(400).json({ error: 'Arte marcial inválida' });
  }

  // Validar telefone
  if (!phone || typeof phone !== 'string' || !/^\d{10,11}$/.test(phone)) {
    return res.status(400).json({ error: 'Telefone deve ter 10 ou 11 dígitos numéricos' });
  }

  // Validar email
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  // Validar endereço - aceitar string JSON
  if (!address || typeof address !== 'string') {
    return res.status(400).json({ error: 'Endereço é obrigatório' });
  }

  // Se for JSON, validar estrutura
  try {
    const parsedAddress = JSON.parse(address);
    if (typeof parsedAddress === 'object' && parsedAddress !== null) {
      const addr = parsedAddress as Address;
      if (!addr.street || !addr.number || !addr.neighborhood || 
          !addr.city || !addr.state || !addr.zipCode) {
        return res.status(400).json({ error: 'Endereço incompleto' });
      }
    }
  } catch {
    // Se não for JSON válido, aceitar como string simples (compatibilidade)
  }

  // Validar status ativo
  if (active !== undefined && typeof active !== 'boolean') {
    return res.status(400).json({ error: 'Status ativo deve ser verdadeiro ou falso' });
  }

  next();
}; 