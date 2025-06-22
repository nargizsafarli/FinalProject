import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { supabase } from "../../client";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import dash from "./Dashboard.module.css";
import { RiEditFill } from "react-icons/ri";

const TableView = ({ activeTab }) => {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedRow, setEditedRow] = useState({});

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
      // Əgər boş stringdirsə və orijinal data number idisə
      cleanedRow[key] = value === "" ? null : parseFloat(value);
    }
  });

  
  if (editingId === "new") {
  const { data: newData, error } = await supabase
    .from(activeTab)
    .insert([cleanedRow])
    .select();

  if (!error && newData.length > 0) {
    // emptyRow-u silirik (id-siz olan)
    setData((prev) => {
      const filtered = prev.filter(item => item.id); // yalnız id-si olanları saxla
      return [newData[0], ...filtered]; // yeni row-u əlavə et
    });
  }
}

  else {
    await supabase.from(activeTab).update(cleanedRow).eq("id", editingId);
    setData((prev) =>
      prev.map((item) => (item.id === editingId ? cleanedRow : item))
    );
  }

  setEditingId(null);
  setEditedRow({});
};




const handleAdd = () => {
  const emptyRow = {};
  const exampleRow = data[0] || {};

  Object.entries(exampleRow).forEach(([key, value]) => {
    if (typeof value === "boolean") {
      emptyRow[key] = false; // boolean sahələrə default olaraq false
    } else if (typeof value === "number") {
      emptyRow[key] = null; // number sahələrə default olaraq null
    } else {
      emptyRow[key] = ""; // string və ya digərlərinə ""
    }
  });

  setEditingId("new");
  setEditedRow(emptyRow);
  setData((prev) => [emptyRow, ...prev]);
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
        const isNewRow = editingId === "new" && !record.id;
        const isEditing = editingId === record.id;

        if (isNewRow || isEditing) {
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
        const isNewRow = editingId === "new" && !record.id;
        const isEditing = editingId === record.id;

        return (
          <div style={{ display: "flex", gap: "6px" }}>
            {(isEditing || isNewRow) ? (
              <Button type="link" onClick={handleSave}>
                <RiEditFill style={{fontSize:"20px"}} />
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
    </div>
  );
};

export default TableView;
