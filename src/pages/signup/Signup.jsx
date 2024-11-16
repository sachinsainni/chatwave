import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        gender: '',
        username: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let errors = {};

        // Name validation
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            errors.email = 'Invalid email format';
        }

        // Username validation
        if (!formData.username.trim()) {
            errors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            errors.username = 'Username must be at least 3 characters';
        }

        // Password validation
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
        }

        // Age validation
        if (!formData.age) {
            errors.age = 'Age is required';
        } else if (formData.age < 16 || formData.age > 100) {
            errors.age = 'Age must be between 16 and 100';
        }

        // Gender validation
        if (!formData.gender) {
            errors.gender = 'Gender is required';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await fetch(`https://${import.meta.env.VITE_API_URL}/register`, {  // Ensure the URL is correct
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded', // Or 'application/json' if you're using JSON
                    },
                    body: new URLSearchParams({
                        username: formData.username,
                        password: formData.password,
                        role: 'USER', // or however you set roles
                        fullName: formData.name,
                        email: formData.email,
                        gender: formData.gender,
                        age: formData.age,
                    }),
                });
    
                if (response.ok) {
                    // const data = await response.json();
                    navigate('/')
                } else {
                    const error = await response.json();
                    console.error('Registration error:', error);
                    // Handle errors based on the response
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
    };
    
    

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up for ChatWave</h1>
                    <p className="py-6">
                        Create an account to start chatting with people on ChatWave!
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className={`input input-bordered ${errors.name ? 'border-red-500' : ''}`}
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className={`input input-bordered ${errors.email ? 'border-red-500' : ''}`}
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className={`input input-bordered ${errors.username ? 'border-red-500' : ''}`}
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className={`input input-bordered ${errors.password ? 'border-red-500' : ''}`}
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Age</span>
                            </label>
                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                className={`input input-bordered ${errors.age ? 'border-red-500' : ''}`}
                                value={formData.age}
                                onChange={handleChange}
                                required
                            />
                            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Gender</span>
                            </label>
                            <select
                                name="gender"
                                className={`select select-bordered ${errors.gender ? 'border-red-500' : ''}`}
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type="submit">Sign Up</button>
                        </div>
                        <div className="divider">OR</div>
                        <p className='text-center' >
                            Already have a Account?
                        </p>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" onClick={()=>{navigate('/')}}>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
