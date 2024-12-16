// src/lib/storage.ts
import { CVData } from '@/types';

export interface CVVersion {
    id: string;
    name: string;
    date: string;
    data: CVData;
}

class CVStorage {
    private readonly FIRST_VISIT_KEY = 'cv_first_visit';
    private readonly VERSIONS_KEY = 'cv_versions';
    private readonly CURRENT_VERSION_KEY = 'cv_current_version';

    isFirstVisit(): boolean {
        if (typeof window === 'undefined') return true;
        const visited = localStorage.getItem(this.FIRST_VISIT_KEY);
        if (!visited) {
            localStorage.setItem(this.FIRST_VISIT_KEY, 'false');
            return true;
        }
        return false;
    }

    saveVersion(data: CVData, name: string = 'Version'): CVVersion {
        const versions = this.getVersions();
        const newVersion: CVVersion = {
            id: crypto.randomUUID(),
            name: `${name} ${versions.length + 1}`,
            date: new Date().toISOString(),
            data
        };

        versions.push(newVersion);
        localStorage.setItem(this.VERSIONS_KEY, JSON.stringify(versions));
        this.setCurrentVersion(newVersion.id);
        return newVersion;
    }

    getVersions(): CVVersion[] {
        if (typeof window === 'undefined') return [];
        const versions = localStorage.getItem(this.VERSIONS_KEY);
        return versions ? JSON.parse(versions) : [];
    }

    getCurrentVersion(): CVVersion | null {
        if (typeof window === 'undefined') return null;
        const currentId = localStorage.getItem(this.CURRENT_VERSION_KEY);
        if (!currentId) return null;

        const versions = this.getVersions();
        return versions.find(v => v.id === currentId) || null;
    }

    setCurrentVersion(id: string): void {
        localStorage.setItem(this.CURRENT_VERSION_KEY, id);
    }

    deleteVersion(id: string): void {
        const versions = this.getVersions().filter(v => v.id !== id);
        localStorage.setItem(this.VERSIONS_KEY, JSON.stringify(versions));

        if (this.getCurrentVersion()?.id === id) {
            const lastVersion = versions[versions.length - 1];
            if (lastVersion) {
                this.setCurrentVersion(lastVersion.id);
            } else {
                localStorage.removeItem(this.CURRENT_VERSION_KEY);
            }
        }
    }

    clearAll(): void {
        localStorage.removeItem(this.VERSIONS_KEY);
        localStorage.removeItem(this.CURRENT_VERSION_KEY);
    }
}

export const cvStorage = new CVStorage();
