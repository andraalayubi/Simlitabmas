"use client"

import React, { useState, useEffect } from 'react';
import { TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import axios from 'axios';

interface Member {
    id: number;
    name: string;
}

const LogbookForm: React.FC = () => {
    const [date, setDate] = useState<Date | null>(null);
    const [task, setTask] = useState('');
    const [members, setMembers] = useState<number[]>([]);
    const [allMembers, setAllMembers] = useState<Member[]>([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('/api/members');
                setAllMembers(response.data);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, []);
    console.log(allMembers);

    const handleMembersChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMembers = Array.from(e.target.selectedOptions, option => Number(option.value));
        setMembers(selectedMembers);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Task:', task);
        console.log('Date:', date);
        console.log('Members:', members);

        // try {
        //   await axios.post('/api/logbook', { task, date, members });
        //   alert('Logbook saved successfully!');
        //   setTask('');
        //   setDate('');
        //   setMembers([]);
        // } catch (error) {
        //   console.error('Error saving logbook:', error);
        // }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Isi Logbook</h2>
            <div className="mb-4">
                <TextInput
                    label="Judul Proposal"
                    placeholder="Masukkan Judul Proposal"
                />
            </div>
            <div className="mb-4">
                <DateInput
                    valueFormat="DD/MM/YYYY"
                    value={date}
                    onChange={setDate}
                    label="Date input"
                    placeholder="DD/MM/YYYY"
                />
            </div>
            <div className="mb-4">
                {/* <NativeSelect label="Input label" description="Input description" data={['React', 'Angular', 'Vue']} /> */}
                <label className="block text-gray-700">Anggota yang Mengerjakan</label>
                <select
                    multiple
                    value={members.map(member => member.toString())} // Convert number[] to string[]
                    onChange={handleMembersChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                >
                    {allMembers.map(member => (
                        <option key={member.id} value={member.id.toString()}>
                            {member.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Simpan</button>
        </form>
    );
};

export default LogbookForm;
