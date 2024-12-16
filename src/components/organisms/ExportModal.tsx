
import React, { useState } from 'react';
import { FileText, Code, Database, Download } from 'lucide-react';
import Button from '@/components/atoms/Button';
import { exportFormats, exportCV, ExportFormat } from '@/lib/export';
import { useCV } from '@/context/CVContext';

interface ExportModalProps {
    previewRef: React.RefObject<HTMLDivElement>;
    onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ previewRef, onClose }) => {
    const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('pdf');
    const [isExporting, setIsExporting] = useState(false);

    const {
        personalDetails,
        experiences,
        educations,
        languages,
        skills,
        hobbies,
        theme,
    } = useCV();

    const handleExport = async () => {
        try {
            setIsExporting(true);
            const data = {
                personalDetails,
                experiences,
                educations,
                languages,
                skills,
                hobbies,
                theme,
            };

            await exportCV(selectedFormat, data, previewRef.current);

            const confetti = (await import('canvas-confetti')).default;
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            onClose();
        } catch (error) {
            console.error('Erreur lors de l\'export:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'FileText':
                return FileText;
            case 'Code':
                return Code;
            case 'Database':
                return Database;
            default:
                return FileText;
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {exportFormats.map(({ id, label, icon }) => {
                    const Icon = getIcon(icon);
                    return (
                        <button
                            key={id}
                            className={`p-4 rounded-lg border-2 transition-all hover:border-primary
                ${selectedFormat === id ? 'border-primary bg-primary/10' : 'border-base-300'}
              `}
                            onClick={() => setSelectedFormat(id as ExportFormat)}
                        >
                            <div className="flex flex-col items-center gap-2">
                                <Icon className={`w-8 h-8 ${selectedFormat === id ? 'text-primary' : ''}`} />
                                <span className="font-medium">{label}</span>
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="prose max-w-none">
                <h3>Description du format</h3>
                <p>
                    {selectedFormat === 'pdf' && (
                        "Format PDF standard, idéal pour l'impression et le partage professionnel."
                    )}
                    {selectedFormat === 'html' && (
                        "Export en HTML, parfait pour publier votre CV en ligne ou le personnaliser davantage."
                    )}
                    {selectedFormat === 'json' && (
                        "Format JSON pour sauvegarder vos données et les réimporter ultérieurement."
                    )}
                </p>
            </div>

            <div className="flex justify-end gap-4">
                <Button variant="ghost" onClick={onClose}>
                    Annuler
                </Button>
                <Button
                    variant="primary"
                    icon={Download}
                    onClick={handleExport}
                    disabled={isExporting}
                >
                    {isExporting ? 'Export en cours...' : 'Exporter'}
                </Button>
            </div>
        </div>
    );
};

export default ExportModal;
