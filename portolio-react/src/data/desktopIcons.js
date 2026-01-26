import aboutMe from '../assets/aboutMe.webp';
import projects from '../assets/projects.png';
import cv from '../assets/cv.png';
import calculator from '../assets/calculator.webp';
import letter from '../assets/letter.png';
import mancha from '../assets/mancha.png';
import trash from '../assets/trash.webp';

export const desktopIcons = [
  {
    id: 'trash',
    label: 'Bad-ideas',
    icon: trash,
    draggable: true,
    initial: { x: 20, y: 20 },
    size: 72,
  },
  {
    id: 'aboutMe',
    label: 'About-me.txt',
    icon: aboutMe,
    draggable: true,
    initial: { x: 500, y: 300 },
    size: 160,
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: projects,
    draggable: true,
    initial: { x: 1100, y: 80 },
    size: 72,
  },
  {
    id: 'cv',
    label: 'CV.pdf',
    icon: cv,
    draggable: true,
    initial: { x: 1050, y: 80 },
    size: 72,
  },
  {
    id: 'letter',
    label: 'motivation-letter.pdf',
    icon: letter,
    draggable: true,
    initial: { x: 1150, y: 160 },
    size: 72,
  },
  {
    id: 'calculator',
    label: 'Calculator',
    icon: calculator,
    draggable: true,
    initial: { x: 900, y: 380 },
    size: 72,
  },
  {
    id: 'mancha',
    label: '',
    icon: mancha,
    draggable: true,
    initial: { x: 600, y: 120 },
    size: 72,
  },
];

