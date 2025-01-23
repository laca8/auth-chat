import { Button } from '../components/ui/button';

const ProfileCard = () => {
    return (
        <div className=" rounded-lg p-6  ">
            <div className="flex justify-start items-end gap-8 mb-4 max-sm:flex-col max-sm:gap-4">
                <div>
                    <div className="flex items-center gap-4 max-sm:flex-col max-sm:gap-4 ">
                        <img
                            src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg"
                            alt="Profile"
                            className="w-36 h-36 rounded-lg object-cover border-2 border-black"
                        />
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-semibold">Jeremy Rose</h2>
                                <span className="text-gray-500 text-sm">New York, NY</span>
                            </div>
                            <p className="text-gray-600">Product Designer</p>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="font-semibold">8.6</span>
                                <div className="flex text-blue-500 text-xl ">
                                    {'★'.repeat(5)}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex gap-3  mt-4 max-sm:flex-col max-sm:gap-4  max-sm:mx-auto">
                        <Button >
                            Send message
                        </Button>
                        <Button variant={'secondary'}>
                            Contacts
                        </Button>
                        <Button variant={'outline'}>
                            Report user
                        </Button>
                    </div>
                </div>

                <div className='flex flex-col items-end justify-end '>
                    <p className='p-4 shadow-lg bg-zinc-100 text-zinc-800 rounded-lg'>

                        A paragraph could contain a series of brief examples or a single long illustration of a general point.<br />
                        It might describe a place, character, or process; narrate a series of events; compare or contrast two<br />
                        or more things; classify items into categories; or
                    </p>
                </div>

            </div>



            <div className="grid grid-cols-4 gap-8 w-full max-md:grid-cols-2 max-md:gap-4 max-sm:grid-cols-1 max-sm:gap-4">
                <div className='w-full'>
                    <h3 className="text-gray-500 mb-2 font-medium">WORK <hr /></h3>
                    <div className="space-y-3">
                        <div className='flex flex-col gap-1'>
                            <h4 className="font-medium bg-blue-400 p-2 rounded-lg text-white shadow-md">Spotify New York</h4>
                            <div className="space-y-1 text-zinc-800  bg-zinc-100 p-2 shadow-lg   rounded-lg">
                                <p className="text-md text-gray-500 ">175 William Street</p>
                                <p className="text-md text-gray-500 ">New York, NY 10038-78 212-312-51</p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1 mb-2'>
                            <h4 className="font-medium bg-blue-400 p-2 rounded-lg text-white shadow-md">Metropolitan Museum</h4>
                            <div className="space-y-1 text-zinc-800  bg-zinc-100 p-2 shadow-lg   rounded-lg">
                                <p className="text-md text-gray-500">525 E 68th Street</p>
                                <p className="text-md text-gray-500">New York, NY 10651-78 156-187-60</p>
                            </div>
                        </div>
                    </div>


                </div>
                <div className='w-full'>
                    <h3 className="text-gray-500 mb-2 font-medium">SKILLS <hr /></h3>
                    <h4 className="font-medium bg-blue-400 p-2 rounded-lg text-white shadow-md">Graphic Designer</h4>

                    <div className="space-y-1 text-gray-600 bg-zinc-100 p-4 shadow-lg mt-1 rounded-lg">
                        <p>Branding</p>
                        <p>UI/UX</p>
                        <p>Web Design</p>
                        <p>Packaging</p>
                        <p>Print & Editorial</p>
                    </div>

                </div>

                <div className='w-full'>
                    <h3 className="text-gray-500 mb-4 font-medium">CONTACT INFORMATION <hr /></h3>
                    <div className="space-y-3">
                        <div>
                            <p className="font-medium bg-blue-400 p-2 rounded-lg text-white shadow-md">Phone:</p>
                            <div className="space-y-1 text-zinc-800  bg-zinc-100 p-2 shadow-lg mt-1  rounded-lg">
                                <p>+1 123 456 7890</p>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium bg-blue-400 p-2 rounded-lg text-white shadow-md">Address:</p>
                            <div className="space-y-1 text-zinc-800  bg-zinc-100 p-2 shadow-lg mt-1  rounded-lg">
                                <p>525 E 68th Street</p>
                                <p>New York, NY 10651-78 156-187-60</p>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium bg-blue-400 p-2 rounded-lg text-white shadow-md">Email:</p>
                            <div className="space-y-1 text-zinc-800  bg-zinc-100 p-2 shadow-lg mt-1  rounded-lg">
                                <p className="text-blue-500">hello@jeremyrose.com</p>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium bg-blue-400 p-2 rounded-lg text-white shadow-md">Site:</p>
                            <div className="space-y-1 text-zinc-800  bg-zinc-100 p-2 shadow-lg mt-1  rounded-lg">
                                <p className="text-blue-500">www.jeremyrose.com</p>
                            </div>
                        </div>
                    </div>


                </div>
                <div className='w-full'>
                    <h3 className="text-gray-500  mb-4 font-medium">BASIC INFORMATION <hr /></h3>
                    <div className="space-y-3">
                        <div>
                            <p className="font-medium bg-blue-400 p-2 rounded-lg text-white shadow-md">Birthday:</p>
                            <div className="space-y-1 text-zinc-800  bg-zinc-100 p-2 shadow-lg mt-1  rounded-lg">
                                <p>June 5, 1992</p>
                            </div>
                        </div>
                        <div>
                            <p className="font-medium bg-blue-400 p-2 rounded-lg text-white shadow-md">Gender:</p>
                            <div className="space-y-1 text-zinc-800  bg-zinc-100 p-2 shadow-lg mt-1  rounded-lg">
                                <p>Male</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;