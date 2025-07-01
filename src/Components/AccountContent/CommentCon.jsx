import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../client";

function CommentCon() {
  const userId = useSelector((state) => state.auth.user?.id);
  const [myReviews, setMyReviews] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [editedRating, setEditedRating] = useState(5);

  const fetchMyReviews = async () => {
    const { data, error } = await supabase
      .from("review")
      .select(`
        id,
        comment,
        rating,
        created_at,
        product (
          id,
          nameEn,
          img
        )
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error) {
      setMyReviews(data);
    }
  };

  useEffect(() => {
    if (userId) fetchMyReviews();
  }, [userId]);

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
    <div style={{ padding: "2rem"}}>
      <h2 style={{ marginBottom: "1.5rem" }}>Mənim Yorumlarım</h2>
      {myReviews.length === 0 && <p>Hələ heç bir şərh yazmamısınız.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {myReviews.map((r) => (
          <li
            key={r.id}
            style={{
              border: "1px solid #ddd",
              padding: "1rem",
              borderRadius: "8px",
              background: "#fff",
              marginBottom: "1.5rem",
            }}
          >
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <img
                src={r.product?.img}
                alt={r.product?.nameEn}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
              <div style={{ flex: 1 }}>
                <h4>{r.product?.nameEn}</h4>
                <strong>{r.rating} ⭐</strong>
                <br />
                <small style={{ color: "#777" }}>
                  {new Date(r.created_at).toLocaleString()}
                </small>

                {editId === r.id ? (
                  <div style={{ marginTop: "0.5rem" }}>
                    <textarea
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      style={{ width: "100%", height: "60px", marginBottom: "0.5rem" }}
                    />
                    <select
                      value={editedRating}
                      onChange={(e) => setEditedRating(Number(e.target.value))}
                      style={{ marginBottom: "0.5rem", width: "100%" }}
                    >
                      {[5, 4, 3, 2, 1].map((val) => (
                        <option key={val} value={val}>
                          {val} ⭐
                        </option>
                      ))}
                    </select>
                    <br />
                    <button
                      onClick={() => handleUpdate(r.id)}
                      style={{ marginRight: "0.5rem" }}
                    >
                      Yadda saxla
                    </button>
                    <button onClick={() => setEditId(null)}>Ləğv et</button>
                  </div>
                ) : (
                  <>
                    <p style={{ margin: "0.5rem 0" }}>{r.comment}</p>
                    <button
                      onClick={() => {
                        setEditId(r.id);
                        setEditedComment(r.comment);
                        setEditedRating(r.rating);
                      }}
                      style={{ marginRight: "0.5rem" }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDelete(r.id)}>Sil</button>
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

export default CommentCon;
