import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { StudentList } from './components/StudentList';
import { StudentForm } from './components/StudentForm';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">🥋 Academia de Artes Marciais</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Sistema de Gestão de Alunos</p>
        </header>
        
        <nav>
          <ul>
            <li>
              <Link to="/">
                <span>📋</span> Lista de Estudantes
              </Link>
            </li>
            <li>
              <Link to="/new">
                <span>➕</span> Novo Estudante
              </Link>
            </li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<StudentList />} />
            <Route path="/new" element={<StudentForm />} />
            <Route path="/edit/:id" element={<StudentForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
