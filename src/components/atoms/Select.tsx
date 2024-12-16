import React from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    label?: string;
    options: SelectOption[];
    error?: string;
    onChange: (value: string) => void;
}

const Select: React.FC<SelectProps & {placeholder: string}> = (
    {
        label,
        options,
        error,
        value,
        onChange,
        className = '',
        placeholder,
        ...props
}) => {
    return (
        <div className="form-control w-full">
            {label && (
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
            )}
            <select
                className={`select select-bordered w-full ${error ? 'select-error' : ''} ${className}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <label className="label">
                    <span className="label-text-alt text-error">{error}</span>
                </label>
            )}
        </div>
    );
};

export default Select;
