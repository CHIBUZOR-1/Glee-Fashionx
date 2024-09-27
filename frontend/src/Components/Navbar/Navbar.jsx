import React, { useState } from 'react'
import { LuSearch } from "react-icons/lu";
import { FaOpencart } from "react-icons/fa";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Drawer, Dropdown, Menu, Space } from "antd";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Store/UserSlice';
import axios from 'axios';
import { TfiMenuAlt } from "react-icons/tfi";
import { toast } from 'react-toastify';
import { assets } from '../Assets/Assets';

const Navbar = () => {
  const user = useSelector(state=> state.user);
  const cart = useSelector(state => state.cart);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const[s, setS] = useState('')
  const dispatch = useDispatch();
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const logOut = async()=> {
    const {data} = await axios.get('/api/user/logout');
    if(data.success) {
      dispatch(logout());
      toast.success(data.message);
      navigate('/')
    }
    
  }
  const handleSubmit = async(e)=> {
    e.preventDefault()
    if(s) {
      navigate(`/search?keyword=${s}`);
      window.scrollTo(0,0)
    }
      
    }
    
  const items = [
    {
      key: '1',
      label: user.role ? <Button onClick={logOut} className='w-full bg-slate-600 text-white font-semibold hover:bg-slate-600 hover:text-white'>Logout</Button> :
        <Link to={'/login'}  onClick={()=> window.scrollTo(0,0)} style={{textDecoration: 'none', color: "inherit"}}>
            <Button onClick={()=> window.scrollTo(0,0)} className=' font-semibold bg-slate-600 text-white'>Login/Signup</Button>
        </Link>
    },
    {
      key: '2',
      label: user.role === "ADMIN" ? 
        <Link to="/dashboard?view=admin-profile" onClick={()=> window.scrollTo(0,0)} style={{textDecoration: 'none', color: "inherit"}}>
          <Button onClick={()=> {navigate("/dashboard?view=admin-profile"); window.scrollTo(0,0)}} className=' w-full font-semibold bg-slate-600 text-white'>Admin Dashboard</Button>
        </Link>
       : <Link to="/Customer?view=Orders" style={{textDecoration: 'none', color: "inherit"}}><Button className=' w-full font-semibold bg-slate-600 text-white'>Orders</Button></Link> 
    },
    {
      key: '3',
      label:  (
        <Link className={`${user.role === "ADMIN" ? 'hidden' : 'block'}`} to="/Customer?view=my-profile" style={{textDecoration: 'none', color: "inherit"}}>
          <Button className=' w-full font-semibold bg-slate-600 text-white'>Account</Button>
        </Link>
      ),
    },
  
  ];
  const menus = [
    {
      key: 'sub1',
      label: 'Men',
      icon: "",
          children: [
            {
              key: '1',
              label: (<Link to={"/product_category/Men's Clothing"}>Clothing</Link>),
            },
            {
              key: '2',
              label: (<Link to={"/product_category/Men's Shoes"}>Shoes</Link>),
            },
            {
              key: '3',
              label: (<Link to={"/product_category/Men's Accessories"}>Accessories</Link>),
            },
          ],
        },
        
    {
      key: 'sub2',
      label: 'Women',
      icon: "",
      children: [
        {
          key: '4',
          label: (<Link to={"/product_category/Women's Clothing"}>Clothing</Link>),
        },
        {
          key: '5',
          label: (<Link to={"/product_category/Women's Shoes"}>Shoes</Link>),
        },
        {
          key: '6',
          label: (<Link to={"/product_category/Women's Accessories"}>Bags & Accessories</Link>),
        },
      ],
    },
    {
      key: 'sub4',
      label: 'Kids & Baby',
      icon: "",
      children: [
        {
          key: '7',
          label: (<Link to={"/product_category/Boys"} onClick={window.scrollTo(0,0)}>Boys</Link>),
        },
        {
          key: '8',
          label: (<Link to={"/product_category/Girls"}>Girls</Link>),
        },
        
        {
          key: '9',
          label: (<Link to={"/product_category/Baby"}>Baby</Link>),
        },
      ],
    },
    {
      key: 'sub5',
      label: 'Home & Decorations',
      icon: "",
      children: [
        {
          key: '10',
          label: (<div className='w-full justify-center flex items-center animate-pulse text-white font-semibold' to={"/product_category/Jewelry"}>
            <p className='bg-slate-700 px-2 rounded-md'>Coming Soon..</p>
          </div>),
        },
      ],
    },
  ];
  const onClick = (e) => {
      console.log('click ', e);
    };
  return (
    <div className=''>
        <div className=' bg-white max-[850px]:h-[95px] max-[850px]:pt-2 items-center border-b-[1px to-black] shadow-md flex flex-col max-[850px]:gap-1 w-full gap-4 max-sm:justify-between justify-between p-0 h-[70px] px-5 z-50 top-0 fixed'>
          <div className='flex h-full w-full justify-between   bg-white items-center'>
            <div className='flex items-center gap-2 justify-around'>
              <div onClick={showDrawer} className='max-md:text-[21px]  max-lg:text-[30px] pt-[2px] items-center text-slate-500 text-center'>
                <TfiMenuAlt className='cursor-pointer max-sm:text-[19px] xl:text-2xl max-xl:text-2xl hover:text-blue-400' />
              </div>
              <Link to={'/'} style={{textDecoration: 'none', color: "inherit"}}>
                <img src={assets.logo1} alt="logo1" className='h-[50px] max-[850px]:h-[42px] border w-[60px] object-scale-down rounded' />
              </Link>
            </div>
            
            <div className='items-center max-[850px]:hidden'>
                <form onSubmit={handleSubmit} className=' h-8 rounded-full bg-stone-100 flex items-center justify-around w-[500px] focus-within:shadow-md shadow-md '>
                    <input type="text" name='search' onChange={(e) => setS(e.target.value)}  placeholder='Search glee ..' className=' bg-slate-100 flex rounded-l-full mx-[2px] w-full h-7 px-3 outline-none'/>
                    <button type='submit' className=' flex rounded-full items-center w-8 mr-[2px] justify-center font-extrabold text-[20px] bg-stone-800 text-white h-[27px]'><LuSearch /></button>
                </form>
            </div>
            <div>
              <Dropdown 
              menu={{
                items,
              }}
              placement="bottom"
              >
              <div className=' flex'>
                  {
                    user.role ? 
                <div className='items-center flex gap-1 px-1 border py-1 rounded'>
                  <Avatar size="medium" icon={<UserOutlined />} className={`bg-green-400  text-white`} />
                  <div className='items-center text-ellipsis line-clamp-1'>{user.firstname}</div>
                  <RiArrowDropDownLine className=' text-[30px] hover:text-blue-600' />
                </div>  : 
                <>
                  <Avatar size="large" icon={<UserOutlined />} />
                  <RiArrowDropDownLine className=' text-[30px] hover:text-blue-600' />
                </>
                  }
                  
              </div>

              </Dropdown>
            </div>

            <div className=' flex h-9 w-10 justify-center items-center'>
                <Link to={'/cart'}  onClick={()=> window.scrollTo(0,0)} style={{textDecoration: 'none'}} className=' relative w-9 flex-col text-[30px]'>
                  <Badge count={cart.totalQuantity} showZero size='small'>
                    <FaOpencart className=' text-[30px]' /> 
                  </Badge>   
                </Link>
            </div>
          </div>
            
            <div className='items-center flex xl:hidden px-7 max-[850px]:px-3 justify-center max-[850px]:w-full h-full max-[850px]:block max-xl:hidden'>
              <form onSubmit={handleSubmit} className=' h-8 rounded-full bg-stone-100 flex items-center justify-around w-full focus-within:shadow-md shadow-md '>
                  <input type="text" name='search' onChange={(e) => setS(e.target.value)}  placeholder='Search glee ..' className=' bg-slate-50 flex rounded-l-full mx-[2px] w-full h-7 px-3 outline-none'/>
                  <button type='submit' className=' flex rounded-full items-center w-8 mr-[2px] justify-center font-extrabold text-[20px] bg-stone-800 text-white h-[27px]'><LuSearch /></button>
              </form>
            </div>
        </div>

   
          <Drawer
          title={
            user.role ? 
            <div className='flex justify-center items-center gap-2 float-left'>
            <Avatar size="large" icon={<UserOutlined />} className='bg-green-400 text-white' /> 
            <div>
              <p>Welcome, {user.firstname}</p>
            </div>
            </div> : 
            <div className='flex gap-2 float-left items-center justify-center'>
              <Avatar size="large" icon={<UserOutlined />} /> 
              <p>Hello, Sign in</p>
            </div>
          }
          placement={'left'}
          closable={false}
          onClose={onClose}
          open={open}
          key={'left'}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
            </Space>
          }
        >
          <div className='flex flex-col gap-8 text-[16px]'>
          <Menu
            onClick={()=>{onClick(); onClose()}}
            style={{
              width: 356,
              height: 300
            }}
            className='text-[20px]'
            mode="inline"
            items={menus}
          />
          </div>
          
        </Drawer>
    </div>
  )
}
 
export default Navbar