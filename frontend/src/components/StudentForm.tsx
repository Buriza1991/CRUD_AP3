import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StudentInput, VALID_MARTIAL_ARTS, VALID_BELTS, BRAZILIAN_STATES, Address } from '../types/student';
import { api } from '../services/api';
import { translateBelt, translateMartialArt } from '../utils/translations';
import './StudentForm.css';

export const StudentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchingCep, setSearchingCep] = useState(false);
  
  // Estado separado para o endereço
  const [addressFields, setAddressFields] = useState<Address>({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: ''
  });
  
  const [formData, setFormData] = useState<StudentInput>({
    name: '',
    age: '' as any,
    belt: '',
    weight: '' as any,
    martialArts: [],
    phone: '',
    email: '',
    address: '',
    startDate: new Date(),
    active: true
  });

  useEffect(() => {
    if (id) {
      fetchStudent();
    }
  }, [id]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/students/${id}`);
      const studentData = response.data;
      
      // Verificar se o endereço é string ou objeto
      if (typeof studentData.address === 'string') {
        // Tentar fazer parse se for JSON
        try {
          const parsedAddress = JSON.parse(studentData.address);
          setAddressFields(parsedAddress);
        } catch {
          // Se não for JSON, usar string como rua
          setAddressFields({
            street: studentData.address,
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
            zipCode: ''
          });
        }
      } else if (typeof studentData.address === 'object' && studentData.address !== null) {
        setAddressFields(studentData.address);
      }
      
      // Converter valores numéricos para string para exibição
      setFormData({
        ...studentData,
        age: studentData.age.toString(),
        weight: studentData.weight.toString().replace('.', ','),
        address: studentData.address // Manter o original temporariamente
      });
    } catch (err) {
      setError('Erro ao carregar dados do estudante');
      console.error('Error fetching student:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos obrigatórios
    if (!formData.name || !formData.phone || !formData.email) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    // Validar campos de endereço
    if (!addressFields.street || !addressFields.number || !addressFields.neighborhood || 
        !addressFields.city || !addressFields.state || !addressFields.zipCode) {
      setError('Por favor, preencha todos os campos obrigatórios do endereço');
      return;
    }
    
    // Validar idade e peso
    const age = Number(formData.age);
    const weight = Number(String(formData.weight).replace(',', '.'));
    
    if (isNaN(age) || age < 5 || age > 100) {
      setError('Idade deve ser um número entre 5 e 100');
      return;
    }
    
    if (isNaN(weight) || weight <= 0) {
      setError('Peso deve ser um número válido maior que zero');
      return;
    }
    
    // Validar se pelo menos uma arte marcial foi selecionada
    if (formData.martialArts.length === 0) {
      setError('Selecione pelo menos uma arte marcial');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Converter endereço para JSON string
      const addressJson = JSON.stringify(addressFields);
      
      const dataToSend = {
        ...formData,
        age: age,
        weight: weight,
        belt: formData.belt || null,
        address: addressJson
      };
      
      if (id) {
        await api.put(`/students/${id}`, dataToSend);
      } else {
        await api.post('/students', dataToSend);
      }
      navigate('/');
    } catch (err) {
      setError('Erro ao salvar estudante');
      console.error('Error saving student:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  // Handler para campos de texto que devem aceitar apenas letras e acentos
  const handleTextOnlyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Permitir apenas letras (maiúsculas e minúsculas), acentos, espaços e hífens
    const textOnly = value.replace(/[^a-zA-ZÀ-ÿ\s\-']/g, '');
    
    setFormData(prev => ({
      ...prev,
      [name]: textOnly
    }));
  };

  // Handler para campos de endereço que devem aceitar apenas letras e acentos
  const handleAddressTextChange = (fieldName: keyof Address) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir apenas letras (maiúsculas e minúsculas), acentos, espaços e hífens
    const textOnly = value.replace(/[^a-zA-ZÀ-ÿ\s\-']/g, '');
    
    setAddressFields(prev => ({
      ...prev,
      [fieldName]: textOnly
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir apenas números
    const numbersOnly = value.replace(/[^\d]/g, '');
    
    // Limitar a 11 dígitos (padrão brasileiro com DDD)
    const truncated = numbersOnly.slice(0, 11);
    
    setFormData(prev => ({
      ...prev,
      phone: truncated
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'weight') {
      // Para peso, permitir apenas números inteiros
      const numbersOnly = value.replace(/[^\d]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numbersOnly as any
      }));
    } else if (name === 'age') {
      // Para idade, apenas números inteiros
      const numbersOnly = value.replace(/[^\d]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numbersOnly as any
      }));
    }
  };

  const handleMartialArtsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      martialArts: checked
        ? [...prev.martialArts, value as any]
        : prev.martialArts.filter(art => art !== value)
    }));
  };

  // Buscar endereço pelo CEP
  const handleCepBlur = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      try {
        setSearchingCep(true);
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setAddressFields(prev => ({
            ...prev,
            street: data.logradouro || prev.street,
            neighborhood: data.bairro || prev.neighborhood,
            city: data.localidade || prev.city,
            state: data.uf || prev.state
          }));
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      } finally {
        setSearchingCep(false);
      }
    }
  };

  if (loading && !formData.name) return <div className="form-loading">🥋 Carregando...</div>;

  return (
    <div className="student-form">
      <h2>{id ? '✏️ Editar' : '➕ Novo'} Estudante</h2>
      
      {error && <div className="form-error">⚠️ {error}</div>}
      
      <div className="form-card">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <span>👤</span> Nome:
              </label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleTextOnlyChange}
                placeholder="Digite o nome completo"
                title="Apenas letras, acentos e espaços são permitidos"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>🎂</span> Idade:
              </label>
              <input
                type="text"
                name="age"
                className="form-input"
                value={formData.age}
                onChange={handleNumberChange}
                placeholder="Ex: 25"
                title="Apenas números inteiros são permitidos"
                pattern="[0-9]*"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <span>⚖️</span> Peso (kg):
              </label>
              <input
                type="text"
                name="weight"
                className="form-input"
                value={formData.weight}
                onChange={handleNumberChange}
                placeholder="Ex: 75"
                title="Apenas números inteiros são permitidos"
                pattern="[0-9]*"
                required
              />
              <small style={{ color: '#999', fontSize: '0.85rem', marginTop: '0.3rem' }}>
                Apenas números inteiros
              </small>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>🥋</span> Faixa:
              </label>
              <select name="belt" className="form-select" value={formData.belt || ''} onChange={handleChange}>
                <option value="">Selecione uma faixa (opcional)</option>
                {VALID_BELTS.map(belt => (
                  <option key={belt} value={belt}>
                    {translateBelt(belt)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span>🥊</span> Artes Marciais:
            </label>
            <div className="martial-arts-group">
              {VALID_MARTIAL_ARTS.map(art => (
                <div key={art} className="martial-art-option">
                  <input
                    type="checkbox"
                    id={art}
                    value={art}
                    className="martial-art-checkbox"
                    checked={formData.martialArts.includes(art as any)}
                    onChange={handleMartialArtsChange}
                  />
                  <label htmlFor={art} className="martial-art-label">
                    {art === 'jiujitsu' ? '🥋' : '🥊'} {translateMartialArt(art)}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <span>📞</span> Telefone:
              </label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="Apenas números: 11999999999"
                maxLength={11}
                pattern="[0-9]{10,11}"
                title="Digite apenas números (10 ou 11 dígitos)"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>📧</span> Email:
              </label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="exemplo@email.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span>📍</span> Endereço:
            </label>
            
            <div className="address-fields">
              <div className="form-row">
                <div className="form-group" style={{ maxWidth: '200px' }}>
                  <input
                    type="text"
                    name="zipCode"
                    className="form-input"
                    value={addressFields.zipCode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      const formatted = value.length > 5 
                        ? `${value.slice(0, 5)}-${value.slice(5, 8)}` 
                        : value;
                      setAddressFields(prev => ({ ...prev, zipCode: formatted }));
                    }}
                    onBlur={(e) => handleCepBlur(e.target.value)}
                    placeholder="CEP: 00000-000"
                    maxLength={9}
                    pattern="[0-9]{5}-[0-9]{3}"
                    required
                  />
                  <small style={{ color: '#999', fontSize: '0.8rem', marginTop: '0.2rem', display: 'block' }}>
                    {searchingCep ? '🔍 Buscando endereço...' : 'Digite o CEP para buscar o endereço'}
                  </small>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group" style={{ flex: 2 }}>
                  <input
                    type="text"
                    name="street"
                    className="form-input"
                    value={addressFields.street}
                    onChange={handleAddressTextChange('street')}
                    placeholder="Rua/Avenida"
                    title="Apenas letras, acentos e espaços são permitidos"
                    required
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <input
                    type="text"
                    name="number"
                    className="form-input"
                    value={addressFields.number}
                    onChange={(e) => setAddressFields(prev => ({ ...prev, number: e.target.value }))}
                    placeholder="Número"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="complement"
                    className="form-input"
                    value={addressFields.complement || ''}
                    onChange={handleAddressTextChange('complement')}
                    placeholder="Complemento (opcional)"
                    title="Apenas letras, acentos e espaços são permitidos"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="neighborhood"
                    className="form-input"
                    value={addressFields.neighborhood}
                    onChange={handleAddressTextChange('neighborhood')}
                    placeholder="Bairro"
                    title="Apenas letras, acentos e espaços são permitidos"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group" style={{ flex: 2 }}>
                  <input
                    type="text"
                    name="city"
                    className="form-input"
                    value={addressFields.city}
                    onChange={handleAddressTextChange('city')}
                    placeholder="Cidade"
                    title="Apenas letras, acentos e espaços são permitidos"
                    required
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <select
                    name="state"
                    className="form-select"
                    value={addressFields.state}
                    onChange={(e) => setAddressFields(prev => ({ ...prev, state: e.target.value }))}
                    required
                  >
                    <option value="">Estado</option>
                    {BRAZILIAN_STATES.map(state => (
                      <option key={state.code} value={state.code}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="active"
                name="active"
                className="form-checkbox"
                checked={formData.active}
                onChange={e => setFormData(prev => ({ ...prev, active: e.target.checked }))}
              />
              <label htmlFor="active" className="form-label">
                <span>✅</span> Aluno Ativo
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? '⏳ Salvando...' : '💾 Salvar'}
            </button>
            <button type="button" className="btn-cancel" onClick={() => navigate('/')}>
              ❌ Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 