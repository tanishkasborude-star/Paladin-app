export const skillTreeData = {
  eras: [
    {
      id: 'ancient',
      label: 'Ancient World',
      icon: '🏛️',
      description: '3000 BCE – 500 CE',
      color: '#d4a533',
      lessons: ['rome-rise', 'egypt-pharaohs']
    },
    {
      id: 'medieval',
      label: 'Medieval Era',
      icon: '⚔️',
      description: '500 – 1500 CE',
      color: '#8b5cf6',
      lessons: ['crusades', 'viking-age']
    },
    {
      id: 'modern',
      label: 'Modern History',
      icon: '🌍',
      description: '1500 CE – Present',
      color: '#3b82f6',
      lessons: ['french-revolution', 'world-war-one']
    }
  ],
  prerequisites: {
    medieval: { era: 'ancient', requiredLessons: 2 },
    modern: { era: 'medieval', requiredLessons: 2 }
  }
};
