import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { supabase } from "../../client";

const TableView = ({ activeTab }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from(activeTab).select("*");
      if (!error) setData(data);
    };
    fetchData();
  }, [activeTab]);

  const handleDelete = async (id) => {
    await supabase.from(activeTab).delete().eq("id", id);
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    {
      title: "#",
      key: "index",
      render: (text, record, index) => index + 1,
      fixed: "left",
      width: 60,
    },
    ...Object.keys(data[0] || {}).map((key) => ({
      title: key.toUpperCase(),
      dataIndex: key,
      key,
    })),
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 80,
      render: (text, record) => (
        <>
          <Button type="link" onClick={() => alert("Edit form açılır")}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <h2 style={{ marginBottom: 16 }}>{activeTab.toUpperCase()}</h2>
      <Button type="primary" style={{ marginBottom: 16 }}>
        Add
      </Button>
      <div style={{ overflowX: "auto", padding:"30px"}}>
        <Table
          dataSource={data}
          columns={columns}
          rowKey="id"
          scroll={{ x: "max-content" }}
          bordered
        />
      </div>
    </>
  );
};

export default TableView;

