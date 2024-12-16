import React, { useState } from 'react';
import { Save, Trash2, Clock, Check } from 'lucide-react';
import Button from '@/components/atoms/Button';
import { cvStorage, CVVersion } from '@/lib/storage';
import { useCV } from '@/context/CVContext';

interface VersionListItemProps {
    version: CVVersion;
    isActive: boolean;
    onSelect: () => void;
    onDelete: () => void;
}

const VersionListItem: React.FC<VersionListItemProps> = ({
                                                             version,
                                                             isActive,
                                                             onSelect,
                                                             onDelete,
                                                         }) => (
    <div className={`flex items-center justify-between p-4 border-b hover:bg-base-200 
    ${isActive ? 'bg-primary/10' : ''}`}>
        <div className="flex items-center gap-4">
            <Clock className="w-4 h-4 text-primary" />
            <div>
                <h3 className="font-medium">{version.name}</h3>
                <p className="text-sm text-base-content/70">
                    {new Date(version.date).toLocaleString()}
                </p>
            </div>
        </div>
        <div className="flex gap-2">
            {isActive ? (
                <Check className="w-5 h-5 text-primary" />
            ) : (
                <Button variant="primary" size="sm" onClick={onSelect}>
                    Charger
                </Button>
            )}
            <Button
                variant="primary"
                size="sm"
                icon={Trash2}
                onClick={onDelete}
                className="text-error"
            />
        </div>
    </div>
);

const VersionManager: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [newVersionName, setNewVersionName] = useState('');
    const {
        personalDetails,
        experiences,
        educations,
        languages,
        skills,
        hobbies,
        theme,
        updatePersonalDetails,
        updateExperiences,
        updateEducations,
        updateLanguages,
        updateSkills,
        updateHobbies,
        setTheme,
    } = useCV();

    const versions = cvStorage.getVersions();
    const currentVersion = cvStorage.getCurrentVersion();

    const handleSaveVersion = () => {
        const data = {
            personalDetails,
            experiences,
            educations,
            languages,
            skills,
            hobbies,
            theme,
        };
        cvStorage.saveVersion(data, newVersionName);
        setNewVersionName('');
    };

    const handleLoadVersion = (version: CVVersion) => {
        const { data } = version;
        updatePersonalDetails(data.personalDetails);
        updateExperiences(data.experiences);
        updateEducations(data.educations);
        updateLanguages(data.languages);
        updateSkills(data.skills);
        updateHobbies(data.hobbies);
        setTheme(data.theme);
        cvStorage.setCurrentVersion(version.id);
        onClose();
    };

    const handleDeleteVersion = (id: string) => {
        cvStorage.deleteVersion(id);
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newVersionName}
                    onChange={(e) => setNewVersionName(e.target.value)}
                    placeholder="Nom de la version"
                    className="input input-bordered flex-1"
                />
                <Button
                    variant="primary"
                    icon={Save}
                    onClick={handleSaveVersion}
                    disabled={!newVersionName}
                >
                    Sauvegarder
                </Button>
            </div>

            <div className="divide-y">
                {versions.map((version) => (
                    <VersionListItem
                        key={version.id}
                        version={version}
                        isActive={version.id === currentVersion?.id}
                        onSelect={() => handleLoadVersion(version)}
                        onDelete={() => handleDeleteVersion(version.id)}
                    />
                ))}
            </div>

            {versions.length === 0 && (
                <div className="text-center py-8 text-base-content/70">
                    Aucune version sauvegardée
                </div>
            )}
        </div>
    );
};

export default VersionManager;
