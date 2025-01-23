import { useState } from "react";
import { Input } from "../components/ui/input"
import { Button } from '../components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../redux/store'; // Import the correct type for dispatch
import { User } from '../type'
import { signUp } from '../redux/slicer/authSlicer'
import Error from '../components/features/Error'
import Loader from '../components/features/Skeleton'
import Google_Facebook from '../components/auth/Google_Facebook'
import { useNavigate } from "react-router-dom";
const Regiser = () => {
    const navigator = useNavigate()
    const dispatch: AppDispatch = useDispatch<AppDispatch>()
    const authSlice = useSelector((state: { authSlice: { loading: boolean, user: User, error: string, success: boolean, } }) => state.authSlice)
    const { loading: loadingAuth, error: errorAuth, success } = authSlice
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        email: '',
        password: '',

    })
    const handleChange = (e: { target: { name: string; value: string } }) => {


        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = () => {
        // console.log(formData);
        dispatch(signUp(formData))
        setFormData({
            name: '',
            image: '',
            email: '',
            password: '',
        })
        if (success) {
            navigator('/')
        }

    }
    return (
        <div className='max-w-96 flex flex-col mx-auto my-20 gap-4 max-sm:max-w-72'>
            {
                errorAuth && <Error error={errorAuth} />
            }
            <h2 className='font-bold '>Meeting-Schedular</h2>
            <h2 className='font-semibold text-zinc-500'>Hey Friend!</h2>
            <h2><a className='font-semibold text-blue-500'>Sign up Free with Email.</a> No Credit card required</h2>
            {
                loadingAuth ? <Loader /> : (
                    <>
                        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                            <Input type="text" placeholder="Username" value={formData.name} onChange={handleChange} required name='name' />
                            <Input type="email" placeholder="Email" value={formData.email} onChange={handleChange} required name='email' />
                            <Input type="password" placeholder="Password" value={formData.password} onChange={handleChange} name='password' required />
                            <Button type='submit'>Sign Up</Button>

                        </form>
                        <span className='text-center text-zinc-500 font-semibold'>or</span>
                        <Google_Facebook />
                        <p className='font-semibold text-center'>already have account? <a href='/login' className='text-blue-500'>Login</a> </p>

                    </>
                )
            }


        </div>
    )
}

export default Regiser