"use client";
import React, { useState } from 'react';
import { useCV } from '@/context/CVContext';
import { Language } from '@/types';
import FormField from '@/components/molecules/FormField';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import { Plus, Languages, X } from 'lucide-react';
import { validateRequired } from '@/lib/utils';
import useForm from '@/hooks/useForm';

const defaultLanguage: Language = {
    language: '',
    proficiency: '',
};

const proficiencyLevels = [
    { value: 'Débutant', label: 'Débutant' },
    { value: 'Intermédiaire', label: 'Intermédiaire' },
    { value: 'Avancé', label: 'Avancé' },
];

const LanguageForm: React.FC = () => {
    const { languages, updateLanguages } = useCV();
    const [isAdding, setIsAdding] = useState(false);

    const validationRules = {
        language: (value: string) => validateRequired(value, 'Langue'),
        proficiency: (value: string) => validateRequired(value, 'Niveau'),
    };

    const { formData, errors, handleChange, resetForm, isValid } = useForm<Language>(
        defaultLanguage,
        validationRules
    );

    const handleAdd = () => {
        if (isValid()) {
            updateLanguages([...languages, formData]);
            resetForm();
            setIsAdding(false);
        }
    };

    const handleRemove = (index: number) => {
        const newLanguages = languages.filter((_, i) => i !== index);
        updateLanguages(newLanguages);
    };

    return (
        <div className="space-y-4">
            <div className="space-y-4">
                {languages.map((lang, index) => (
                    <div key={index} className="card bg-base-200">
                        <div className="card-body py-3">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold">{lang.language}</h3>
                                    <p className="text-sm text-base-content/70">{lang.proficiency}</p>
                                </div>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    icon={X}
                                    onClick={() => handleRemove(index)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Formulaire d'ajout */}
            {!isAdding ? (
                <Button variant="primary" icon={Plus} onClick={() => setIsAdding(true)}>
                    Ajouter une langue
                </Button>
            ) : (
                <div className="card bg-base-200">
                    <div className="card-body">
                        <FormField
                            label="Langue"
                            name="language"
                            value={formData.language}
                            onChange={(e) => handleChange('language', e.target.value)}
                            error={errors.language}
                            icon={Languages}
                            required
                        />

                        <Select
                            label="Niveau"
                            options={proficiencyLevels}
                            value={formData.proficiency}
                            onChange={(value) => handleChange('proficiency', value)}
                            error={errors.proficiency}
                            required
                        />

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

export default LanguageForm;
