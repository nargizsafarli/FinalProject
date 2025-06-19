import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import bdet from './Blogdetail.module.css';
import { fetchBlogs } from '../../redux/features/auth/blogSlice';


function BlogDetail() {
  const { id } = useParams();
   const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.blog);
    useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, data]);

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta baş verdi: {error}</p>;
    

  const blog = data.find((item) => item.id === Number(id));

  if (!blog) return <p>Blog tapılmadı</p>;

   return (
    <div className={bdet.container}>
      <h1 className={bdet.title}>{blog.nameEn}</h1>
      <div className={bdet.meta}>
        <span>By Admin</span> /
        <span>{new Date(blog.date).toLocaleDateString()}</span> /
        <span className={bdet.category}>{blog.catagoryEn}</span>
      </div>
      <img src={blog.img} alt={blog.nameEn} className={bdet.image} />
      <p className={bdet.short}>{blog.shortInfEn}</p>
      <blockquote className={bdet.quote}>
        “{blog.detailEn.split('.')[0]}.”
      </blockquote>
      <p className={bdet.detail}>{blog.detailEn}</p>
    </div>
  );
}

export default BlogDetail;
