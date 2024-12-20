"use client";
import React, {useEffect, useRef, useState} from 'react';
import { useCV } from '@/context/CVContext';
import { Eye, History, RotateCw, Download, X, Save } from 'lucide-react';
import Button from '@/components/atoms/Button';
import PersonalDetailsForm from '@/components/organisms/PersonalDetailsForm';
import ExperienceForm from '@/components/organisms/ExperienceForm';
import EducationForm from '@/components/organisms/EducationForm';
import LanguageForm from '@/components/organisms/LanguageForm';
import SkillForm from '@/components/organisms/SkillForm';
import HobbyForm from '@/components/organisms/HobbyForm';
import CVPreview from '@/components/organisms/CVPreview';
import TemplateSelector from '@/components/organisms/TemplateSelector';

import { downloadPDF } from '@/lib/utils';
import Select from '@/components/atoms/Select';
import {cvStorage} from "@/lib/storage";
import VersionManager from "@/components/organisms/VersionManager";
import ExportModal from "@/components/organisms/ExportModal";

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
    const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
    const [isVersionManagerOpen, setIsVersionManagerOpen] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const [scale, setScale] = useState(1);
    const [toast, setToast] = useState<ToastState>({
        show: false,
        message: '',
        type: 'success'
    });

    const cv = useCV();

    const {
        skills,
        theme,
        setTheme,
        resetAll,
    } = useCV();

    const handleDownload = async () => {
        if (cvPreviewRef.current) {
            try {
                setIsDownloading(true);
                await downloadPDF(cvPreviewRef.current);

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
        setScale(1);
    };

    // Vérifier si c'est la première visite
    useEffect(() => {
        if (cvStorage.isFirstVisit()) {
            setIsTemplateSelectorOpen(true);
        }
    }, []);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    const handleTemplateSelect = () => {
        setIsTemplateSelectorOpen(false);
        showToast('Template appliqué avec succès');
    };

    const handleVersionSave = () => {
        const data = {
            personalDetails: cv.personalDetails,
            experiences: cv.experiences,
            educations: cv.educations,
            languages: cv.languages,
            skills: cv.skills,
            hobbies: cv.hobbies,
            theme: cv.theme,
        };
        cvStorage.saveVersion(data);
        showToast('Version sauvegardée avec succès');
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
                                <Button
                                    variant="outline"
                                    icon={Eye}
                                    onClick={() => setIsTemplateSelectorOpen(true)}
                                >
                                    Templates
                                </Button>
                                    <Button
                                        variant="outline"
                                        icon={History}
                                        onClick={() => setIsVersionManagerOpen(true)}
                                    >
                                        Versions
                                    </Button>
                                    <Button
                                        variant="outline"
                                        icon={Save}
                                        onClick={handleVersionSave}
                                    >
                                        Sauvegarder
                                    </Button>
                                    <Button
                                        variant="primary"
                                        icon={Download}
                                        onClick={() => setIsExportModalOpen(true)}
                                    >
                                        Exporter
                                    </Button>
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
                                    <PersonalDetailsForm  />
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
                                    <EducationForm  />
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
                                        <SkillForm skills={skills} onAddSkill={(skill) => skills.push(skill)} onRemoveSkill={(index) => skills.splice(index, 1)} />
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

            {isPreviewOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-base-100 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto">
                        <div className="sticky top-0 bg-base-100 p-4 flex justify-between items-center border-b">
                            <h2 className="text-lg font-bold">Aperçu du CV</h2>
                            <div className="flex gap-2">
                                <Button variant="primary" icon={Save} onClick={handleDownload} disabled={isDownloading}>
                                    {isDownloading ? 'Téléchargement...' : 'Télécharger'}
                                </Button>
                                <Button variant="primary" icon={X} onClick={() => setIsPreviewOpen(false)}>
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
            {isTemplateSelectorOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-base-100 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
                        <div className="sticky top-0 bg-base-100 p-4 flex justify-between items-center border-b">
                            <h2 className="text-lg font-bold">Choisir un template</h2>
                            <Button
                                variant="primary"
                                icon={X}
                                onClick={() => setIsTemplateSelectorOpen(false)}
                            >
                                Fermer
                            </Button>
                        </div>
                        <div className="p-4">
                            <TemplateSelector
                                onSelect={() => {
                                    setIsTemplateSelectorOpen(false);
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
            {isVersionManagerOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-base-100 rounded-lg max-w-4xl w-full">
                        <div className="p-4 border-b">
                            <h2 className="text-lg font-bold">Gérer les versions</h2>
                        </div>
                        <div className="p-4">
                            <VersionManager onClose={() => setIsVersionManagerOpen(false)} />
                        </div>
                    </div>
                </div>
            )}

            {isExportModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-base-100 rounded-lg max-w-2xl w-full">
                        <div className="p-4 border-b">
                            <h2 className="text-lg font-bold">Exporter le CV</h2>
                        </div>
                        <div className="p-4">
                            <ExportModal
                                previewRef={cvPreviewRef}
                                onClose={() => setIsExportModalOpen(false)}
                            />
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CVBuilder;
