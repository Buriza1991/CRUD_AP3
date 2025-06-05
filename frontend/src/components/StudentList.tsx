import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentResponse } from '../types/student';
import { api } from '../services/api';
import { translateBelt, translateMartialArt } from '../utils/translations';
import './StudentList.css';

export const StudentList: React.FC = () => {
  const [students, setStudents] = useState<StudentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/students');
      console.log('Estudantes carregados:', response.data);
      setStudents(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar estudantes');
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmMessage = 'Tem certeza que deseja excluir este estudante?\n\nEsta ação não pode ser desfeita.';
    if (window.confirm(confirmMessage)) {
      try {
        setError(null);
        setDeletingId(id);
        await api.delete(`/students/${id}`);
        setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
        console.log('Estudante excluído com sucesso');
      } catch (err: any) {
        console.error('Error deleting student:', err);
        setError('Erro ao excluir estudante: ' + (err.response?.data?.error || err.message));
        setTimeout(() => {
          fetchStudents();
          setError(null);
        }, 3000);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleEdit = (id: number) => {
    console.log('Editando estudante com ID:', id);
    navigate(`/edit/${id}`);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const formatPhone = (phone: string) => {
    // Formatar telefone brasileiro: (11) 99999-9999 ou (11) 9999-9999
    if (phone.length === 11) {
      return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
    } else if (phone.length === 10) {
      return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`;
    }
    return phone;
  };

  const formatAddress = (address: string | any) => {
    // Se for string, tentar fazer parse
    if (typeof address === 'string') {
      try {
        const parsed = JSON.parse(address);
        return formatAddressObject(parsed);
      } catch {
        // Se não for JSON válido, retornar como está
        return address;
      }
    } else if (typeof address === 'object' && address !== null) {
      return formatAddressObject(address);
    }
    return 'Endereço não informado';
  };

  const formatAddressObject = (addr: any) => {
    const parts = [];
    if (addr.street) parts.push(addr.street);
    if (addr.number) parts.push(addr.number);
    if (addr.complement) parts.push(addr.complement);
    if (addr.neighborhood) parts.push(addr.neighborhood);
    if (addr.city && addr.state) {
      parts.push(`${addr.city}/${addr.state}`);
    } else if (addr.city) {
      parts.push(addr.city);
    }
    if (addr.zipCode) parts.push(`CEP: ${addr.zipCode}`);
    
    return parts.join(', ');
  };

  const getMartialArtEmoji = (art: string) => {
    const emojis: { [key: string]: string } = {
      'jiujitsu': '🥋',
      'muaythai': '🥊'
    };
    return emojis[art] || '🥋';
  };

  if (loading) return <div className="loading">🥋 Carregando alunos...</div>;
  if (error) return <div className="error-message">⚠️ {error}</div>;

  return (
    <div className="student-list">
      <h2>🏆 Lista de Estudantes</h2>
      
      {students.length === 0 ? (
        <div className="no-students">
          <p>Nenhum estudante cadastrado ainda.</p>
          <button className="btn btn-edit" onClick={() => navigate('/new')}>
            ➕ Cadastrar Primeiro Aluno
          </button>
        </div>
      ) : (
        <div className="students-grid">
          {students.map(student => (
            <div key={student.id} className="student-card">
              <div className="student-header">
                <div className="student-name-section">
                  <h3 className="student-name">{student.name}</h3>
                  {student.customId && (
                    <span className="student-custom-id">ID: {student.customId}</span>
                  )}
                </div>
                {student.belt && (
                  <span className={`student-belt belt-${student.belt.toLowerCase()}`}>
                    {translateBelt(student.belt)}
                  </span>
                )}
              </div>

              <div className="student-info">
                <div className="info-item">
                  <span className="info-label">🎂 Idade:</span>
                  <span>{student.age} anos</span>
                </div>
                
                <div className="info-item">
                  <span className="info-label">⚖️ Peso:</span>
                  <span>{student.weight} kg</span>
                </div>

                <div className="info-item">
                  <span className="info-label">📞 Telefone:</span>
                  <span>{formatPhone(student.phone)}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">📧 Email:</span>
                  <span>{student.email}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">📍 Endereço:</span>
                  <span style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
                    {formatAddress(student.address)}
                  </span>
                </div>

                <div className="info-item">
                  <span className="info-label">📅 Início:</span>
                  <span>{formatDate(student.startDate)}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">🥋 Artes:</span>
                  <div className="martial-arts">
                    {(Array.isArray(student.martialArts) ? student.martialArts : []).map((art, index) => (
                      <span key={index} className="martial-art-tag">
                        {getMartialArtEmoji(art)} {translateMartialArt(art)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="info-item">
                  <span className="info-label">✅ Status:</span>
                  <span className={student.active ? 'student-status status-active' : 'student-status status-inactive'}>
                    {student.active ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>

              <div className="student-actions">
                <button 
                  className="btn btn-edit" 
                  onClick={() => {
                    console.log('Botão editar clicado para ID:', student.id);
                    handleEdit(student.id);
                  }}
                  type="button"
                  aria-label={`Editar ${student.name}`}
                  title={`Editar ${student.name}`}
                >
                  ✏️ Editar
                </button>
                <button 
                  className="btn btn-delete" 
                  onClick={() => {
                    console.log('Botão excluir clicado para ID:', student.id);
                    handleDelete(student.id);
                  }}
                  type="button"
                  aria-label={`Excluir ${student.name}`}
                  title={`Excluir ${student.name}`}
                  disabled={deletingId === student.id}
                >
                  {deletingId === student.id ? '⏳ Excluindo...' : '🗑️ Excluir'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 