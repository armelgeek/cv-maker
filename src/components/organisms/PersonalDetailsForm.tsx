"use client";
import React from 'react';
import { useCV } from '@/context/CVContext';
import FormField from '@/components/molecules/FormField';
import { Mail, Phone, MapPin, User, Briefcase } from 'lucide-react';
import { validateEmail, validatePhone, validateRequired } from '@/lib/utils';
import useForm from '@/hooks/useForm';
import { PersonalDetails } from '@/types';

const PersonalDetailsForm: React.FC = () => {
    const { personalDetails, updatePersonalDetails, setProfileImage } = useCV();

    const validationRules = {
        fullName: (value: string) => validateRequired(value, 'Nom complet'),
        email: validateEmail,
        phone: validatePhone,
        address: (value: string) => validateRequired(value, 'Adresse'),
        postSeeking: (value: string) => validateRequired(value, 'Poste recherché'),
    };

    const { formData, errors, handleChange } = useForm<PersonalDetails>(
        personalDetails,
        validationRules
    );

    const handleInputChange = (field: keyof PersonalDetails, value: string) => {
        handleChange(field, value);
        updatePersonalDetails({ ...personalDetails, [field]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProfileImage(file);
        }
    };

    return (
        <div className="space-y-4">
            <FormField
                label="Nom complet"
                name="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                error={errors.fullName}
                icon={User}
                required
            />

            <div className="grid grid-cols-2 gap-4">
                <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={errors.email}
                    icon={Mail}
                    required
                />

                <FormField
                    label="Téléphone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    error={errors.phone}
                    icon={Phone}
                    required
                />
            </div>

            <FormField
                label="Adresse"
                name="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                error={errors.address}
                icon={MapPin}
                required
            />

            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Photo de profil</span>
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input file-input-bordered w-full"
                />
            </div>

            <FormField
                label="Poste recherché"
                name="postSeeking"
                value={formData.postSeeking}
                onChange={(e) => handleInputChange('postSeeking', e.target.value)}
                error={errors.postSeeking}
                icon={Briefcase}
                required
            />

            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="textarea textarea-bordered h-24"
                    placeholder="Décrivez-vous en quelques lignes..."
                />
            </div>
        </div>
    );
};

export default PersonalDetailsForm;
