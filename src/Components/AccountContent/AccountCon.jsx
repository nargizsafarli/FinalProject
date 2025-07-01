import React, { useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../client";

function AccountCon() {
  const user = useSelector((state) => state.auth.user);
  const [name, setName] = useState(user?.name || "");
  const [surname, setSurname] = useState(user?.surname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(""); // Yeni şifrə qoymaq üçün
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    setLoading(true);
    setMessage("");

    try {
      // ⿡ profils cədvəlində ad və soyad yenilə
      const { error: profileError } = await supabase
        .from("profils")
        .update({ name, surname })
        .eq("id", user.id);

      // ⿢ auth.users cədvəlində email və ya şifrə dəyiş
      const { error: authError } = await supabase.auth.updateUser({
        email: email !== user.email ? email : undefined, // yalnız dəyişibsə
        password: password || undefined, // boş deyilsə
      });

      if (profileError || authError) {
        setMessage("Xəta baş verdi: " + (profileError?.message || authError?.message));
      } else {
        // 🔄 localStorage yenilə
        const updatedUser = { ...user, name, surname, email };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setMessage("Məlumatlar uğurla yeniləndi ✅");
      }
    } catch (err) {
      setMessage("Xəta: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "1rem" }}>
      <h2>Hesab Məlumatları</h2>

      <label>Ad:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      />

      <label>Soyad:</label>
      <input
        type="text"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      />

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      />

      <label>Yeni Şifrə (istəsən):</label>
      <input
        type="password"
        placeholder="Yeni şifrə daxil et"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      />

      <button onClick={handleUpdate} disabled={loading}>
        {loading ? "Yenilənir..." : "Yadda saxla"}
      </button>

      {message && (
        <p style={{ marginTop: "1rem", color: message.includes("uğur") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default AccountCon;

