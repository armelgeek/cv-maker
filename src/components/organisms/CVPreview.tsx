import React from 'react';
import Image from 'next/image';
import { useCV } from '@/context/CVContext';
import { formatDate } from '@/lib/utils';
import {
    Phone,
    Mail,
    MapPin,
    Briefcase,
    GraduationCap,
    Languages,
    Star,
    Heart,
} from 'lucide-react';

const CVPreview = React.forwardRef<HTMLDivElement>((_, ref) => {
    const {
        personalDetails,
        experiences,
        educations,
        languages,
        skills,
        hobbies,
        profileImage,
        theme,
    } = useCV();

    const getStarRating = (proficiency: string) => {
        const maxStars = 5;
        let filledStars = 0;

        switch (proficiency) {
            case 'Débutant':
                filledStars = 1;
                break;
            case 'Intermédiaire':
                filledStars = 3;
                break;
            case 'Avancé':
                filledStars = 5;
                break;
            default:
                filledStars = 0;
        }

        return (
            <div className="flex gap-1">
                {Array.from({ length: maxStars }).map((_, index) => (
                    <Star
                        key={index}
                        className={`w-4 h-4 ${
                            index < filledStars ? 'fill-primary text-primary' : 'text-base-300'
                        }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div
            ref={ref}
            className="bg-base-100 rounded-lg shadow-xl w-[210mm] min-h-[297mm]"
            data-theme={theme}
        >
            <div className="flex p-8 h-full">
                <div className="w-1/3 space-y-8 border-r border-base-300 pr-8">
                    <div className="aspect-square relative rounded-full overflow-hidden border-4 border-primary">
                        {profileImage ? (
                            <Image
                                src={URL.createObjectURL(profileImage)}
                                alt={personalDetails.fullName}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-base-200" />
                        )}
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-lg font-bold border-b border-primary pb-2">Contact</h2>
                        <div className="space-y-3">
                            {personalDetails.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-primary" />
                                    <span>{personalDetails.phone}</span>
                                </div>
                            )}
                            {personalDetails.email && (
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-primary" />
                                    <span className="break-all">{personalDetails.email}</span>
                                </div>
                            )}
                            {personalDetails.address && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    <span>{personalDetails.address}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {languages.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold border-b border-primary pb-2">Langues</h2>
                            <div className="space-y-3">
                                {languages.map((lang, index) => (
                                    <div key={index} className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Languages className="w-4 h-4 text-primary" />
                                            <span>{lang.language}</span>
                                        </div>
                                        {getStarRating(lang.proficiency)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {skills.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold border-b border-primary pb-2">Compétences</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="badge badge-primary badge-outline"
                                    >
                    {skill.name}
                  </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {hobbies.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold border-b border-primary pb-2">Loisirs</h2>
                            <div className="space-y-2">
                                {hobbies.map((hobby, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Heart className="w-4 h-4 text-primary" />
                                        <span>{hobby.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-2/3 pl-8 space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold">{personalDetails.fullName}</h1>
                        <h2 className="text-2xl text-primary">{personalDetails.postSeeking}</h2>
                        {personalDetails.description && (
                            <p className="text-base-content/80">{personalDetails.description}</p>
                        )}
                    </div>

                    {experiences.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold border-b border-primary pb-2 flex items-center gap-2">
                                <Briefcase className="w-5 h-5" />
                                Expériences Professionnelles
                            </h2>
                            <div className="space-y-6">
                                {experiences.map((exp, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold">{exp.jobTitle}</h3>
                                                <p className="text-primary">{exp.companyName}</p>
                                            </div>
                                            <span className="text-sm text-base-content/70">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </span>
                                        </div>
                                        <p className="text-sm text-base-content/80">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {educations.length > 0 && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold border-b border-primary pb-2 flex items-center gap-2">
                                <GraduationCap className="w-5 h-5" />
                                Formation
                            </h2>
                            <div className="space-y-6">
                                {educations.map((edu, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold">{edu.degree}</h3>
                                                <p className="text-primary">{edu.school}</p>
                                            </div>
                                            <span className="text-sm text-base-content/70">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </span>
                                        </div>
                                        <p className="text-sm text-base-content/80">{edu.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

CVPreview.displayName = 'CVPreview';

export default CVPreview;
