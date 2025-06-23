import { useEffect, useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import { supabase } from "../../client";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill, RiEditFill } from "react-icons/ri";
import dash from "./Dashboard.module.css";

const TableView = ({ activeTab }) => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRowData, setNewRowData] = useState({});

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

  const handleEditClick = (record) => {
    setEditingId(record.id);
    setEditedRow({ ...record });
  };

  const handleInputChange = (e, key) => {
    setEditedRow({ ...editedRow, [key]: e.target.value });
  };

  const handleSave = async () => {
    const cleanedRow = { ...editedRow };
    Object.entries(cleanedRow).forEach(([key, value]) => {
      if (typeof data[0]?.[key] === "number") {
        cleanedRow[key] = value === "" ? null : parseFloat(value);
      }
    });

    await supabase.from(activeTab).update(cleanedRow).eq("id", editingId);
    setData((prev) =>
      prev.map((item) => (item.id === editingId ? cleanedRow : item))
    );
    setEditingId(null);
    setEditedRow({});
  };

  const handleAdd = () => {
    const exampleRow = data[0] || {};
    const initialRow = {};

    Object.entries(exampleRow).forEach(([key, value]) => {
      if (key === "id" || key === "created_at") return;
      if (typeof value === "boolean") {
        initialRow[key] = false;
      } else if (typeof value === "number") {
        initialRow[key] = null;
      } else {
        initialRow[key] = "";
      }
    });

    setNewRowData(initialRow);
    setIsModalOpen(true);
  };

  const handleModalSave = async () => {
    const { error, data: inserted } = await supabase
      .from(activeTab)
      .insert([newRowData])
      .select();

    if (!error && inserted?.length > 0) {
      setData((prev) => [inserted[0], ...prev]);
      setIsModalOpen(false);
      setNewRowData({});
    }
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
      title: key,
      dataIndex: key,
      key,
      render: (text, record) => {
        const isEditing = editingId === record.id;
        if (isEditing) {
          return (
            <input
              value={editedRow[key] || ""}
              className={dash.inputCell}
              onChange={(e) => handleInputChange(e, key)}
              style={{ width: "100%" }}
            />
          );
        }
        return text;
      },
    })),
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 100,
      render: (text, record) => {
        const isEditing = editingId === record.id;
        return (
          <div style={{ display: "flex", gap: "6px" }}>
            {isEditing ? (
              <Button type="link" onClick={handleSave}>
                <RiEditFill style={{ fontSize: "20px" }} />
              </Button>
            ) : (
              <Button type="link" onClick={() => handleEditClick(record)}>
                <FaEdit className={dash.actionBtn} />
              </Button>
            )}
            <Button type="link" danger onClick={() => handleDelete(record.id)}>
              <RiDeleteBin2Fill className={dash.actionBtn} />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ overflowX: "auto", padding: "27px 35px" }}>
      {activeTab !== "profils" && (
        <button onClick={handleAdd} className={dash.addBtn}>
          Add
        </button>
      )}

      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.id || JSON.stringify(record)}
        scroll={{ x: "max-content" }}
        bordered={false}
        className={dash.whiteTable}
      />

      {/* Modal for Add */}
      <Modal
        title="Add New Item"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleModalSave}
        okText="Add"
         bodyStyle={{
    maxHeight: "400px", // maksimum hündürlük
    overflowY: "auto",  // scroll aktiv olsun
  }}
      >
        {Object.keys(newRowData).map((key) => (
          <div key={key} style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", fontWeight: 500 }}>{key}</label>
            <Input
              value={newRowData[key]}
              onChange={(e) =>
                setNewRowData((prev) => ({ ...prev, [key]: e.target.value }))
              }
            />
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default TableView;

