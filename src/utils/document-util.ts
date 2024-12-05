import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/database/database";

export interface Document {
    id: string;
    title: string;
    type: string;
    lastModified: string;
    url?: string;
}

export const uploadDocument = async (file: File, userId: string): Promise<string> => {
    const fileRef = ref(storage, `documents/${userId}/${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return url;
};

export const downloadDocument = async (docId: string, userId: string): Promise<string> => {
    const fileRef = ref(storage, `documents/${userId}/${docId}`);
    return await getDownloadURL(fileRef);
};

export const mockDocuments: Document[] = [
    { id: "1", title: "Document 1", type: "PDF", lastModified: "2024-11-30" },
    { id: "2", title: "Document 2", type: "Word", lastModified: "2024-11-28" }
];

export const searchDocuments = (query: string): Document[] => {
    return mockDocuments.filter(doc => doc.title.toLowerCase().includes(query.toLowerCase()));
};
