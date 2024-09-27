import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading'
import { Avatar, Modal, Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Flex, Progress } from 'antd';
import { toast } from 'react-toastify';
import { LiaStarSolid } from "react-icons/lia";

const ProductRviews = () => {
    const [revs, setRevs] = useState([]);
    const [Visible, setVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const {id} = useParams();


    const totalRevs = revs.length;

    useEffect(()=> {
        getReviews();
        // eslint-disable-next-line
    }, [])

    const addReview = async() => {
        const {data} = await axios.put(`/api/products/add_review/${id}`, {rating, comment, title})
        if(data.success) {
            toast.success(data.message)
            setComment("")
            setTitle("")
            setRating(0)
            setVisible(false)
            getReviews()
        } else {
            toast.error("An Error Occured!")
        }
    }
    const getReviews= async() => {
        setLoading(true)
        const {data} = await axios.get(`/api/products/get_reviews/${id}`)
        setRevs(data);
        setLoading(false);
    }

    const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
        star,
        count: revs.filter(ratings => ratings.rating === star).length,
      }));

  

    const averageRating = revs.reduce((acc, rev)=> rev.rating + acc, 0) / totalRevs;



  return (
    <Layout title={`Glee: Product Review`}>
        <div className='flex max-sm:flex-col gap-4'>
            <div className='w-[40%] max-sm:w-full flex flex-col gap-5 px-2'>
                <div>
                    <h2 className='font-semibold text-[26px]'>Customer Ratings</h2>
                    <div className='flex flex-col justify-center items-center border rounded-md bg-slate-100'>
                        <p className='text-yellow-700 text-[19px]'><span className='font-semibold'>{revs.length <= 0 ? 0 : averageRating}</span>/5</p>
                        <p><Rate disabled allowHalf value={averageRating}/></p>
                        <p>{revs.length <= 0 ? 0 : averageRating} total Ratings</p>
                    </div>
                </div>
                <div>
                  <Flex gap="small" vertical>
                       <div className='flex flex-col gap-2 w-full' >
                            {ratingCounts.map(({ star, count }) => (
                            <div key={star} className='flex gap-3'>
                                <p className='flex items-center'>{star} <LiaStarSolid className='text-yellow-400' /></p>
                                <Progress percent={(count / totalRevs) * 100} />
                            </div>
                            ))}
                        </div>
                    </Flex>  
                </div>
                <div>
                    <button onClick={()=> {setVisible(true)}} className='bg-slate-900 max-sm:w-full rounded-md max-sm:text-[13px] font-medium text-white w-48'>Write A Review</button>
                </div>
                
            </div>
            <div>
                {
                    loading ? 
                    <div className='flex px-72 pt-40 w-full items-center justify-center flex-col'>
                        <ReactLoading  type='bars' color='black' height={100} width={50}/>
                        <h1 className='flex'>Please Wait...</h1>
                    </div> :
                    <div className='w-full max-sm:h-[100vh] flex flex-col gap-3'>
                        <div>
                            <h2 className='font-semibold text-[26px]'>Customer Reviews</h2>
                        </div>
                        {
                            revs.map((r, i)=> {
                                return(
                                    <div key={r._id} className='px-3'>
                                        <div className='flex  gap-3 items-center'>
                                            <Avatar size="medium" icon={<UserOutlined />} />
                                            <p className='font-medium'>{r.name}</p>
                                        </div>
                                        <div className='flex  gap-2 items-center'>
                                            <Rate disabled allowHalf value={r.rating} className='text-[15px]'/>
                                            <p className='font-semibold'>{r.title}</p>
                                        </div>
                                        <div>
                                            <p>{r.comment}</p>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                }
            </div>
            <Modal onCancel={()=> setVisible(false)}  open={Visible}  footer={null}>
                <div>
                    <form className='flex flex-col gap-2' onSubmit={addReview}>
                        <div className='flex flex-col justify-center items-center gap-3'>
                            <p className='font-semibold text-[18px]'>How Would You Rate This?</p>
                            <Rate value={rating} onChange={setRating}/>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <input required className='border px-2 h-12 w-full rounded-md focus:outline-gray-200' type="text" value={title} placeholder='Add title' onChange={(e)=> setTitle(e.target.value)} />
                            <textarea value={comment} placeholder='Tell Us What You Think' onChange={(e)=> setComment(e.target.value)} name="comment" className='w-full rounded-md px-2 border focus:outline-gray-200'  rows={3} cols={5} required></textarea>
                        </div>
                        <div className='flex justify-center items-center'>
                            <button className='bg-slate-800 w-48 font-medium rounded-md text-[16px]  text-white' type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    </Layout>
  )
}

export default ProductRviews