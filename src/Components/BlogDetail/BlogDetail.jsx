import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import bdet from "./Blogdetail.module.css";
import { fetchBlogs } from "../../redux/features/auth/blogSlice";
import i18n from "../../i18n/i18next";
import { useTranslation } from "react-i18next";
import { SpinnerDotted } from "spinners-react";
import Aos from "aos";
import 'aos/dist/aos.css';

function BlogDetail() {
  const { id } = useParams();
  const { t } = useTranslation();
  const currentLang = i18n.language;

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.blog);
  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, data]);

  useEffect(() => {
      Aos.init({
        duration: 1000, 
      });
    }, []);

   if (loading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <SpinnerDotted size={70} thickness={100} speed={100} color="green" />
        </div>
      );
    }
  if (error) return <p>Xəta baş verdi: {error}</p>;

  const blog = data.find((item) => item.id === Number(id));

  if (!blog) return <p>Blog tapılmadı</p>;

  return (
    <div className={bdet.container} data-aos="zoom-in">
      <h1 className={bdet.title}>
        {currentLang === "en" ? blog.nameEn : blog.nameAz}
      </h1>
      <div className={bdet.meta}>
        <span>{t("det.admin")}</span> /
        <span>{new Date(blog.date).toLocaleDateString()}</span> /
        <span className={bdet.category}>
          {currentLang === "en" ? blog.catagoryEn : blog.catagoryAz}
        </span>
      </div>
      <img src={blog.img} alt={blog.nameEn} className={bdet.image} />
      <p className={bdet.short}>
        {currentLang === "en" ? blog.shortInfEn : blog.shortInfAz}
      </p>
      <blockquote className={bdet.quote}>
        “
        {currentLang === "en"
          ? blog.detailEn.split(".")[0]
          : blog.detailAz.split(".")[0]}
        .”
      </blockquote>
      <p className={bdet.detail}>
        {currentLang === "en" ? blog.detailEn : blog.detailAz}
      </p>
    </div>
  );
}

export default BlogDetail;
