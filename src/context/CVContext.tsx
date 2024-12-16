"use client";
import React, { createContext, useContext, useState, useCallback } from 'react';
import {
    PersonalDetails,
    Experience,
    Education,
    Language,
    Skill,
    Hobby,
} from '@/types';

interface CVContextType {
    personalDetails: PersonalDetails;
    experiences: Experience[];
    educations: Education[];
    languages: Language[];
    skills: Skill[];
    hobbies: Hobby[];
    profileImage: File | null;
    theme: string;
    updatePersonalDetails: (details: PersonalDetails) => void;
    updateExperiences: (experiences: Experience[]) => void;
    updateEducations: (educations: Education[]) => void;
    updateLanguages: (languages: Language[]) => void;
    updateSkills: (skills: Skill[]) => void;
    updateHobbies: (hobbies: Hobby[]) => void;
    setProfileImage: (file: File | null) => void;
    setTheme: (theme: string) => void;
    resetAll: () => void;
}

const defaultPersonalDetails: PersonalDetails = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    photoUrl: '',
    postSeeking: '',
    description: '',
};

const CVContext = createContext<CVContextType | undefined>(undefined);

export const CVProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [personalDetails, setPersonalDetails] = useState<PersonalDetails>(defaultPersonalDetails);
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [educations, setEducations] = useState<Education[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [hobbies, setHobbies] = useState<Hobby[]>([]);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [theme, setTheme] = useState<string>('light');

    const updatePersonalDetails = useCallback((details: PersonalDetails) => {
        setPersonalDetails(details);
    }, []);

    const updateExperiences = useCallback((exps: Experience[]) => {
        setExperiences(exps);
    }, []);

    const updateEducations = useCallback((edus: Education[]) => {
        setEducations(edus);
    }, []);

    const updateLanguages = useCallback((langs: Language[]) => {
        setLanguages(langs);
    }, []);

    const updateSkills = useCallback((newSkills: Skill[]) => {
        setSkills(newSkills);
    }, []);

    const updateHobbies = useCallback((newHobbies: Hobby[]) => {
        setHobbies(newHobbies);
    }, []);

    const resetAll = useCallback(() => {
        setPersonalDetails(defaultPersonalDetails);
        setExperiences([]);
        setEducations([]);
        setLanguages([]);
        setSkills([]);
        setHobbies([]);
        setProfileImage(null);
    }, []);

    return (
        <CVContext.Provider
            value={{
                personalDetails,
                experiences,
                educations,
                languages,
                skills,
                hobbies,
                profileImage,
                theme,
                updatePersonalDetails,
                updateExperiences,
                updateEducations,
                updateLanguages,
                updateSkills,
                updateHobbies,
                setProfileImage,
                setTheme,
                resetAll,
            }}
        >
            {children}
        </CVContext.Provider>
    );
};

export const useCV = () => {
    const context = useContext(CVContext);
    if (context === undefined) {
        throw new Error('useCV must be used within a CVProvider');
    }
    return context;
};
