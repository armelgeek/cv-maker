import React, { useState } from 'react';
import { useCV } from '@/context/CVContext';
import { Experience } from '@/types';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';
import { Plus, Briefcase, Building, Calendar, X } from 'lucide-react';
import { validateRequired } from '@/lib/utils';
import useForm from '@/hooks/useForm';

const defaultExperience: Experience = {
    jobTitle: '',
    companyName: '',
    startDate: '',
    endDate: '',
    description: '',
};

const ExperienceForm: React.FC = () => {
    const { experiences, updateExperiences } = useCV();
    const [isAdding, setIsAdding] = useState(false);

    const validationRules = {
        jobTitle: (value: string) => validateRequired(value, 'Titre du poste'),
        companyName: (value: string) => validateRequired(value, 'Nom de l\'entreprise'),
        startDate: (value: string) => validateRequired(value, 'Date de début'),
        endDate: (value: string) => validateRequired(value, 'Date de fin'),
    };

    const { formData, errors, handleChange, resetForm, isValid } = useForm<Experience>(
        defaultExperience,
        validationRules
    );

    const handleAdd = () => {
        if (isValid()) {
            updateExperiences([...experiences, formData]);
            resetForm();
            setIsAdding(false);
        }
    };

    const handleRemove = (index: number) => {
        const newExperiences = experiences.filter((_, i) => i !== index);
        updateExperiences(newExperiences);
    };

    return (
        <div className="space-y-4">
            {/* Liste des expériences */}
            <div className="space-y-4">
                {experiences.map((exp, index) => (
                    <div key={index} className="card bg-base-200">
                        <div className="card-body">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold">{exp.jobTitle}</h3>
                                    <p className="text-sm text-base-content/70">{exp.companyName}</p>
                                    <p className="text-sm">
                                        {new Date(exp.startDate).toLocaleDateString()} -{' '}
                                        {new Date(exp.endDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    icon={X}
                                    onClick={() => handleRemove(index)}
                                />
                            </div>
                            <p className="text-sm mt-2">{exp.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Formulaire d'ajout */}
            {!isAdding ? (
                <Button variant="primary" icon={Plus} onClick={() => setIsAdding(true)}>
                    Ajouter une expérience
                </Button>
            ) : (
                <div className="card bg-base-200">
                    <div className="card-body">
                        <FormField
                            label="Titre du poste"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={(e) => handleChange('jobTitle', e.target.value)}
                            error={errors.jobTitle}
                            icon={Briefcase}
                            required
                        />

                        <FormField
                            label="Entreprise"
                            name="companyName"
                            value={formData.companyName}
                            onChange={(e) => handleChange('companyName', e.target.value)}
                            error={errors.companyName}
                            icon={Building}
                            required
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                label="Date de début"
                                name="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={(e) => handleChange('startDate', e.target.value)}
                                error={errors.startDate}
                                icon={Calendar}
                                required
                            />

                            <FormField
                                label="Date de fin"
                                name="endDate"
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => handleChange('endDate', e.target.value)}
                                error={errors.endDate}
                                icon={Calendar}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                className="textarea textarea-bordered h-24"
                                placeholder="Décrivez vos responsabilités et réalisations..."
                            />
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    resetForm();
                                    setIsAdding(false);
                                }}
                            >
                                Annuler
                            </Button>
                            <Button variant="primary" onClick={handleAdd}>
                                Ajouter
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExperienceForm;
