import { useContext, useState } from 'react'
import { Search, Download, Eye, ArrowLeft } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { searchDocuments, Document, mockDocuments, uploadDocument, downloadDocument } from '@/utils/document-util'
import { Link } from 'react-router-dom'
import { AuthContext } from '@/context/AuthContext'

export const DocumentSearch = () => {
    const { user } = useContext(AuthContext)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<Document[]>(mockDocuments)

    const handleSearch = () => {
        const results = searchDocuments(searchQuery)
        setSearchResults(results)
    }

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const userId = user?.uid;
            if (!userId) {
                throw new Error("User ID is required for uploading a document");
            }
            const url = await uploadDocument(file, userId);
            console.log("Document uploaded successfully. URL:", url);
            alert("Upload realizado com sucesso!");
        } catch (error) {
            console.error("Error uploading document:", error);
            alert("Erro ao fazer upload do documento.");
        }
    };


    const handleDownload = async (docId: string) => {
        try {
            const userId = user?.uid;
            if (!userId) {
                throw new Error("User ID is required for downloading a document");
            }
            const url = await downloadDocument(docId, userId);
            window.open(url, "_blank");
        } catch (error) {
            console.error("Error downloading document:", error);
            alert("Erro ao baixar o documento.");
        }
    };


    return (
        <div className='h-screen bg-gradient-to-br from-indigo-950 to-purple-950'>
            <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-indigo-950 to-purple-950 h-full">
                <div className="flex items-center mb-6">
                    <Link to="/app/home" className="mr-4">
                        <ArrowLeft className="mr-2 h-8 w-8 text-white" />
                    </Link>
                    <h1 className="text-2xl font-bold text-white">Busca de documentos</h1>
                </div>

                <Card className="mb-6 bg-purple-950">
                    <CardContent className="pt-6">
                        <div className="flex gap-4">
                            <Input
                                type="text"
                                placeholder="Pesquisar documentos"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-grow text-white"
                            />
                            <Button onClick={handleSearch}>
                                <Search className="mr-2 h-4 w-4" /> Pesquisar
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <div className="mb-">
                    <label htmlFor="upload-document" className="block text-white mb-2">Upload de Documento:</label>
                    <input
                        type="file"
                        id="upload-document"
                        onChange={handleUpload}
                        className="block w-full text-white bg-purple-950 border border-white mb-4 rounded py-2 px-4 max-w-[600px]"
                    />
                </div>

                <Card className='bg-purple-950'>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className='text-white'>Title</TableHead>
                                    <TableHead className='text-white'>Type</TableHead>
                                    <TableHead className='text-white'>Last Modified</TableHead>
                                    <TableHead className='text-white'>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {searchResults.map((doc) => (
                                    <TableRow key={doc.id}>
                                        <TableCell className="font-medium text-gray-300">{doc.title}</TableCell>
                                        <TableCell className="text-gray-300">{doc.type}</TableCell>
                                        <TableCell className='text-gray-300'>{doc.lastModified}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm" onClick={() => handleDownload(doc.id)}>
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => console.log('oi')}>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {searchQuery && searchResults.length === 0 && (
                    <p className="text-center text-muted-foreground mt-4">No documents found matching your search.</p>
                )}
            </div>
        </div>
    )
}

