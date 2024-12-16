import React from 'react';
import { templates } from '@/data/templates';
import Button from '@/components/atoms/Button';
import { useCV } from '@/context/CVContext';

const TemplateSelector: React.FC = () => {
    const {
        updatePersonalDetails,
        updateExperiences,
        updateEducations,
        updateLanguages,
        updateSkills,
        updateHobbies,
        setTheme
    } = useCV();

    const handleTemplateSelect = (templateId: string) => {
        const template = templates.find(t => t.id === templateId);
        if (!template) return;

        updatePersonalDetails(template.data.personalDetails);
        updateExperiences(template.data.experiences);
        updateEducations(template.data.educations);
        updateLanguages(template.data.languages);
        updateSkills(template.data.skills);
        updateHobbies(template.data.hobbies);
        setTheme(template.theme);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
                <div key={template.id} className="card bg-base-200 hover:shadow-lg transition-shadow">
                    <div className="card-body">
                        <h3 className="card-title">{template.name}</h3>
                        <p className="text-base-content/70">{template.description}</p>
                        <div className="card-actions justify-end mt-4">
                            <Button
                                variant="primary"
                                onClick={() => handleTemplateSelect(template.id)}
                            >
                                Utiliser ce template
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TemplateSelector;
