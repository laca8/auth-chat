
import { Input } from "../components/ui/input"
import { Button } from '../components/ui/button'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../redux/store"
import { User } from "../type"
import { forget } from "../redux/slicer/authSlicer"
import Error from "../components/features/Error"
import Loader from "../components/features/Skeleton"

const Forget = () => {

    const dispatch: AppDispatch = useDispatch<AppDispatch>()
    const authSlice = useSelector((state: { authSlice: { loading: boolean, user: User, error: string, success: boolean, } }) => state.authSlice)
    const { loading: loadingAuth, error: errorAuth, success } = authSlice

    const [formData, setFormData] = useState({
        email: '',
    })
    const handleChange = (e: { target: { name: string; value: string } }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = () => {
        // console.log(formData);
        dispatch(forget(formData))
        setFormData({
            email: '',
        })


    }
    return (
        <div className='max-w-96 flex flex-col mx-auto my-20 gap-4 max-sm:max-w-72'>

            <h2 className='font-bold '>Meeting-Schedular</h2>
            <h2 className='font-semibold text-zinc-500'>Hey Friend! Welcome Back</h2>
            {
                errorAuth && <Error error={errorAuth} />
            }

            {
                loadingAuth ? <Loader /> : success ? (
                    <div className='text-zinc-600 font-semibold'>Email Sent Successfully Now you check your email and reset password</div>
                ) : (
                    <>
                        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                            <Input type="email" placeholder="Email" value={formData.email} onChange={handleChange} required name='email' />
                            <Button type='submit' className=' text-white'>Send Email</Button>
                        </form>
                    </>
                )
            }
        </div>
    )
}

export default Forget