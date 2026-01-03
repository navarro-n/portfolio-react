import about from '../assets/about.webp';
import projects from '../assets/projects.png';
import cv from '../assets/cv.png';
import calculator from '../assets/calculator.webp';
import letter from '../assets/letter.png';
import mancha from '../assets/mancha.png';
import trash from '../assets/trash.webp';

export const desktopIcons = [
  {
    id: 'about',
    label: 'About-me.txt',
    icon: about,
    type: 'window',
    window: 'about',
    draggable: true,
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: projects,
    type: 'window',
    window: 'projects',
    draggable: true,
  },
  {
    id: 'cv',
    label: 'CV.pdf',
    icon: cv,
    type: 'download',
    file: '/cv.pdf',
    draggable: true,
  },
  {
    id: 'letter',
    label: 'motivation-letter.pdf',
    icon: letter,
    type: 'download',
    file: '/motivation-letter.pdf',
    draggable: true,
  },
  {
    id: 'calculator',
    label: 'Calculator',
    icon: calculator,
    type: 'window',
    window: 'calculator',
    draggable: true,
  },
  {
    id: 'mancha',
    label: '',
    icon: mancha,
    type: 'decorative',
    draggable: true,
  },
  {
    id: 'trash',
    label: 'Bad-ideas',
    icon: trash,
    type: 'decorative',
    draggable: true,
  },
];
