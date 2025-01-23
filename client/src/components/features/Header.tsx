import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store';
import { signOut } from '../../redux/slicer/authSlicer';
import { useNavigate } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
function Header() {
    const navigator = useNavigate()
    const dispatch: AppDispatch = useDispatch<AppDispatch>()
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null
    const handleLogout = () => {
        dispatch(signOut())
        navigator('/login')
    }
    return (
        <div className=''>
            <div className='flex items-center justify-between p-5 shadow-md'>
                <a href='/'>

                    <img src='https://i.pinimg.com/236x/cc/17/dd/cc17ddc59f142d5084720bb3d89aa480.jpg' alt='logo'
                        className='w-14 h-12 rounded-md md:w-14'
                    />
                </a>

                <ul className='hidden md:flex gap-14 font-medium text-lg'>

                    <li className='hover:text-primary transition-all duration-300 cursor-pointer'>
                        <a href='/travel'>
                            Travel
                        </a>
                    </li>
                    <li className='hover:text-primary transition-all duration-300 cursor-pointer'>Pricing</li>
                    <li className='hover:text-primary transition-all duration-300 cursor-pointer'>Contact us</li>
                    <li className='hover:text-primary transition-all duration-300 cursor-pointer'>About Us</li>
                </ul>
                <div className='flex gap-5'>
                    {
                        user ?
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <img src={user?.data?.image ? user?.data?.image : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'} className='w-10 h-10 rounded-md' />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='border-black p-2 mb-2' onClick={() => navigator('/profile')}>Profile</DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout} className='bg-red-500 p-2 text-white'>
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            :
                            <Button>
                                <a href='/login'>
                                    Login
                                </a>
                            </Button>

                    }


                </div>
            </div>
        </div>
    )
}

export default Header