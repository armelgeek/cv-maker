import { CVData } from '@/types';
import { formatDate } from './utils';

export const exportFormats = [
    { id: 'pdf', label: 'PDF', icon: 'FileText' },
    { id: 'html', label: 'HTML', icon: 'Code' },
    { id: 'json', label: 'JSON', icon: 'Database' }
] as const;

export type ExportFormat = typeof exportFormats[number]['id'];

export async function exportCV(format: ExportFormat, data: CVData, element: HTMLElement | null) {
    switch (format) {
        case 'pdf':
            return exportToPDF(element);
        case 'html':
            return exportToHTML(data);
        case 'json':
            return exportToJSON(data);
        default:
            throw new Error(`Format d'export non supporté: ${format}`);
    }
}

async function exportToPDF(element: HTMLElement | null) {
    if (!element) throw new Error('Element HTML non trouvé');

    const { default: html2canvas } = await import('html2canvas-pro');
    const { default: jsPDF } = await import('jspdf');

    const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    });

    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, width, height);
    pdf.save('cv.pdf');
}

function exportToHTML(data: CVData): void {
    const html = generateHTML(data);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cv.html';
    a.click();
    URL.revokeObjectURL(url);
}

function exportToJSON(data: CVData): void {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cv.json';
    a.click();
    URL.revokeObjectURL(url);
}

function generateHTML(data: CVData): string {
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV - ${data.personalDetails.fullName}</title>
    <style>
        /* Ajoutez ici votre CSS */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .section {
            margin-bottom: 20px;
        }
        .section-title {
            color: #2563eb;
            border-bottom: 2px solid #2563eb;
            margin-bottom: 10px;
        }
        .item {
            margin-bottom: 15px;
        }
        .item-title {
            font-weight: bold;
        }
        .item-subtitle {
            color: #666;
        }
    </style>
</head>
<body>
    <div class="section">
        <h1>${data.personalDetails.fullName}</h1>
        <p>${data.personalDetails.postSeeking}</p>
        <p>${data.personalDetails.description}</p>
        <p>Email: ${data.personalDetails.email}</p>
        <p>Téléphone: ${data.personalDetails.phone}</p>
        <p>Adresse: ${data.personalDetails.address}</p>
    </div>

    <div class="section">
        <h2 class="section-title">Expériences Professionnelles</h2>
        ${data.experiences.map(exp => `
            <div class="item">
                <div class="item-title">${exp.jobTitle}</div>
                <div class="item-subtitle">${exp.companyName}</div>
                <div>${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}</div>
                <p>${exp.description}</p>
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h2 class="section-title">Formation</h2>
        ${data.educations.map(edu => `
            <div class="item">
                <div class="item-title">${edu.degree}</div>
                <div class="item-subtitle">${edu.school}</div>
                <div>${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</div>
                <p>${edu.description}</p>
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h2 class="section-title">Compétences</h2>
        <div class="skills">
            ${data.skills.map(skill => `
                <span class="skill">${skill.name}</span>
            `).join(', ')}
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">Langues</h2>
        ${data.languages.map(lang => `
            <div class="item">
                <span class="item-title">${lang.language}</span> - 
                <span>${lang.proficiency}</span>
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h2 class="section-title">Centres d'intérêt</h2>
        <div>
            ${data.hobbies.map(hobby => hobby.name).join(', ')}
        </div>
    </div>
</body>
</html>
  `;
}
