import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import blog from './Blog.module.css';
import { fetchBlogs } from '../../redux/features/auth/blogSlice';

function Blog() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta baş verdi: {error}</p>;

  return (
    <div className={blog.container}>
      {data.map((item) => (
        <div key={item.id} className={blog.card}>
          <img src={item.img} alt={item.title} className={blog.image} />
          <div className={blog.content}>
            <h3 className={blog.title}>{item.nameEn}</h3>
            <div className={blog.meta}>
              <span>By Admin</span> /
              <span> {new Date(item.date).toLocaleDateString()}</span> /
              <span className={blog.category}>{item.catagoryEn}</span>
            </div>
            <p className={blog.short}>{item.shortInfEn}</p>
            <button className={blog.button}>Read More</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Blog;
