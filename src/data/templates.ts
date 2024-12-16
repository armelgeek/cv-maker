import { PersonalDetails, Experience, Education, Language, Skill, Hobby } from '@/types';

interface CVTemplate {
    id: string;
    name: string;
    description: string;
    theme: string;
    data: {
        personalDetails: PersonalDetails;
        experiences: Experience[];
        educations: Education[];
        languages: Language[];
        skills: Skill[];
        hobbies: Hobby[];
    };
}

export const templates: CVTemplate[] = [
    {
        id: 'developer',
        name: 'Développeur Web',
        description: 'Template idéal pour les développeurs web',
        theme: 'corporate',
        data: {
            personalDetails: {
                fullName: 'Alex Martin',
                email: 'alex@example.com',
                phone: '06 12 34 56 78',
                address: 'Paris, France',
                photoUrl: '',
                postSeeking: 'Développeur Full Stack',
                description: 'Développeur passionné avec 5 ans d\'expérience...'
            },
            experiences: [
                {
                    jobTitle: 'Développeur Full Stack Senior',
                    companyName: 'Tech Solutions',
                    startDate: '2020-01-01',
                    endDate: '2023-12-31',
                    description: 'Développement d\'applications web avec React et Node.js...'
                }
            ],
            educations: [
                {
                    school: 'École d\'Ingénieurs',
                    degree: 'Master en Informatique',
                    startDate: '2015-09-01',
                    endDate: '2018-06-30',
                    description: 'Spécialisation en développement web et mobile'
                }
            ],
            languages: [
                {
                    language: 'Anglais',
                    proficiency: 'Avancé'
                }
            ],
            skills: [
                { name: 'React' },
                { name: 'TypeScript' },
                { name: 'Node.js' }
            ],
            hobbies: [
                { name: 'Contribution Open Source' },
                { name: 'Veille technologique' }
            ]
        }
    },
    {
        id: 'designer',
        name: 'Designer UX/UI',
        description: 'Template pour les designers et créatifs',
        theme: 'luxury',
        data: {
            personalDetails: {
                fullName: 'Sophie Dubois',
                email: 'sophie@example.com',
                phone: '06 98 76 54 32',
                address: 'Lyon, France',
                photoUrl: '',
                postSeeking: 'Designer UX/UI Senior',
                description: 'Designer créative spécialisée dans l\'expérience utilisateur...'
            },
            experiences: [
                {
                    jobTitle: 'Designer UX/UI',
                    companyName: 'Creative Studio',
                    startDate: '2019-01-01',
                    endDate: '2023-12-31',
                    description: 'Conception d\'interfaces utilisateur et d\'expériences digitales...'
                }
            ],
            educations: [
                {
                    school: 'École de Design',
                    degree: 'Master en Design Numérique',
                    startDate: '2016-09-01',
                    endDate: '2019-06-30',
                    description: 'Formation en design d\'interface et expérience utilisateur'
                }
            ],
            languages: [
                {
                    language: 'Anglais',
                    proficiency: 'Avancé'
                }
            ],
            skills: [
                { name: 'Figma' },
                { name: 'Adobe XD' },
                { name: 'Sketch' }
            ],
            hobbies: [
                { name: 'Photographie' },
                { name: 'Design graphique' }
            ]
        }
    }
];
