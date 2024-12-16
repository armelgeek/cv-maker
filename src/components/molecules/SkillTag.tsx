import React from 'react';
import { X } from 'lucide-react';
import Button from '@/components/atoms/Button';

interface SkillTagProps {
    name: string;
    onRemove: () => void;
}

const SkillTag: React.FC<SkillTagProps> = ({ name, onRemove }) => {
    return (
        <div className="inline-flex items-center bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
            <span>{name}</span>
            <Button
                variant="secondary"
                size="sm"
                className="ml-2 p-0 min-h-0 h-4 w-4 rounded-full"
                onClick={onRemove}
            >
                <X className="w-3 h-3" />
            </Button>
        </div>
    );
};

export default SkillTag;
