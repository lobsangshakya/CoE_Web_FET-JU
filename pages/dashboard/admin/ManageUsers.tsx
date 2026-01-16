
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { User, UserRole } from '../../../types';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import { SearchIcon, PencilIcon, TrashIcon } from '../../../components/icons';
import { useData } from '../../../context/DataContext';
import { useToast } from '../../../context/ToastContext';
import Modal from '../../../components/common/Modal';

const ManageUsers = () => {
    const { coeId } = useParams<{ coeId: string }>();
    const { users, addUser } = useData();
    const { addToast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
    const [department, setDepartment] = useState('');

    const filteredUsers = users.filter(user =>
        user.coeId === coeId &&
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getRoleColor = (role: UserRole) => {
        switch (role) {
            case UserRole.ADMIN: return 'bg-red-100 text-red-800';
            case UserRole.FACULTY: return 'bg-blue-100 text-blue-800';
            case UserRole.STUDENT: return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    
    const resetAndCloseModal = () => {
        setName('');
        setEmail('');
        setRole(UserRole.STUDENT);
        setDepartment('');
        setIsModalOpen(false);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email) {
            addToast('Name and email are required.', 'error');
            return;
        }
        if (!coeId) {
            addToast('Could not determine the COE. Action failed.', 'error');
            return;
        }
        addUser({ name, email, role, department }, coeId);
        addToast('User added successfully!', 'success');
        resetAndCloseModal();
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>Add New User</Button>
            </div>
            
            <Card className="p-4 mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    className="w-full p-3 pl-10 border border-gray-300 rounded-md"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
            </Card>

            <Card className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full" src={user.avatarUrl} alt="" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        <Button variant="secondary" className="p-2"><PencilIcon className="h-4 w-4"/></Button>
                                        <Button variant="danger" className="p-2"><TrashIcon className="h-4 w-4"/></Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            <Modal isOpen={isModalOpen} onClose={resetAndCloseModal} title="Add New User">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-300">Department</label>
                        <input type="text" id="department" value={department} onChange={e => setDepartment(e.target.value)} className="mt-1 block w-full bg-white/10 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-300">Role</label>
                        <select id="role" value={role} onChange={e => setRole(e.target.value as UserRole)} className="mt-1 block w-full bg-gray-800 border-white/30 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                            <option value={UserRole.STUDENT}>Student</option>
                            <option value={UserRole.FACULTY}>Faculty</option>
                            <option value={UserRole.ADMIN}>Admin</option>
                        </select>
                    </div>
                    <div className="pt-4 flex justify-end space-x-3">
                        <Button type="button" variant="secondary" onClick={resetAndCloseModal}>Cancel</Button>
                        <Button type="submit" variant="primary">Add User</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ManageUsers;