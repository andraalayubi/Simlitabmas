import React from 'react'
import { Text, Textarea, Button } from '@mantine/core';

function InputKomentar() {
    return (
        <div>
            <form>
                <Text>Komentar</Text>
                <Textarea
                    // label="Komentar"
                    placeholder="Masukkan Komentar"
                    className='mb-6'
                />
                <div className='flex space-x-4'>
                    <Button color="red">Tolak Usulan</Button>
                    <Button >Terima Usulan</Button>
                </div>
            </form>
        </div>
    )
}

export default InputKomentar