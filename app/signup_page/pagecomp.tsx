'use client'

import React, {useState} from 'react';
import {CreateUser} from '@/app/database/dynamo_conn.mjs';
import {useRouter} from 'next/navigation';

export default function SignUpComp() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();


    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    };
 
    const handleSubmit = async (event) => {
        event.preventDefault();

        let CreateUserResponse;

        if(username && password) {
            CreateUserResponse = await CreateUser(username, password);
        }

        if(CreateUserResponse) {
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
                Password
                <input
                    className="form-input"
                    name="password"
                    type="password"  
                    value={password}
                    onChange={handlePasswordChange}
                />
            </label>
            <button className="form-button" type="submit">Sign up</button>
        </form>
    );


}