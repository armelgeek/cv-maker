"use client";
import React, { useState } from 'react';
import { useCV } from '@/context/CVContext';
import { Hobby } from '@/types';
import FormField from '@/components/molecules/FormField';
import Button from '@/components/atoms/Button';
import { Plus, Heart, X } from 'lucide-react';
import { validateRequired } from '@/lib/utils';
import useForm from '@/hooks/useForm';

const defaultHobby: Hobby = {
    name: '',
};

const HobbyForm: React.FC = () => {
    const { hobbies, updateHobbies } = useCV();
    const [isAdding, setIsAdding] = useState(false);

    const validationRules = {
        name: (value: string) => validateRequired(value, 'Loisir'),
    };

    const { formData, errors, handleChange, resetForm, isValid } = useForm<Hobby>(
        defaultHobby,
        validationRules
    );

    const handleAdd = () => {
        if (isValid()) {
            updateHobbies([...hobbies, formData]);
            resetForm();
            setIsAdding(false);
        }
    };

    const handleRemove = (index: number) => {
        const newHobbies = hobbies.filter((_, i) => i !== index);
        updateHobbies(newHobbies);
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                {hobbies.map((hobby, index) => (
                    <div key={index} className="flex items-center justify-between bg-base-200 p-2 rounded-lg">
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-primary" />
                {hobby.name}
            </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            icon={X}
                            onClick={() => handleRemove(index)}
                        />
                    </div>
                ))}
            </div>

            {/* Formulaire d'ajout */}
            {!isAdding ? (
                <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsAdding(true)}>
                    Ajouter
                </Button>
            ) : (
                <div className="card bg-base-200">
                    <div className="card-body">
                        <FormField
                            label="Loisir"
                            name="name"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            error={errors.name}
                            icon={Heart}
                            required
                        />

                        <div className="flex justify-end gap-2 mt-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    resetForm();
                                    setIsAdding(false);
                                }}
                            >
                                Annuler
                            </Button>
                            <Button variant="primary" size="sm" onClick={handleAdd}>
                                Ajouter
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HobbyForm;
