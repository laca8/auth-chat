import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../ui/button'
import FacebookLogin from 'react-facebook-login';
import Loader from '../features/Skeleton'
// import GoogleLogin from 'react-google-login';
import { useGoogleLogin } from '@react-oauth/google';
import { facebookAuth, googleAuth } from '../../redux/slicer/authSlicer';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'; // Import the correct type for dispatch
import { User } from '../../type';
import Error from '../features/Error';

import { facebookId } from '../../type';
import { useNavigate } from 'react-router-dom';
type UserToken = {
    access_token: string;
    // Add other properties if needed
}

export default function Auth() {
    const navigator = useNavigate()
    const dispatch: AppDispatch = useDispatch<AppDispatch>()
    const authSlice = useSelector((state: { authSlice: { loading: boolean, user: User, error: string, success: boolean, } }) => state.authSlice)
    const { loading: loadingAuth, success } = authSlice

    const [user, setUser] = useState<UserToken | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const login = useGoogleLogin({

        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (user) {
                    setLoading(true)
                    const res = await axios
                        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                            headers: {
                                Authorization: `Bearer ${user.access_token}`,
                                Accept: 'application/json'
                            }
                        })
                    console.log(res);

                    try {
                        const row = { name: res.data.name, email: res.data.email, password: res.data.id, image: res.data.picture }
                        dispatch(googleAuth(row))

                        setLoading(false)
                        navigator('/')

                    } catch (err) {
                        console.log(err)
                        if (axios.isAxiosError(err) && err.response) {
                            setError(err.response.data.message);
                        } else {
                            setError('An unexpected error occurred');
                        }
                        setLoading(false)
                    }


                }

            } catch (err) {
                console.log(err)
                if (axios.isAxiosError(err) && err.response) {
                    setError(err.response.data.message);
                } else {
                    setError('An unexpected error occurred');
                }
                setLoading(false)
            }
        }
        fetchUser()
    }, [user, dispatch])
    interface FacebookResponse {
        status?: string;
        name?: string;
        picture?: {
            data: {
                url: string;
            };
        };
        id?: string;
        email?: string;
    }

    const handleFacebookCallback = (response: FacebookResponse) => {
        setLoading(true);
        if (response?.status === "unknown") {
            console.error('Sorry!', 'Something went wrong with facebook Login.');
            setError("Sorry! Something went wrong with facebook Login.");
            return;
        }

        const row = {
            name: response.name || '',
            image: response?.picture?.data.url || '',
            password: response?.id || '',
            email: response?.email || ''
        };
        dispatch(facebookAuth(row));
        navigator('/')

        setLoading(false);

    };
    useEffect(() => {
        if (success) {
            navigator('/')
        }
    }, [user])
    return (
        <div className="auth-container">

            {error &&
                <Error error={error} />
            }
            {/* {errorAuth &&
                <Error error={errorAuth} />

            } */}
            <div className="flex flex-row gap-4 max-sm:flex max-sm:flex-col">
                {
                    loadingAuth ? <Loader /> : (
                        <>
                            <Button variant='outline' className='p-5' disabled={loading} onClick={() => login()}><img className='w-10 h-10 rounded-full' src='https://t4.ftcdn.net/jpg/03/91/79/25/360_F_391792593_BYfEk8FhvfNvXC5ERCw166qRFb8mYWya.jpg' />Sign With Google</Button>
                            <Button variant='outline' className='p-5 ' disabled={loading} ><img className='w-10 h-10 rounded-full' src='https://static.vecteezy.com/system/resources/previews/018/930/698/non_2x/facebook-logo-facebook-icon-transparent-free-png.png' />

                                <label className="custom-file-upload">
                                    Sign with Facebook

                                    <FacebookLogin
                                        buttonStyle={{ backgroundColor: 'white', border: 'none', display: 'none' }}
                                        appId={facebookId}  // we need to get this from facebook developer console by setting the app.
                                        autoLoad={false}
                                        fields="name,email,picture"
                                        callback={handleFacebookCallback}
                                        textButton=""

                                    />
                                </label>
                            </Button>



                        </>
                    )
                }


            </div>

        </div>
    );
}

