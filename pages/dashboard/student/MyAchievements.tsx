import React from 'react';
import { mockAchievements } from '../../../data/mockData';
import { useAuth } from '../../../hooks/useAuth';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';

const MyAchievements = () => {
    const { user } = useAuth();
    // Simple mock filter - in a real app this would use user ID
    const myAchievements = mockAchievements.filter(ach => ach.category === 'Student' && ach.recipient.includes(user?.name.split(' ')[0] || ''));

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Achievements</h1>
            {myAchievements.length > 0 ? (
                <div className="grid gap-7 md:grid-cols-2">
                    {myAchievements.map(achievement => (
                        <Card key={achievement.id} variant="elevated">
                           {achievement.imageUrl && <img className="h-48 w-full object-cover" src={achievement.imageUrl} alt={achievement.title} />}
                           <div className="p-6">
                               <p className="text-sm text-gray-500">{achievement.date}</p>
                               <h3 className="mt-2 text-lg font-semibold text-gray-800">{achievement.title}</h3>
                               <p className="mt-2 text-gray-600">{achievement.description}</p>
                               <div className="mt-4">
                                   <Button variant="secondary">Download Certificate</Button>
                               </div>
                           </div>
                        </Card>
                    ))}
                </div>
            ) : (
                 <Card>
                    <div className="p-6 text-center text-gray-500">
                       You have no recorded achievements yet. Keep up the great work!
                    </div>
                </Card>
            )}
        </div>
    );
};

export default MyAchievements;
