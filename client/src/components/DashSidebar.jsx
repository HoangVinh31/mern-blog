import {Sidebar} from 'flowbite-react';
import {Link} from 'react-router-dom'
import {HiArrowSmRight, HiUser} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DashSidebar() {
    const dispatch = useDispatch();
    const location = useLocation();
    const [tab,setTab] = useState('');
    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search)
      const tabFromUrl = urlParams.get('tab')
      if(tabFromUrl){
        setTab(tabFromUrl);
      }
    },[location.search])
    const hanldeSignout = async()=>{
        try {
            const res = await fetch(`/api/user/signout`, {
                method: 'POST',
            });
            const data = await res.json();
            if(!res.ok){
                // handle error
                console.log(data.message)
            } else{
                // handle success
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
       }
    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item active={tab==='profile'}  icon={HiUser} label={"USer"} labelColor='dark' as ='div'>
                        Profile
                    </Sidebar.Item>
                    </Link>
                    <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={hanldeSignout}>
                       Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
