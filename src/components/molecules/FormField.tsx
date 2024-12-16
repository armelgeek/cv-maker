// src/components/molecules/FormField/index.tsx
import React from 'react';
import Input from '@/components/atoms/Input';
import { LucideIcon } from 'lucide-react';

interface FormFieldProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    icon?: LucideIcon;
    required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type = 'text', placeholder, value, onChange, error, icon: Icon, required = false }) => {
    return (
        <div className="relative">
            {Icon && (
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Icon className="w-5 h-5" />
                </div>
            )}
            <Input
                label={label}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                error={error}
                required={required}
                className={Icon ? 'pl-10' : ''}
            />
        </div>
    );
};

export default FormField;
