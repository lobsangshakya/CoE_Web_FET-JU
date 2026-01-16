import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import { PaperStatus } from '../../../types';
import { EyeIcon } from '../../../components/icons';

interface PublicationFormData {
    title: string;
    citations: string;
    link: string;
    doi: string;
    file: File | null;
    rank: 'A' | 'B' | 'C' | 'D' | 'E' | '';
    publicationDate: string;
}

const MyPublications = () => {
    const { user } = useAuth();
    const { papers } = useData(); // Removed submitPaper as it's no longer used for submission simulation
    const { addToast } = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState<PublicationFormData>({
        title: '',
        citations: '',
        link: '',
        doi: '',
        file: null,
        rank: '',
        publicationDate: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof PublicationFormData, string>>>({});

    const myPapers = papers.filter(p => p.authors.includes(user?.name || ''));

    const resetAndCloseModal = () => {
        setFormData({
            title: '',
            citations: '',
            link: '',
            doi: '',
            file: null,
            rank: '',
            publicationDate: '',
        });
        setErrors({});
        setIsModalOpen(false);
    };

    const validate = () => {
        const newErrors: Partial<Record<keyof PublicationFormData, string>> = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required.';
        if (!formData.rank) newErrors.rank = 'Rank is required.';
        if (!formData.publicationDate) newErrors.publicationDate = 'Date of Publication is required.';
        if (formData.file && formData.file.type !== 'application/pdf') {
            newErrors.file = 'Only PDF files are allowed.';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData(prev => ({ ...prev, file }));
             if (file.type !== 'application/pdf') {
                setErrors(prev => ({ ...prev, file: 'Only PDF files are allowed.' }));
            } else {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.file;
                    return newErrors;
                });
            }
        } else {
             setFormData(prev => ({...prev, file: null}));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log('Publication Data Submitted:', formData);
            addToast('Publication data logged to console!', 'success');
            resetAndCloseModal();
        } else {
            addToast('Please correct the errors in the form.', 'error');
        }
    };

    const getStatusColor = (status: PaperStatus) => {
        switch (status) {
            case PaperStatus.APPROVED: return 'bg-green-100 text-green-800';
            case PaperStatus.REJECTED: return 'bg-red-100 text-red-800';
            case PaperStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Publications</h1>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>Upload New Publication</Button>
            </div>
            
            <Card className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publication Title</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {myPapers.length > 0 ? myPapers.map(paper => (
                            <tr key={paper.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{paper.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{paper.publicationYear}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(paper.status)}`}>
                                        {paper.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Button variant="secondary" className="p-1"><EyeIcon className="h-4 w-4"/></Button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                    You have no publications listed.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Card>

            <Modal isOpen={isModalOpen} onClose={resetAndCloseModal} title="Upload New Publication">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title of Publication</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                        {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
                    </div>
                     <div>
                        <label htmlFor="citations" className="block text-sm font-medium text-gray-300">Citations</label>
                        <input type="text" id="citations" name="citations" value={formData.citations} onChange={handleChange} className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="link" className="block text-sm font-medium text-gray-300">Link</label>
                        <input type="url" id="link" name="link" value={formData.link} onChange={handleChange} className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="doi" className="block text-sm font-medium text-gray-300">DOI</label>
                        <input type="text" id="doi" name="doi" value={formData.doi} onChange={handleChange} className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="file" className="block text-sm font-medium text-gray-300">Upload Paper (PDF)</label>
                        <input type="file" id="file" name="file" accept=".pdf" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-accent/20 file:text-orange-300 hover:file:bg-orange-accent/30"/>
                        <p className="text-xs text-gray-400 mt-1">Upload the full paper or the first page.</p>
                        {errors.file && <p className="text-red-400 text-xs mt-1">{errors.file}</p>}
                    </div>
                     <div>
                        <label htmlFor="rank" className="block text-sm font-medium text-gray-300">Rank</label>
                        <select id="rank" name="rank" value={formData.rank} onChange={handleChange} className="mt-1 block w-full bg-gray-800 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                            <option value="" disabled>Select a rank</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                        </select>
                        {errors.rank && <p className="text-red-400 text-xs mt-1">{errors.rank}</p>}
                    </div>
                    <div>
                        <label htmlFor="publicationDate" className="block text-sm font-medium text-gray-300">Date of Publication</label>
                        <input type="date" id="publicationDate" name="publicationDate" value={formData.publicationDate} onChange={handleChange} className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm [color-scheme:dark]"/>
                        {errors.publicationDate && <p className="text-red-400 text-xs mt-1">{errors.publicationDate}</p>}
                    </div>
                    <div className="pt-4 flex justify-end space-x-3">
                        <Button type="button" variant="secondary" onClick={resetAndCloseModal}>Cancel</Button>
                        <Button type="submit" variant="primary">Submit</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default MyPublications;