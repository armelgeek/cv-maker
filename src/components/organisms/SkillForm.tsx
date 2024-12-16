"use client";
import React, { useState } from 'react';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import SkillTag from '@/components/molecules/SkillTag';
import { Plus } from 'lucide-react';
import { Skill } from '@/types';

interface SkillFormProps {
    skills: Skill[];
    onAddSkill: (skill: Skill) => void;
    onRemoveSkill: (index: number) => void;
}

const SkillForm: React.FC<SkillFormProps> = ({ skills, onAddSkill, onRemoveSkill}) => {
    const [newSkill, setNewSkill] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newSkill.trim()) {
            onAddSkill({ name: newSkill.trim() });
            setNewSkill('');
        }
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                    placeholder="Nouvelle compétence"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="flex-1"
                />
                <Button type="submit" icon={Plus}>
                    Ajouter
                </Button>
            </form>

            <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                    <SkillTag
                        key={index}
                        name={skill.name}
                        onRemove={() => onRemoveSkill(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default SkillForm;
