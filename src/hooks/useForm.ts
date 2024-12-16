import { useState, useCallback } from 'react';

interface ValidationRules {
    [key: string]: (value: never) => string | undefined;
}

export function useForm<T extends Record<string, never>>(
    initialState: T,
    validationRules?: ValidationRules
) {
    const [formData, setFormData] = useState<T>(initialState);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

    const validateField = useCallback(
        (name: keyof T, value: never) => {
            if (validationRules && validationRules[name as string]) {
                const error = validationRules[name as string](value);
                setErrors((prev) => ({
                    ...prev,
                    [name]: error,
                }));
                return !error;
            }
            return true;
        },
        [validationRules]
    );

    const handleChange = useCallback(
        (name: keyof T, value: never) => {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
            validateField(name, value);
        },
        [validateField]
    );

    const resetForm = useCallback(() => {
        setFormData(initialState);
        setErrors({});
    }, [initialState]);

    const isValid = useCallback(() => {
        if (!validationRules) return true;

        const newErrors: Partial<Record<keyof T, string>> = {};
        let isValid = true;

        Object.keys(formData).forEach((key) => {
            if (validationRules[key]) {
                const error = validationRules[key](formData[key]);
                if (error) {
                    newErrors[key as keyof T] = error;
                    isValid = false;
                }
            }
        });

        setErrors(newErrors);
        return isValid;
    }, [formData, validationRules]);

    return {
        formData,
        errors,
        handleChange,
        resetForm,
        isValid,
        setFormData,
    };
}

export default useForm;
