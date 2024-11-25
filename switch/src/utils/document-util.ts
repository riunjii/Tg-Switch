export interface Document {
    id: string;
    title: string;
    type: string;
    lastModified: string;
}

const mockDocuments: Document[] = [
    { id: '1', title: 'Relatório Anual 2023', type: 'PDF', lastModified: '2023-12-15' },
    { id: '2', title: 'Demonstrativo Financeiro Q4', type: 'XLSX', lastModified: '2024-01-10' },
    { id: '3', title: 'Manual do Funcionário', type: 'DOCX', lastModified: '2023-11-05' },
    { id: '4', title: 'Proposta de Projeto', type: 'PDF', lastModified: '2024-02-20' },
    { id: '5', title: 'Estratégia de Marketing', type: 'PPTX', lastModified: '2024-01-25' },
];


export function searchDocuments(query: string): Document[] {
    const lowercaseQuery = query.toLowerCase();
    return mockDocuments.filter(doc =>
        doc.title.toLowerCase().includes(lowercaseQuery) ||
        doc.type.toLowerCase().includes(lowercaseQuery)
    );
}

export { mockDocuments }

