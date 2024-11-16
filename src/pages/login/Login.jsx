import { useState } from 'react';
import { useToast } from '../../context/ToastProvider';
import { useNavigate } from 'react-router-dom';
// import {useWebSocket} from '../../context/WebSocketContext'

export default function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({ username: '', password: '' });
    // const {sendMessage,messages} = useWebSocket();
    const { toastError } = useToast();

    // Handle form value changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Validate form data
    const validate = () => {
        let isValid = true;
        let errors = {};

        if (!formData.username) {
            isValid = false;
            errors.username = 'Username is required';
        }

        if (!formData.password) {
            isValid = false;
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            isValid = false;
            errors.password = 'Password must be at least 6 characters long';
        }

        setErrors(errors);
        return isValid;
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validate()){
            try {
                const response = await fetch(`https://${import.meta.env.VITE_API_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
    
                const result = await response.text();
                const jsonResult = await JSON.parse(result)
                // console.log(jsonResult)
    
                if (response.ok) {

                    sessionStorage.setItem('token',jsonResult.token)
                    sessionStorage.setItem('username',jsonResult.username)
                    navigate('/chat');
                    // toastSuccess(result); // Trigger success toast
                } else {
                    toastError(result); // Trigger error toast
                }
            } catch (error) {
                console.error('Fetch error:', error);
                toastError('An error occurred, please try again later.');
            }
        }
    };
    

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col ">
                <div className="text-center ">
                    <h1 className="text-5xl font-bold">Welcome to Chatwave</h1>
                    <p className="py-6">
                        
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="username"
                                className="input input-bordered"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="password"
                                className="input input-bordered"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type="submit">
                                Login
                            </button>
                        </div>
                        <div className="divider">OR</div>
                        <p className='text-center' >
                            Don&#39;t have a Account?
                        </p>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" onClick={()=>{navigate('/register')}}>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
