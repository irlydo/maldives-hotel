import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [buttonText, setButtonText] = useState('Send');

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    function submitEvent(event) {
        event.preventDefault();
        console.log('Form Data:', formData);
        const endpoint = 'http://localhost:3000/messages';
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        setFormData({
            name: '',
            email: '',
            message: ''
        });
        setButtonText('Message sent!');
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle errors here (e.g., showing an error message)
    });
    }

    return (
        <>
            <form className='contact-form' onSubmit={submitEvent}>
            <h1>Contact us</h1>
                <input 
                    type='text' 
                    name='name'
                    placeholder="Name" 
                    value={formData.name} 
                    onChange={handleChange}
                />
                <input 
                    type='text' 
                    name='email'
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange}
                />
                <textarea 
                    name='message'
                    placeholder="Message" 
                    value={formData.message} 
                    onChange={handleChange}
                />
                <button type='submit'>{buttonText}</button>
            </form>
        </>
    )
}
