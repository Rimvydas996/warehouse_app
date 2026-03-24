import { useState, type FormEvent } from 'react';
import type { IWarehouseMember } from '../../../../types/models/IWarehouse';
import type { UserRole } from '../../../../types/models/IUser';

interface IWarehouseUsersManagerProps {
    members: IWarehouseMember[];
    currentUserId?: string;
    isAdmin: boolean;
    isUpdating: boolean;
    onAddUser: (email: string, role: UserRole) => void;
    onUpdateRole: (userId: string, role: UserRole) => void;
    onRemoveUser: (userId: string) => void;
}

export default function WarehouseUsersManager({
    members,
    currentUserId,
    isAdmin,
    isUpdating,
    onAddUser,
    onUpdateRole,
    onRemoveUser,
}: IWarehouseUsersManagerProps) {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<UserRole>('member');

    const handleAdd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmed = email.trim();
        if (!trimmed) return;
        onAddUser(trimmed, role);
        setEmail('');
    };

    return (
        <section className='theme-card p-4 md:p-6'>
            <h3 className='text-lg font-semibold theme-label mb-3'>Users</h3>

            {isAdmin && (
                <form className='flex flex-col md:flex-row gap-3 mb-4' onSubmit={handleAdd}>
                    <input
                        type='email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder='User email'
                        className='w-full md:flex-1 px-3 py-2 rounded theme-input'
                        disabled={isUpdating}
                    />
                    <select
                        value={role}
                        onChange={(event) => setRole(event.target.value as UserRole)}
                        className='w-full md:w-40 px-2 py-2 rounded theme-input'
                        disabled={isUpdating}
                    >
                        <option value='member'>Member</option>
                        <option value='manager'>Manager</option>
                    </select>
                    <button
                        type='submit'
                        className='theme-button px-3 py-2 rounded-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed'
                        disabled={isUpdating || !email.trim()}
                    >
                        Add user
                    </button>
                </form>
            )}

            <ul className='space-y-2'>
                {members.map((member) => {
                    const isSelf = currentUserId === member._id;

                    return (
                        <li
                            key={member._id}
                            className='theme-subtle flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-3 py-2'
                        >
                            <div>
                                <p className='theme-label text-sm font-medium'>{member.email}</p>
                                <p className='theme-muted text-xs'>Role: {member.role}</p>
                            </div>
                            {isAdmin && (
                                <div className='flex flex-col md:flex-row gap-2'>
                                    <select
                                        value={member.role}
                                        onChange={(event) => onUpdateRole(member._id, event.target.value as UserRole)}
                                        className='w-full md:w-36 px-2 py-1 rounded theme-input'
                                        disabled={isUpdating || isSelf}
                                    >
                                        <option value='member'>Member</option>
                                        <option value='manager'>Manager</option>
                                    </select>
                                    <button
                                        type='button'
                                        onClick={() => onRemoveUser(member._id)}
                                        className='text-red-700 text-xs font-medium'
                                        disabled={isUpdating || isSelf}
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}
