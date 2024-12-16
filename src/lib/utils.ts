export const formatDate = (date: string): string => {
    if (!date) return '';

    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    };

    return new Date(date).toLocaleDateString('fr-FR', options);
};

export const validateEmail = (email: string): string | undefined => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email) return 'Email requis';
    if (!emailRegex.test(email)) return 'Email invalide';
};

export const validatePhone = (phone: string): string | undefined => {
    const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
    if (!phone) return 'Numéro de téléphone requis';
    if (!phoneRegex.test(phone)) return 'Numéro de téléphone invalide';
};

export const validateRequired = (value: string, fieldName: string): string | undefined => {
    if (!value?.trim()) return `${fieldName} requis`;
};

export const getImageUrl = (file: File | null): string => {
    if (!file) return '/profile-placeholder.jpg';
    return URL.createObjectURL(file);
};

export const downloadPDF = async (element: HTMLElement, fileName: string = 'cv.pdf'): Promise<void> => {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const { default: html2canvas } = await import('html2canvas-pro');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const { default: jsPDF } = await import('jspdf');

        const canvas = await html2canvas(element, {
            scale: 3,
            useCORS: true,
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'A4',
        });

        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save(fileName);

    } catch (error) {
        console.error('Erreur lors de la génération du PDF:', error);
        throw error;
    }
};
