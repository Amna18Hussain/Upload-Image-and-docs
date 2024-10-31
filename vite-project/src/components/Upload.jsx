import axios from 'axios';
import React, { useState } from 'react'

const Upload = () => {

    const [selected, setSelected] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelected(prevFiles => [...prevFiles, ...files])
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        if (selected.length === 0) {
            alert("no files selected");
            return;
        }

        const formData = new FormData();

        selected.forEach(file => {
            formData.append('images', file)
        });


        try {
            const response = await axios.post('http://localhost:5000/user', FormData, {

                headers: {
                    'Content-Type': 'multipart/form-data',
                },


            });
            console.log("UserData", response.data);

            setSelected([]);

        }

        catch (error) {
            console.error("Error adding users", error);

        }

        alert("files selected : " + selected.map(file => file.name).join(','));



    }


    return (
        <>
            <h1>Upload Images or Document</h1>

            <form onSubmit={handleSubmit}>
                <input type="file"
                    accept='image/*,.pdf'
                    onChange={handleFileChange}
                    multiple
                />

                <br />

                <button type='submit'>submit</button>

            </form>



            <div>
                <h2>selected Images</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>


                    {selected.map((file, index) => (

                        file.type.startsWith('image/') && (
                            <div key={index} style={{ margin: '10px' }} >
                                <img src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                                <p>{file.name}</p>
                            </div>


                        )

                    ))}
                </div>
            </div>

        </>
    )
}

export default Upload

