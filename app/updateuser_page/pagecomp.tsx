'use client'

import React, {useState} from 'react';
import {UpdateUser} from '@/app/database/dynamo_conn.mjs';
import {useRouter} from 'next/navigation';

export default function UdpateUserComp() {

    const [username, setUsername] = useState('');
    const [selectedRole, setSelectedRole] = useState('basic');
    const router = useRouter();


    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    };

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value)
    };
 
    const handleSubmit = async (event) => {
        event.preventDefault();

        let UpdateUserResponse;

        if(username) {
            UpdateUserResponse = await UpdateUser(username, selectedRole);
        }

        if(UpdateUserResponse) {
            router.push('/api/auth/signin')
        } else {
            router.refresh()
        }
    }


    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <label className="form-label">
                Username
                <input
                    className="form-input"
                    name="username"
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </label>
            <label className="form-label">
                Role
                <select
                    className="form-input"
                    name="role"
                    value={selectedRole}
                    onChange={handleRoleChange}
                >
                    <option value="basic">Basic</option> 
                    <option value="premium">Premium</option> 
                    <option value="advanced">Advanced</option> 
                </select>
            </label>
            <button className="form-button" type="submit">Update role</button>
        </form>
    );


}