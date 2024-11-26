import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import Cast from './Cast'
import { div } from 'framer-motion/client'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'

const People = () => {

    const [people, setPeople] = useState([])

    const GetPeople = async () => {
        try {
            const { data } = await axios.get('/person/popular')
            setPeople(data.results)
            console.log(data.results)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetPeople()
    }, [])


    return (
        <div className='bg-black flex flex-col gap-10 p-4 '>
            <div className='pl-8 flex items-center gap-3 text-zinc-100 text-3xl '>
                <Link to={"/"}>
                    <FaArrowLeft />
                </Link>
                <h1 className='font-semibold' >People</h1>
            </div>
            <div className='w-full min-h-screen bg-black flex gap-6 flex-wrap justify-center px-10 '>
                {
                    people.map((items) => <Link  key={items.id} to={`/people/details/${items.id} `}><Cast items={items} /></Link>)
                }
            </div>
        </div>
    )
}

export default People