// src/components/templates/CVBuilder/index.tsx
import React, { useRef, useState } from 'react';
import { useCV } from '@/context/CVContext';
import { Eye, RotateCw, Download, X, Save } from 'lucide-react';
import Button from '@/components/atoms/Button';
import PersonalDetailsForm from '@/components/organisms/PersonalDetailsForm';
import ExperienceForm from '@/components/organisms/ExperienceForm';
import EducationForm from '@/components/organisms/EducationForm';
import LanguageForm from '@/components/organisms/LanguageForm';
import SkillForm from '@/components/organisms/SkillForm';
import HobbyForm from '@/components/organisms/HobbyForm';
import CVPreview from '@/components/organisms/CVPreview';
import { downloadPDF } from '@/lib/utils';
import Select from '@/components/atoms/Select';

const THEMES = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'cupcake', label: 'Cupcake' },
    { value: 'bumblebee', label: 'Bumblebee' },
    { value: 'emerald', label: 'Emerald' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'synthwave', label: 'Synthwave' },
    { value: 'retro', label: 'Retro' },
    { value: 'cyberpunk', label: 'Cyberpunk' },
    { value: 'valentine', label: 'Valentine' },
    { value: 'garden', label: 'Garden' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'dracula', label: 'Dracula' },
];

const CVBuilder: React.FC = () => {
    const cvPreviewRef = useRef<HTMLDivElement>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [scale, setScale] = useState(1);

    const {
        personalDetails,
        experiences,
        educations,
        languages,
        skills,
        hobbies,
        profileImage,
        theme,
        setTheme,
        resetAll,
    } = useCV();

    const handleDownload = async () => {
        if (cvPreviewRef.current) {
            try {
                setIsDownloading(true);
                await downloadPDF(cvPreviewRef.current);

                // Animation de confettis
                const confetti = (await import('canvas-confetti')).default;
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            } catch (error) {
                console.error('Erreur lors du téléchargement:', error);
            } finally {
                setIsDownloading(false);
            }
        }
    };

    const handlePreview = () => {
        setIsPreviewOpen(true);
        // Reset scale when opening preview
        setScale(1);
    };

    return (
        <div className="min-h-screen bg-base-100">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold">
                                CV<span className="text-primary">Builder</span>
                            </h1>
                            <div className="flex gap-2">
                                <Button variant="outline" icon={RotateCw} onClick={resetAll}>
                                    Réinitialiser
                                </Button>
                                <Button variant="primary" icon={Download} onClick={handleDownload} disabled={isDownloading}>
                                    {isDownloading ? 'Téléchargement...' : 'Télécharger'}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="card bg-base-200">
                                <div className="card-body">
                                    <h2 className="text-lg font-semibold">Informations Personnelles</h2>
                                    <PersonalDetailsForm />
                                </div>
                            </div>

                            <div className="card bg-base-200">
                                <div className="card-body">
                                    <h2 className="text-lg font-semibold">Expériences Professionnelles</h2>
                                    <ExperienceForm />
                                </div>
                            </div>

                            <div className="card bg-base-200">
                                <div className="card-body">
                                    <h2 className="text-lg font-semibold">Formation</h2>
                                    <EducationForm />
                                </div>
                            </div>

                            <div className="card bg-base-200">
                                <div className="card-body">
                                    <h2 className="text-lg font-semibold">Langues</h2>
                                    <LanguageForm />
                                </div>
                            </div>

                            <div className="flex gap-8">
                                <div className="card bg-base-200 flex-1">
                                    <div className="card-body">
                                        <h2 className="text-lg font-semibold">Compétences</h2>
                                        <SkillForm />
                                    </div>
                                </div>

                                <div className="card bg-base-200 flex-1">
                                    <div className="card-body">
                                        <h2 className="text-lg font-semibold">Loisirs</h2>
                                        <HobbyForm />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="w-full lg:w-1/2">
                        <div className="sticky top-8">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-4">
                                    <Select
                                        options={THEMES}
                                        value={theme}
                                        onChange={setTheme}
                                        className="w-48"
                                        placeholder="Choisir un thème"
                                    />
                                    <input
                                        type="range"
                                        min={0.5}
                                        max={1.5}
                                        step={0.1}
                                        value={scale}
                                        onChange={(e) => setScale(parseFloat(e.target.value))}
                                        className="range range-primary range-xs"
                                    />
                                    <span className="text-sm">{Math.round(scale * 100)}%</span>
                                </div>
                                <Button variant="primary" icon={Eye} onClick={handlePreview}>
                                    Aperçu
                                </Button>
                            </div>

                            <div className="bg-base-200 rounded-lg p-4 overflow-hidden">
                                <div
                                    style={{
                                        transform: `scale(${scale})`,
                                        transformOrigin: 'top left',
                                        transition: 'transform 0.2s ease-in-out'
                                    }}
                                >
                                    <CVPreview ref={cvPreviewRef} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de prévisualisation */}
            {isPreviewOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-base-100 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto">
                        <div className="sticky top-0 bg-base-100 p-4 flex justify-between items-center border-b">
                            <h2 className="text-lg font-bold">Aperçu du CV</h2>
                            <div className="flex gap-2">
                                <Button variant="primary" icon={Save} onClick={handleDownload} disabled={isDownloading}>
                                    {isDownloading ? 'Téléchargement...' : 'Télécharger'}
                                </Button>
                                <Button variant="ghost" icon={X} onClick={() => setIsPreviewOpen(false)}>
                                    Fermer
                                </Button>
                            </div>
                        </div>
                        <div className="p-4">
                            <CVPreview />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CVBuilder;
