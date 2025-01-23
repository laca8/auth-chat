
import { Input } from "../components/ui/input"
import { Button } from '../components/ui/button'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../redux/store"
import { User } from "../type"
import { reset } from "../redux/slicer/authSlicer"
import Error from "../components/features/Error"
import Loader from "../components/features/Skeleton"
import { useParams, useNavigate } from "react-router-dom"

const Reset = () => {
    const navigator = useNavigate()
    const { id } = useParams()
    const [error, setError] = useState('')
    const dispatch: AppDispatch = useDispatch<AppDispatch>()
    const authSlice = useSelector((state: { authSlice: { loading: boolean, user: User, error: string, success: boolean, } }) => state.authSlice)
    const { loading: loadingAuth, error: errorAuth, success } = authSlice

    const [formData, setFormData] = useState({
        id: id || '',
        password: '',
        cpassword: '',
    })
    const handleChange = (e: { target: { name: string; value: string } }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = () => {
        if (formData.password !== formData.cpassword) {
            setError('Password and Confirm Password should be same')
        } else {
            dispatch(reset(formData))
            setFormData({
                id: '',
                password: '',
                cpassword: ''
            })
        }



    }
    return (
        <div className='max-w-96 flex flex-col mx-auto my-20 gap-4 max-sm:max-w-72'>

            <h2 className='font-bold '>Meeting-Schedular</h2>
            <h2 className='font-semibold text-zinc-500'>Hey Friend! Welcome Back</h2>
            {
                error && <Error error={error} />
            }
            {
                errorAuth && <Error error={errorAuth} />
            }

            {
                loadingAuth ? <Loader /> : success ? (
                    <div className='text-zinc-600 font-semibold'>
                        <span >
                            Password reset success now you go to login page
                        </span>
                        <Button onClick={() => navigator('/login')} className="mt-4">Login</Button>
                    </div>
                ) : (
                    <>
                        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                            <Input type="password" placeholder="Password" value={formData.password} onChange={handleChange} required name='password' />
                            <Input type="password" placeholder="Confirm Password" value={formData.cpassword} onChange={handleChange} required name='cpassword' />
                            <Button type='submit' className=' text-white'>Save</Button>
                        </form>
                    </>
                )
            }
        </div>
    )
}

export default Reset