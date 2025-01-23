import React, { useState } from 'react';
import {
    Card, CardHeader, CardTitle, CardContent
} from '../components/ui/card';
import { Calendar } from "../components/ui/calendar"
import { House } from 'lucide-react';

const TravelApp = () => {
    const [show, setShow] = useState(true)
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
        <div className=" grid grid-cols-5 h-screen w-full gap-4 max-md:grid-cols-1 ">

            {/* Sidebar Navigation */}


            <div className={` border-r  w-full p-8 flex flex-col gap-4 mt-5 transition-all duration-300 ${show ? 'w-full' : 'w-1/4'} col-span-1 max-md:w-full `} >

                <button
                    className="text-gray-500 hover:text-gray-700 focus:outline-none transition-all duration-300"
                    onClick={() => setShow(!show)}
                >
                    {show ? (
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </button>
                {
                    show ? (
                        <>
                            <div className='bg-blue-400 text-white p-4 rounded-md flex gap-4'>
                                <House className=' text-white' />
                                <span className="font-medium text-white">Dashboard</span>
                            </div>
                            <div className=' text-zinc-900 p-4 rounded-md flex gap-4 hover:bg-blue-400 hover:text-white transition-all duration-300'>
                                <House className=' ' />
                                <span className="font-medium ">My Tickets</span>
                            </div>
                            <div className=' text-zinc-900 p-4 rounded-md flex gap-4 hover:bg-blue-400 hover:text-white transition-all duration-300'>
                                <House className=' ' />
                                <span className="font-medium ">Faviorite</span>
                            </div>
                            <div className=' text-zinc-900 p-4 rounded-md flex gap-4 hover:bg-blue-400 hover:text-white transition-all duration-300'>
                                <House className=' ' />
                                <span className="font-medium ">Messages</span>
                            </div>
                            <div className=' text-zinc-900 p-4 rounded-md flex gap-4 hover:bg-blue-400 hover:text-white transition-all duration-300'>
                                <House className=' ' />
                                <span className="font-medium ">Transiction</span>
                            </div>
                            <div className=' text-zinc-900 p-4 rounded-md flex gap-4 hover:bg-blue-400 hover:text-white transition-all duration-300'>
                                <House className=' ' />
                                <span className="font-medium ">Setting</span>
                            </div>
                        </>
                    ) : null
                }
            </div>

            {/* Main Content */}
            <div className={`flex-1  col-span-3  w-full max-md:w-full`}>
                {/* Best Destination */}
                <Card className="mb-8 mt-2">
                    <CardHeader>
                        <CardTitle>Best Destination</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                            <Card className='hover:scale-95 duration-300 '>
                                <img src="https://img.freepik.com/free-photo/majestic-mountain-peak-snow-covered-landscape-tranquil-nature-beauty-generated-by-ai_188544-250600.jpg" alt="Mount Forel" className="h-32 w-full object-cover rounded-t " />
                                <div className="mt-2 p-2">
                                    <h3 className="font-medium">Mount Forel</h3>
                                    <p className="text-gray-500">$299.00/day</p>
                                </div>
                            </Card>
                            <Card className='hover:scale-95 duration-300 '>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj8ibeCfJiLpjmfKw7dH_8k9m1ysXHvTrTy_4ptP-r1BkHkRmie4H7HWXmkVJ7HHDQ9MU&usqp=CAU" alt="Mount Forel" className="h-32 w-full object-cover rounded-t" />
                                <div className="mt-2 p-2">
                                    <h3 className="font-medium">Mount Forel</h3>
                                    <p className="text-gray-500">$299.00/day</p>
                                </div>
                            </Card>
                            <Card className='hover:scale-95 duration-300 '>
                                <img src="https://img.freepik.com/premium-photo/mountain-wallpaper_1134901-344684.jpg" alt="Mount Forel" className="h-32 w-full object-cover rounded-t" />
                                <div className="mt-2 p-2">
                                    <h3 className="font-medium">Mount Forel</h3>
                                    <p className="text-gray-500">$299.00/day</p>
                                </div>
                            </Card>
                            {/* Add more destination cards */}
                        </div>
                    </CardContent>
                </Card>

                {/* Let's Explore The Beauty */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Let's Explore The Beauty</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-lg">Get special offer & news</h3>
                                <p className="text-gray-500">Join now to receive the latest updates</p>
                            </div>
                            <button className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-md">Join Now</button>
                        </div>
                    </CardContent>
                </Card>

                {/* My Schedule */}
                <Card>
                    <CardHeader>
                        <CardTitle>My Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <Card>
                                <img src="https://img.freepik.com/premium-photo/mountain-wallpaper_1134901-212277.jpg" alt="Mount Forel" className="h-32 w-full object-cover rounded-t" />
                                <div className="mt-2 flex items-center justify-between p-2">
                                    <h3 className="font-medium">Mount Forel</h3>

                                </div>
                            </Card>
                            <Card>
                                <img src="https://img.freepik.com/premium-photo/mountain-landscape-with-river-mountains-background_902846-12224.jpg" alt="Mount Forel" className="h-32 w-full object-cover rounded-t" />
                                <div className="mt-2 flex items-center justify-between p-2">
                                    <h3 className="font-medium">Mount Forel</h3>

                                </div>
                            </Card>
                            {/* Add more schedule items */}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Calendar */}
            <div className="col-span-1  w-full max-md:w-full mt-2">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border shadow w-full"
                />
                <div className='mt-4'>
                    <CardTitle>My Schedule</CardTitle>
                    <div className='p-4 flex flex-col gap-4'>

                        <Card className='flex gap-4 items-center p-2'>
                            <img src="https://img.freepik.com/premium-photo/mountain-wallpaper_1134901-212277.jpg" alt="Mount Forel" className="h-16 w-1/2 object-cover rounded-t" />
                            <h3 className="text-md">Mount Forel</h3>
                        </Card>
                        <Card className='flex gap-4 items-center p-2'>
                            <img src="https://img.freepik.com/premium-photo/mountain-wallpaper_1134901-212277.jpg" alt="Mount Forel" className="h-16 w-1/2 object-cover rounded-t" />
                            <h3 className="text-md">Mount Forel</h3>
                        </Card>
                        <Card className='flex gap-4 items-center p-2'>
                            <img src="https://img.freepik.com/premium-photo/mountain-wallpaper_1134901-212277.jpg" alt="Mount Forel" className="h-16 w-1/2 object-cover rounded-t" />
                            <h3 className="text-md">Mount Forel</h3>
                        </Card>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelApp;