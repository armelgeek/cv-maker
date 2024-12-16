export interface PersonalDetails {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    photoUrl: string;
    postSeeking: string;
    description: string;
}

export interface Experience {
    jobTitle: string;
    companyName: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Education {
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface Language {
    language: string;
    proficiency: string;
}

export interface Skill {
    name: string;
}

export interface Hobby {
    name: string;
}

export interface Theme {
    name: string;
    value: string;
}
