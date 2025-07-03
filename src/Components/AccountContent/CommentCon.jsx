import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../client";
import comment from "./Comment.module.css";
import { LiaStarSolid } from "react-icons/lia";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18next";

function CommentCon() {
  const userId = useSelector((state) => state.auth.user?.id);
  const [myReviews, setMyReviews] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [editedRating, setEditedRating] = useState(5);
const {t}=useTranslation()
  const fetchMyReviews = async () => {
    const { data, error } = await supabase
      .from("review")
      .select(
        `
        id,
        comment,
        rating,
        created_at,
        product (
          id,
          nameEn,
           nameAz,
          img
        )
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error) {
      setMyReviews(data);
    }
  };

  useEffect(() => {
    if (userId) fetchMyReviews();
  }, [userId]);
const currenLang=i18n.language
  const handleUpdate = async (id) => {
    const { error } = await supabase
      .from("review")
      .update({ comment: editedComment, rating: editedRating })
      .eq("id", id);

    if (!error) {
      setEditId(null);
      setEditedComment("");
      setEditedRating(5);
      fetchMyReviews();
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("review").delete().eq("id", id);
    if (!error) {
      fetchMyReviews();
    }
  };

  return (
    <div className={comment.container}>
      <h2 className={comment.title}>{t("acc.comme")}</h2>
      {myReviews.length === 0 && <p>{t("acc.noSer")}</p>}

      <ul className={comment.cardUl}>
        {myReviews.map((r) => (
          <li key={r.id} className={comment.list}>
            <div className={comment.card}>
              <img
                src={r.product?.img}
                alt={r.product?.nameEn}
                className={comment.image}
              />
              <div className={comment.cardContent}>
                <div className={comment.cardHeader}>
                  <h4 className={comment.name}>
                  {/* {r.product?.nameEn} */}
                  {currenLang==="en"? r.product.nameEn : r.product.nameAz}
                  </h4>
                  <div className={comment.cardRating}>
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <LiaStarSolid key={i} className={comment.starIcon} />
                    ))}
                  </div>
                </div>
                <small className={comment.cardDate}>
                  {new Date(r.created_at).toLocaleString()}
                </small>

                {editId === r.id ? (
                  <div className={comment.buttonGroup}>
                    <textarea
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      className={comment.txtArea}
                    />
                    <select
                      value={editedRating}
                      onChange={(e) => setEditedRating(Number(e.target.value))}
                    >
                      {[5, 4, 3, 2, 1].map((val) => (
                        <option key={val} value={val}>
                          {val} ⭐
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleUpdate(r.id)}
                      className={comment.button}
                    >
                     {t("acc.save")}
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className={`${comment.button} ${comment.btnEd}`}
                    >
                      {t("acc.cancel")}
                    </button>
                  </div>
                ) : (
                  <>
                    <p>{r.comment}</p>
                    <button
                      onClick={() => {
                        setEditId(r.id);
                        setEditedComment(r.comment);
                        setEditedRating(r.rating);
                      }}
                      className={`${comment.button} ${comment.btnEd}`}
                    >
                      {t("acc.edit")}
                    </button>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className={comment.button}
                    >
                      {t("acc.del")}
                    </button>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentCon;
