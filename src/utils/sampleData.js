export const sampleHorses = [
  {
    id: 1,
    name: 'Midnight Shadow',
    breed: 'Friesian',
    age: 8,
    color: 'Black',
    gender: 'Gelding',
    medicalHistory: 'Minor colic episode in 2021, fully recovered. Regular dental checkups recommended.',
    feedingSchedule: 'Morning: 2kg hay + 500g grain. Evening: 2kg hay + 500g grain. Fresh water always available.',
    trainingNotes: 'Advanced dressage training. Working on piaffe and passage. Excellent temperament for competitions.',
    specialRequirements: 'Requires regular grooming due to thick coat. Sensitive to sugar in feed.',
    emergencyContact: 'Dr. Elizabeth Blackwood - 555-0123',
    photo: ''
  },
  {
    id: 2,
    name: 'Crimson Velvet',
    breed: 'Andalusian',
    age: 12,
    color: 'Bay',
    gender: 'Mare',
    medicalHistory: 'Tendon injury in 2019, fully rehabilitated. Requires regular monitoring.',
    feedingSchedule: 'Morning: 1.5kg hay + 400g grain. Evening: 1.5kg hay + 400g grain. Supplements: joint support.',
    trainingNotes: 'Trained in classical dressage and high school movements. Former show horse with excellent breeding.',
    specialRequirements: 'Prefers quieter environment. Best with experienced handlers.',
    emergencyContact: 'Dr. Elizabeth Blackwood - 555-0123',
    photo: ''
  },
  {
    id: 3,
    name: 'Golden Baron',
    breed: 'Palomino Quarter Horse',
    age: 6,
    color: 'Palomino',
    gender: 'Stallion',
    medicalHistory: 'No significant medical history. Regular vaccinations current.',
    feedingSchedule: 'Morning: 2kg hay + 600g grain. Evening: 2kg hay + 600g grain. High-performance feed.',
    trainingNotes: 'Western pleasure and reining training. Quick learner with lots of energy.',
    specialRequirements: 'Requires plenty of exercise. Best turned out daily.',
    emergencyContact: 'Dr. James Thornfield - 555-0456',
    photo: ''
  }
];

export const sampleTasks = [
  {
    id: 1,
    title: 'Morning Feeding - Midnight Shadow',
    category: 'feeding',
    horseId: 1,
    date: new Date().toISOString().split('T')[0],
    time: '07:00',
    duration: '30 minutes',
    recurring: true,
    recurringType: 'daily',
    recurringInterval: 1,
    notes: 'Monitor feed intake and water consumption',
    completed: false
  },
  {
    id: 2,
    title: 'Morning Feeding - Crimson Velvet',
    category: 'feeding',
    horseId: 2,
    date: new Date().toISOString().split('T')[0],
    time: '07:30',
    duration: '30 minutes',
    recurring: true,
    recurringType: 'daily',
    recurringInterval: 1,
    notes: 'Include joint supplements',
    completed: false
  },
  {
    id: 3,
    title: 'Grooming Session - All Horses',
    category: 'grooming',
    horseId: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    duration: '1 hour',
    recurring: true,
    recurringType: 'daily',
    recurringInterval: 1,
    notes: 'Full grooming routine including mane and tail care',
    completed: false
  },
  {
    id: 4,
    title: 'Training Session - Midnight Shadow',
    category: 'training',
    horseId: 1,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '10:00',
    duration: '45 minutes',
    recurring: true,
    recurringType: 'weekly',
    recurringInterval: 1,
    notes: 'Focus on piaffe and passage transitions',
    completed: false
  },
  {
    id: 5,
    title: 'Farrier Visit - All Horses',
    category: 'farrier',
    horseId: '',
    date: new Date(Date.now() + 604800000).toISOString().split('T')[0],
    time: '14:00',
    duration: '2 hours',
    recurring: true,
    recurringType: 'monthly',
    recurringInterval: 6,
    notes: 'Regular shoeing and trim for all three horses',
    completed: false
  },
  {
    id: 6,
    title: 'Vet Checkup - Annual Vaccinations',
    category: 'medical',
    horseId: '',
    date: new Date(Date.now() + 1209600000).toISOString().split('T')[0],
    time: '11:00',
    duration: '1 hour',
    recurring: true,
    recurringType: 'yearly',
    recurringInterval: 1,
    notes: 'Annual vaccinations and health check for all horses',
    completed: false
  },
  {
    id: 7,
    title: 'Evening Feeding - All Horses',
    category: 'feeding',
    horseId: '',
    date: new Date().toISOString().split('T')[0],
    time: '17:00',
    duration: '45 minutes',
    recurring: true,
    recurringType: 'daily',
    recurringInterval: 1,
    notes: 'Evening feed routine and night check',
    completed: false
  }
];

export const sampleHealthRecords = [
  {
    id: 1,
    type: 'vaccination',
    horseId: 1,
    date: '2024-01-15',
    description: 'Annual flu and tetanus vaccination',
    veterinarian: 'Dr. Elizabeth Blackwood',
    cost: '150.00',
    weight: '580',
    temperature: '37.5',
    nextDueDate: '2025-01-15',
    notes: 'No adverse reactions observed. Horse tolerated procedure well.'
  },
  {
    id: 2,
    type: 'checkup',
    horseId: 2,
    date: '2024-02-20',
    description: 'Post-injury tendon checkup',
    veterinarian: 'Dr. Elizabeth Blackwood',
    cost: '200.00',
    weight: '520',
    temperature: '37.2',
    nextDueDate: '2024-08-20',
    notes: 'Tendon healing well. Continue with current exercise regimen. Ultrasound shows good progress.'
  },
  {
    id: 3,
    type: 'supplement',
    horseId: 1,
    date: '2024-03-01',
    description: 'Started joint supplement regimen',
    veterinarian: '',
    cost: '85.00',
    weight: '',
    temperature: '',
    nextDueDate: '',
    notes: 'Began daily joint supplement as preventive measure for older horse.'
  },
  {
    id: 4,
    type: 'weight',
    horseId: 3,
    date: '2024-03-10',
    description: 'Monthly weight check',
    veterinarian: '',
    cost: '',
    weight: '550',
    temperature: '37.8',
    nextDueDate: '2024-04-10',
    notes: 'Weight stable, good body condition. Feed regimen appropriate.'
  },
  {
    id: 5,
    type: 'injury',
    horseId: 2,
    date: '2024-03-15',
    description: 'Minor cut on left hind leg',
    veterinarian: 'Dr. Elizabeth Blackwood',
    cost: '75.00',
    weight: '',
    temperature: '37.6',
    nextDueDate: '2024-03-22',
    notes: 'Small cut from pasture incident. Cleaned and bandaged. Prescribed antibiotics as precaution.'
  },
  {
    id: 6,
    type: 'checkup',
    horseId: 3,
    date: '2024-03-20',
    description: 'Pre-competition health check',
    veterinarian: 'Dr. James Thornfield',
    cost: '120.00',
    weight: '555',
    temperature: '37.4',
    nextDueDate: '2024-06-20',
    notes: 'Horse in excellent condition for upcoming show. All vitals normal.'
  }
];

export const loadSampleData = () => {
  const hasData = localStorage.getItem('velvet-bridle-horses');
  
  if (!hasData) {
    localStorage.setItem('velvet-bridle-horses', JSON.stringify(sampleHorses));
    localStorage.setItem('velvet-bridle-tasks', JSON.stringify(sampleTasks));
    localStorage.setItem('velvet-bridle-health', JSON.stringify(sampleHealthRecords));
    return true;
  }
  
  return false;
};