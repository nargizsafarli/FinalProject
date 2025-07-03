import React, { useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../client";
import acc from "./Account.module.css";
import Swal from "sweetalert2";

function AccountCon() {
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState(user?.name || "");
  const [surname, setSurname] = useState(user?.surname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [loading, setLoading] = useState(false);
  // const [password, setPassword] = useState(""); // Yeni şifrə qoymaq üçün

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const { error: profileError } = await supabase
        .from("profils")
        .update({ name, surname })
        .eq("id", user.id);

      const { error: authError } = await supabase.auth.updateUser({
        email: email !== user.email ? email : undefined,
      });

      if (profileError || authError) {
        Swal.fire({
          icon: "error",
          title: "Xəta baş verdi",
          text: profileError?.message || authError?.message,
        });
      } else {
        const updatedUser = { ...user, name, surname, email };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        Swal.fire({
          icon: "success",
          title: "Uğurla yeniləndi ",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Xəta!",
        text: err.message,
      });
    }

    setLoading(false);
  };

  return (
    <div className={acc.container}>
      <h2 className={acc.title}>Hesab Məlumatları</h2>

      <div className={acc.nameInf}>
        <div className={acc.inputGroup}>
          <label>Ad:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={acc.input}
          />
        </div>
        <div className={acc.inputGroup}>
          <label>Soyad:</label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className={acc.input}
          />
        </div>
      </div>

      <div className={acc.inputGroup}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={acc.input}
        />
      </div>

      <button onClick={handleUpdate} disabled={loading} className={acc.button}>
        {loading ? "Yenilənir..." : "Yadda saxla"}
      </button>
    </div>
  );
}

export default AccountCon;
