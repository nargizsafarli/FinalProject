import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import blog from './Blog.module.css';
import { fetchBlogs } from '../../redux/features/auth/blogSlice';
import { useNavigate } from 'react-router-dom';
import i18n from '../../i18n/i18next';
import { SpinnerDotted } from 'spinners-react';

function Blog() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.blog);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);
  const currentLang = i18n.language;

    if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <SpinnerDotted size={70} thickness={100} speed={100} color="green" />
      </div>
    );
  }
  if (error) return <p>Xəta baş verdi: {error}</p>;

  return (
    <div className={blog.mainCon}>
    <div className={blog.container}>
      {data.map((item) => (
        <div key={item.id} className={blog.card}>
          <div className={blog.imgMain}><img src={item.img} alt={item.title} className={blog.image} /></div>
          <div className={blog.content}>
            <h3 className={blog.title}>{currentLang==="en"? item.nameEn : item.nameAz}</h3>
            <div className={blog.meta}>
              <span className={blog.admin}>By Admin</span> /
              <span className={blog.category}>{currentLang==="en"? item.catagoryEn : item.catagoryAz}</span>
            </div>
            <p className={blog.short}>{currentLang==="en"? item.shortInfEn : item.shortInfAz}</p>
            <button className={blog.button}
              onClick={() => navigate(`/${currentLang}/blog/${item.id}`)}
            >Read More</button>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Blog;
