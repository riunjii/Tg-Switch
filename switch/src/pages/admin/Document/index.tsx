import { useState } from 'react'
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
import { searchDocuments, Document, mockDocuments } from '@/utils/document-util'
import { Link } from 'react-router-dom'

export const DocumentSearch = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<Document[]>(mockDocuments)

    const handleSearch = () => {
        const results = searchDocuments(searchQuery)
        setSearchResults(results)
    }

    const handleDownload = (docId: string) => {
        console.log(`Downloading document ${docId}`)
    }

    const handleView = (docId: string) => {
        console.log(`Viewing document ${docId}`)
    }

    const handleBack = () => {
        console.log('Navigating back')
    }

    return (
        <div className='h-screen'>
            <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-indigo-950 to-purple-950 h-full">
                <div className="flex items-center mb-6">
                    <Link to="/app/home" onClick={handleBack} className="mr-4">
                        <ArrowLeft className="mr-2 h-8 w-8 text-white" />
                    </Link>
                    <h1 className="text-2xl font-bold text-white">Busca de documentos</h1>
                </div>

                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="flex gap-4">
                            <Input
                                type="text"
                                placeholder="Pesquisar documentos"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-grow"
                            />
                            <Button onClick={handleSearch}>
                                <Search className="mr-2 h-4 w-4" /> Pesquisar
                            </Button>
                        </div>
                    </CardContent>
                </Card>

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
                                                <Button variant="outline" size="sm" onClick={() => handleView(doc.id)}>
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

