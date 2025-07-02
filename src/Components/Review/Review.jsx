import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Rate, Input } from "antd";
import { FaRegUser } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { submitReview } from "../../redux/features/auth/reviewSlice";
import { supabase } from "../../client";
import rev from "./Review.module.css";
import { FaRegCommentAlt } from "react-icons/fa";

const { TextArea } = Input;

function Review({ productId, userId }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("review")
      .select(
        `
        id,
        comment,
        rating,
        created_at,
        user_id,
        profils (
          name,
          surname
        )
      `
      )
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (!error) {
      setReviews(data);
      if (userId) {
        const found = data.find((r) => r.user_id === userId);
        setHasReviewed(!!found);
      }
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmit = async () => {
    if (!userId) {
      alert("Zəhmət olmasa daxil olun!");
      return;
    }

    await dispatch(
      submitReview({
        product_id: productId,
        user_id: userId,
        comment,
        rating,
      })
    );

    // setComment("");
    // setRating(0);
    // setModalOpen(false);
    // fetchReviews();
    // setHasReviewed(true); // düyməni disable etmək üçün
     setHasReviewed(true); // öncə disable et
  setComment("");
  setRating(0);
  setModalOpen(false);
  fetchReviews(); // sonra yenilə
  };

  return (
    <div className={rev.mainCon}>
      <div className={rev.container}>
        <h4 className={rev.comCon}>Şərhlər:</h4>
        {reviews.length === 0 && <p className={rev.ser}>Hələ şərh yoxdur...</p>}
        <ul className={rev.reviewList}>
          {reviews.map((r, i) => (
            <li key={i} className={rev.reviewCard}>
              <div className={rev.left}>
                <div className={rev.avatar}>
                  <FaRegUser />
                </div>
                <div className={rev.textContent}>
                  <span className={rev.userName}>
                    {r.profils?.name} {r.profils?.surname}
                  </span>
                  <span className={rev.comment}>{r.comment}</span>
                </div>
              </div>
              <div className={rev.right}>
                <div className={rev.stars}>
                  {Array.from({ length: r.rating }, (_, idx) => (
                    <FaStar key={idx} />
                  ))}
                </div>
                <span className={rev.date}>
                  {new Date(r.created_at).toLocaleString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={rev.conBot}>
        <button
           className={`${rev.addBtn} ${hasReviewed ? rev.disabledBtn : ""}`}
          onClick={() => setModalOpen(true)}
          disabled={hasReviewed}
        >
        <FaRegCommentAlt />
          Şərh əlavə et
        </button>
      </div>

      <Modal
        title="Şərh əlavə et"
        open={modalOpen}
        onOk={handleSubmit}
        onCancel={() => setModalOpen(false)}
        okText="Göndər"
        cancelText="Ləğv et"
        okButtonProps={{ disabled: rating === 0 || comment.trim() === "" }}
      >
        <div style={{ marginBottom: "1rem", textAlign: "center" }}>
          <Rate
            value={rating}
            onChange={(val) => setRating(val)}
            allowClear
          />
        </div>
        <TextArea
          rows={4}
          placeholder="Şərhinizi yazın..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default Review;
