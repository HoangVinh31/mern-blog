import {Sidebar} from 'flowbite-react';
import {Link} from 'react-router-dom'
import {HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function DashSidebar() {
    const dispatch = useDispatch();
    const location = useLocation();
    const {currentUser} = useSelector(state => state.user)
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
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                    <Link to='/dashboard?tab=profile'>
                    <Sidebar.Item active={tab==='profile'}  icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark' as ='div'>
                        Profile
                    </Sidebar.Item>
                    </Link>
                    {currentUser.isAdmin && (
                        <>
                        <Link to='/dashboard?tab=dash'>
                        <Sidebar.Item active={tab=== 'dash' || !tab} icon={HiChartPie} as ='div'>
                            Dashboard
                        </Sidebar.Item>
                        </Link>

                        <Link to='/dashboard?tab=posts'>
                        <Sidebar.Item active={tab=== 'posts'} icon={HiDocumentText} as ='div'>
                            Posts
                        </Sidebar.Item>
                        </Link>

                        <Link to='/dashboard?tab=users'>
                        <Sidebar.Item active={tab=== 'users'} icon={HiOutlineUserGroup} as ='div'>
                            Users
                        </Sidebar.Item>
                        </Link>              

                        <Link to='/dashboard?tab=comments'>
                        <Sidebar.Item active={tab=== 'comments'} icon={HiAnnotation} as ='div'>
                            Comments
                        </Sidebar.Item>
                        </Link>
                        </>
                    )}
                    <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={hanldeSignout}>
                       Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
