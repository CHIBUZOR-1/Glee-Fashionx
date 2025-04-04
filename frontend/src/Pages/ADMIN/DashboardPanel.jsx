import React, { useEffect, useState } from 'react'
import { PiUsersThreeFill } from "react-icons/pi";
import { TbPackages } from "react-icons/tb";
import { prodList, getUsers} from '../../helpers/Functions';
import { useNavigate } from 'react-router-dom';
import { HiArrowNarrowUp, HiUsers } from "react-icons/hi";
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  BarElement,
  LinearScale,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BsReceiptCutoff } from 'react-icons/bs';
ChartJS.register(LineElement, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);


const DashboardPanel = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [lmp, setLmp] = useState('');
  const [prods, setProds] = useState([]);
  const [ltp, setLtp] = useState('');
  const [orders, setOrders] = useState([]);
  const [ld, setLd] = useState(false)


  useEffect(()=> {
    allUsers();
    allProds();
    getAllOrders();
    // eslint-disable-next-line 
  }, [])

  const allUsers = async()=> {
    const list = await getUsers();
      setUsers(list.data);
  }

  const allProds = async()=> {
    const listz = await prodList();
    setProds(listz.products)
    setLmp(listz.lastMonthProducts)
    setLtp(listz.totalProducts);
            
  }

  const getAllOrders = async() => {
    setLd(true);
    const res = await axios.get('/api/orders/all_orders');
    if(res.data.success) {
      setOrders(res.data.data);
      setLd(false);
    } else {
      toast.error("Error Occurred!")
    }
  }
  console.log(orders)

  const productSales = orders.reduce((acc, order) => {
    order.products.forEach((product) => {
      acc[product.brand] = (acc[product.brand] || 0) + product.price;
    });
    return acc;
  }, {});
  const paymentCounts = orders.reduce((acc, order) => {
    const status = order.payment.transaction.status; // Access the payment status
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const dataLine = {
    labels: orders.map((order) =>
      new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(new Date(order?.createdAt))
    ), // X-axis (Dates)
    datasets: [
      {
        label: 'Sales Amount (USD)',
        data: orders.map((order) => order?.amount), // Y-axis (Sales amounts)
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        tension: 0.3, // Smooth curves
      },
    ],
};

  const dataPie = {
    labels: Object.keys(statusCounts), // Order statuses (e.g., 'Complete', 'Pending')
    datasets: [
      {
        label: 'Order Status Distribution',
        data: Object.values(statusCounts), // Counts of each status
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Customize colors
        hoverOffset: 4, // Offset on hover for effect
      },
    ],
  };

  const dataBar = {
    labels: Object.keys(productSales), // Product names (X-axis)
    datasets: [
      {
        label: 'Sales Amount (USD)',
        data: Object.values(productSales), // Total sales per product (Y-axis)
        backgroundColor: 'orange', // Bar fill color
        borderColor: 'darkorange', // Bar border color
        borderWidth: 1, // Border thickness
      },
    ],
  };
  const dataPie2 = {
    labels: Object.keys(paymentCounts), // Payment statuses (e.g., 'Success', 'Failed')
    datasets: [
      {
        label: 'Payment Status',
        data: Object.values(paymentCounts), // Count of each status
        backgroundColor: ['#28a745', '#dc3545', '#ffc107'], // Example colors
        hoverOffset: 4, // Offset on hover
      },
    ],
  };

  


  return (
      <div className='px-3'>
        <div className='flex max-xl:justify-between flex-col gap-6'>
          <div className='w-full flex gap-1'>
            <div className='flex flex-col gap-2 border shadow-md rounded-md w-full'>
              <div className='flex gap-2  p-3 w-full justify-between'>
                <div>
                  <p>Total Users</p>
                  <p>{users.length}</p>   
                </div>
                <p className='text-5xl p-1 bg-green-600 text-white rounded-full'><PiUsersThreeFill /></p>
              </div>
              <div className='w-full flex items-center justify-between'>
                <div className='flex gap-2 w-full items-center justify-start'>
                  <div className='flex items-center justify-start'>
                    <HiArrowNarrowUp className='text-green-500 text-xs '/>
                    <p className='text-xs  font-semibold'>{lmp}</p>
                  </div>
                      
                  <p className='font-semibold text-slate-500'>Last updated</p>
                </div>
                <div className='w-full p-1 flex justify-end items-center'>
                  <button className='bg-red-500 active:bg-red-300 rounded-md px-1 active:accent-teal-500 text-white' onClick={()=> navigate('/dashboard?view=users')}>
                    See all
                  </button>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2 border shadow-md rounded-md w-full'>
              <div className='flex gap-2  p-3 w-full justify-between'>
                <div >
                  <p>Total Products</p>
                  <p>{ltp}</p>   
                </div>
                <p className='text-5xl p-1 bg-green-600 text-white rounded-full'><TbPackages /></p> 
              </div>
              <div className='w-full flex items-center justify-between'>
                <div className='flex gap-2 w-full items-center justify-start'>
                  <div className='flex items-center justify-start'>
                    <HiArrowNarrowUp className='text-green-500 text-xs '/>
                    <p className='text-xs  font-semibold'>{lmp}</p>
                  </div>
                      
                  <p className='font-semibold text-slate-500'>Last updated</p>
                </div>
                <div className='w-full p-1 flex justify-end items-center'>
                  <button className='bg-red-500 active:bg-red-300 rounded-md px-1 active:accent-teal-500 text-white' onClick={()=> navigate('/dashboard?view=products')}>
                    See all
                  </button>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2 border shadow-md rounded-md w-full'>
              <div className='flex gap-2  p-3 w-full justify-between'>
                <div >
                  <p>Total Orders</p>
                  <p>{orders.length}</p>   
                </div>
                <p className='text-5xl p-1 bg-green-600 text-white rounded-full'><BsReceiptCutoff /></p> 
              </div>
              <div className='w-full flex items-center justify-between'>
                <div className='flex gap-2 w-full items-center justify-start'>
                  <div className='flex items-center justify-start'>
                    <HiArrowNarrowUp className='text-green-500 text-xs '/>
                    <p className='text-xs  font-semibold'>{lmp}</p>
                  </div>
                      
                  <p className='font-semibold text-slate-500'>Last updated</p>
                </div>
                <div className='w-full p-1 flex justify-end items-center'>
                  <button className='bg-red-500 active:bg-red-300 rounded-md px-1 active:accent-teal-500 text-white' onClick={()=> navigate('/dashboard?view=Orders')}>
                    See all
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 max-md:grid-cols-1 md:grid-cols-2 gap-2 justify-center'>
              <div className='shadow-md h-[300px]'>
                <Line data={dataLine}/>
              </div>
              <div className='shadow-md flex flex-col  items-center h-[300px]'>
                <h3 className='text-slate-500 font-semibold'>Order Status Distribution</h3>
                <div className='p-2 flex justify-center  w-full h-64'>
                  <Pie className='' data={dataPie} />
                </div>
                
              </div>
          </div>
          <div className='grid grid-cols-1 max-md:grid-cols-1 md:grid-cols-2 gap-2 justify-center'>
            <div className='shadow-md h-[300px]'>
              <h3>Top-Selling Products</h3>
              <Bar data={dataBar} />
            </div>
            
            <div className='shadow-md flex flex-col  items-center h-[300px]'>
              <h3 className='text-slate-500 font-semibold'>Payment Status Overview</h3>
              <div className='p-2 flex justify-center  w-full h-64'>
                <Pie className='' data={dataPie2} />
              </div>
            </div>
          </div>
        </div>
        
      </div>
  )
}

export default DashboardPanel