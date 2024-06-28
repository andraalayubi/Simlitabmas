import React from 'react'
import { Text, TextInput } from '@mantine/core';

function InputKomentar() {
    return (
        <div>
            <form>
                <Text>Komentar</Text>
                <TextInput
                    label="Komentar"
                    placeholder="Masukkan Komentar"
                />
                <div className='flex'>
                    <button className='text-white p-4 rounded-lg bg-red-500'>Tolak Usulan</button>
                    <button className='text-white p-4 rounded-lg bg-green-500'>Terima Usulan</button>
                </div>
            </form>
        </div>
    )
}

export default InputKomentar