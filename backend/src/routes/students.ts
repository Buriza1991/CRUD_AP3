import { Router } from 'express';
import { Student } from '../models/Student';
import { validateStudentInput } from '../middlewares/validateStudent';
import { StudentInput, StudentResponse, MartialArt } from '../types/student';
import { Op } from 'sequelize';

const router = Router();

// Função para gerar ID personalizado baseado na arte marcial
const generateCustomId = async (martialArts: MartialArt[]): Promise<string> => {
  // Usar a primeira arte marcial para definir o prefixo
  const primaryArt = martialArts[0];
  let prefix = '';
  
  switch (primaryArt) {
    case 'jiujitsu':
      prefix = 'JJ';
      break;
    case 'muaythai':
      prefix = 'MT';
      break;
    default:
      prefix = 'AL'; // Aluno genérico
  }
  
  // Buscar o último número usado para esse prefixo
  const lastStudent = await Student.findOne({
    where: {
      customId: {
        [Op.like]: `${prefix}%`
      }
    },
    order: [['customId', 'DESC']]
  });
  
  let nextNumber = 1;
  if (lastStudent && lastStudent.customId) {
    const lastNumber = parseInt(lastStudent.customId.substring(2));
    if (!isNaN(lastNumber)) {
      nextNumber = lastNumber + 1;
    }
  }
  
  // Formatar com zero à esquerda (ex: 01, 02, 03...)
  return `${prefix}${nextNumber.toString().padStart(2, '0')}`;
};

// Listar todos os estudantes
router.get('/', async (req, res) => {
  try {
    const students = await Student.findAll();
    // Garantir que martialArts seja um array em cada estudante
    const studentsData = students.map(student => {
      const data = student.toJSON() as any;
      if (typeof data.martialArts === 'string') {
        try {
          data.martialArts = JSON.parse(data.martialArts);
        } catch {
          data.martialArts = [];
        }
      }
      return data;
    });
    res.json(studentsData as StudentResponse[]);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error while fetching students' });
  }
});

// Buscar estudante por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const studentData = student.toJSON() as any;
    if (typeof studentData.martialArts === 'string') {
      try {
        studentData.martialArts = JSON.parse(studentData.martialArts);
      } catch {
        studentData.martialArts = [];
      }
    }
    res.json(studentData as StudentResponse);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Internal server error while fetching student' });
  }
});

// Criar novo estudante
router.post('/', validateStudentInput, async (req, res) => {
  try {
    const studentData = req.body as StudentInput;
    
    // Gerar ID personalizado baseado na arte marcial
    const customId = await generateCustomId(studentData.martialArts);
    
    const student = await Student.create({
      ...studentData,
      customId,
      startDate: studentData.startDate || new Date(),
      active: studentData.active !== undefined ? studentData.active : true
    });
    
    const responseData = student.toJSON() as any;
    if (typeof responseData.martialArts === 'string') {
      try {
        responseData.martialArts = JSON.parse(responseData.martialArts);
      } catch {
        responseData.martialArts = [];
      }
    }
    res.status(201).json(responseData as StudentResponse);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(400).json({ error: 'Failed to create student' });
  }
});

// Atualizar estudante
router.put('/:id', validateStudentInput, async (req, res) => {
  try {
    const { id } = req.params;
    const studentData = req.body as StudentInput;
    
    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await student.update({
      ...studentData,
      startDate: studentData.startDate || student.startDate,
      active: studentData.active !== undefined ? studentData.active : student.active
    });
    
    const responseData = student.toJSON() as any;
    if (typeof responseData.martialArts === 'string') {
      try {
        responseData.martialArts = JSON.parse(responseData.martialArts);
      } catch {
        responseData.martialArts = [];
      }
    }
    res.json(responseData as StudentResponse);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(400).json({ error: 'Failed to update student' });
  }
});

// Deletar estudante
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await student.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(400).json({ error: 'Failed to delete student' });
  }
});

export default router; 