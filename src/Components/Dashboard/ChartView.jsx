import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { supabase } from "../../client";
import styles from "./Dashboard.module.css";

const ChartView = () => {
  const [stats, setStats] = useState({
    products: 0,
    blogs: 0,
    faq: 0,
    users: 0,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchCounts = async () => {
      const [{ count: productsCount }, { count: blogsCount }, { count: faqCount }, { count: usersCount }] =
        await Promise.all([
          supabase.from("product").select("*", { count: "exact", head: true }),
          supabase.from("Blog").select("*", { count: "exact", head: true }),
          supabase.from("faq").select("*", { count: "exact", head: true }),
          supabase.from("profils").select("*", { count: "exact", head: true }),
        ]);

      setStats({
        products: productsCount ?? 0,
        blogs: blogsCount ?? 0,
        faq: faqCount ?? 0,
        users: usersCount ?? 0,
      });
    };

    const fetchProductRatings = async () => {
      const { data, error } = await supabase.from("product").select("rating");
      if (!error && data) {
        const filtered = data.filter(item => item.rating !== null);
        setChartData(filtered);
      }
    };

    fetchCounts();
    fetchProductRatings();
  }, []);

  return (
    <div className={styles.dashboardWrapper}>
      {/* Sol tərəf: Reytinq Chart */}
      <div className={styles.chartSection}>
        <h2 className={styles.chartTitle}>Product Ratings</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="rating" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sağ tərəf: Cards */}
      <div className={styles.cardContainer}>
        <div className={styles.card} style={{ backgroundColor: "#4facfe" }}>
          <h3>Products</h3>
          <p>{stats.products}</p>
        </div>
        <div className={styles.card} style={{ backgroundColor: "#43e97b" }}>
          <h3>Blogs</h3>
          <p>{stats.blogs}</p>
        </div>
        <div className={styles.card} style={{ backgroundColor: "#fbc2eb" }}>
          <h3>FAQs</h3>
          <p>{stats.faq}</p>
        </div>
        <div className={styles.card} style={{ backgroundColor: "#ff9a9e" }}>
          <h3>Users</h3>
          <p>{stats.users}</p>
        </div>
      </div>
    </div>
  );
};

export default ChartView;
