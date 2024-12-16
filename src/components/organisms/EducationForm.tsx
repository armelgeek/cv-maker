"use client";
import React, { useState } from 'react';
import { useCV } from '@/context/CVContext';
import { Education } from '@/types';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';
import { Plus, GraduationCap, Building2, Calendar, X } from 'lucide-react';
import { validateRequired } from '@/lib/utils';
import useForm from '@/hooks/useForm';

const defaultEducation: Education = {
    school: '',
    degree: '',
    startDate: '',
    endDate: '',
    description: '',
};

const EducationForm: React.FC = () => {
    const { educations, updateEducations } = useCV();
    const [isAdding, setIsAdding] = useState(false);

    const validationRules = {
        school: (value: string) => validateRequired(value, 'Nom de l\'école'),
        degree: (value: string) => validateRequired(value, 'Diplôme'),
        startDate: (value: string) => validateRequired(value, 'Date de début'),
        endDate: (value: string) => validateRequired(value, 'Date de fin'),
    };

    const { formData, errors, handleChange, resetForm, isValid } = useForm<Education>(
        defaultEducation,
        validationRules
    );

    const handleAdd = () => {
        if (isValid()) {
            updateEducations([...educations, formData]);
            resetForm();
            setIsAdding(false);
        }
    };

    const handleRemove = (index: number) => {
        const newEducations = educations.filter((_, i) => i !== index);
        updateEducations(newEducations);
    };

    return (
        <div className="space-y-4">
            {/* Liste des formations */}
            <div className="space-y-4">
                {educations.map((edu, index) => (
                    <div key={index} className="card bg-base-200">
                        <div className="card-body">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold">{edu.degree}</h3>
                                    <p className="text-sm text-base-content/70">{edu.school}</p>
                                    <p className="text-sm">
                                        {new Date(edu.startDate).toLocaleDateString()} -{' '}
                                        {new Date(edu.endDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    icon={X}
                                    onClick={() => handleRemove(index)}
                                />
                            </div>
                            <p className="text-sm mt-2">{edu.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {!isAdding ? (
                <Button variant="primary" icon={Plus} onClick={() => setIsAdding(true)}>
                    Ajouter une formation
                </Button>
            ) : (
                <div className="card bg-base-200">
                    <div className="card-body">
                        <FormField
                            label="École"
                            name="school"
                            value={formData.school}
                            onChange={(e) => handleChange('school', e.target.value)}
                            error={errors.school}
                            icon={Building2}
                            required
                        />

                        <FormField
                            label="Diplôme"
                            name="degree"
                            value={formData.degree}
                            onChange={(e) => handleChange('degree', e.target.value)}
                            error={errors.degree}
                            icon={GraduationCap}
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
                                placeholder="Décrivez votre formation..."
                            />
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <Button
                                variant="primary"
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

export default EducationForm;
