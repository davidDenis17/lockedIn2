export const generateEducationalPosts = () => {
    const subjects = ['Mathematics', 'Physics', 'Computer Science', 'Biology', 'Chemistry', 'Literature', 'History', 'Economics'];
    const types = ['Lecture', 'Tutorial', 'Quiz', 'Research Paper', 'Case Study', 'Practice Problem'];

    const realImages = [
      'https://images.unsplash.com/photo-1540563283646-b6e0f4762a5f', // Students studying in library
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc', // Professional conference room
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f', // Computer science classroom
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6', // Coding workspace
      'https://images.unsplash.com/photo-1674027444485-cec3da58eef4', // Team collaboration
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159', // Programming workspace
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085', // Laptop and coffee workspace
      'https://images.unsplash.com/photo-1452457750107-cd084dce177d', // Students working together
      'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b', // Scientific laboratory
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e' // Study environment
    ];

    const contents = [
      { title: 'Understanding Neural Networks', content: 'Deep dive into backpropagation and gradient descent. Exploring the fundamentals of neural network architectures and their applications in modern AI systems.', type: 'Lecture' },
      { title: 'Quantum Mechanics Basics', content: 'Introduction to wave functions and uncertainty principle. Examining the foundational principles that govern quantum systems.', type: 'Tutorial' },
      { title: 'Advanced Data Structures', content: 'Implementing Red-Black trees with practical examples. Deep dive into balanced tree structures and their real-world applications.', type: 'Practice Problem' },
      { title: 'CRISPR Technology', content: 'Latest developments in gene editing techniques and their implications for modern medicine and biotechnology.', type: 'Research Paper' },
      { title: 'Shakespeare Analysis', content: 'Exploring themes in Hamlet through modern perspective. Understanding the relevance of classical literature in contemporary society.', type: 'Case Study' }
    ];
  
    return Array.from({ length: 15 }, (_, i) => ({
      id: i + 3,
      user: `professor_${Math.floor(Math.random() * 1000)}`,
      title: contents[Math.floor(Math.random() * contents.length)].title,
      content: contents[Math.floor(Math.random() * contents.length)].content,
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      type: types[Math.floor(Math.random() * types.length)],
      difficulty: ['Beginner', 'Intermediate', 'Advanced'][Math.floor(Math.random() * 3)],
      duration: `${Math.floor(Math.random() * 60 + 15)} mins`,
      likes: Math.floor(Math.random() * 50),
      comments: [],
      resources: [
        { type: 'pdf', url: '#', name: 'Lecture Notes' },
        { type: 'video', url: '#', name: 'Tutorial Recording' }
      ],
      image: realImages[Math.floor(Math.random() * realImages.length)],
      timestamp: `${Math.floor(Math.random() * 24)}h ago`,
      isRepost: false,
      originalUser: null,
      hasLiked: false
    }));
  };
  
  export const initialPosts = [
    {
      id: 1,
      user: 'math_wizard',
      title: 'Triple Integral Visualization',
      content: 'Just solved this fascinating calculus problem! Check out this visualization of a triple integral.',
      subject: 'Mathematics',
      type: 'Tutorial',
      difficulty: 'Advanced',
      duration: '45 mins',
      likes: 24,
      comments: [],
      resources: [
        { type: 'pdf', url: '#', name: 'Solution Guide' },
        { type: 'video', url: '#', name: 'Step-by-step Walkthrough' }
      ],
      image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f', // Computer science classroom, can be replaced with a math-related image
      timestamp: '2h ago',
      isRepost: false,
      originalUser: null,
      hasLiked: false
    },
    {
      id: 2,
      user: 'science_explorer',
      title: 'Quantum Tunneling Effect',
      content: 'Here\'s a great visualization of quantum tunneling effect. What do you think about this phenomenon?',
      subject: 'Physics',
      type: 'Lecture',
      difficulty: 'Intermediate',
      duration: '30 mins',
      likes: 18,
      comments: [
        { user: 'quantum_lover', content: 'This is fascinating! Can you explain more about the probability wave function?', timestamp: '1h ago' },
        { user: 'physics_student', content: 'Great visualization! Really helps understand the concept better.', timestamp: '30m ago' }
      ],
      resources: [
        { type: 'pdf', url: '#', name: 'Quantum Mechanics Notes' },
        { type: 'video', url: '#', name: 'Interactive Simulation' }
      ],
      image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b', // Scientific laboratory
      timestamp: '4h ago',
      isRepost: false,
      originalUser: null,
      hasLiked: false
    }
  ];