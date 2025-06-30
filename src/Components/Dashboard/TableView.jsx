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
    const cleanedRow = { ...newRowData };

    Object.entries(cleanedRow).forEach(([key, value]) => {
      if (value === "") {
        cleanedRow[key] = null;
      }

      if (typeof data[0]?.[key] === "number") {
        cleanedRow[key] = value === "" ? null : parseFloat(value);
      }

      if (typeof data[0]?.[key] === "boolean") {
        // istifadəçi boolean inputu görmür, ona görə undefined olsa belə false ver
        cleanedRow[key] =
          value === undefined ? false : value === "true" || value === true;
      }
    });

    const { error, data: inserted } = await supabase
      .from(activeTab)
      .insert([cleanedRow])
      .select();

    if (!error && inserted?.length > 0) {
      setData((prev) => [inserted[0], ...prev]);
      setIsModalOpen(false);
      setNewRowData({});
    } else {
      console.error(error);
    }
  };
  const columnNames = {
    id: "Id",
    img: "Image",
    materialAz: "Material(AZ)",
    materialEn: "Material(EN)",
    created_at: "Creation date",
    isDiscount: "Discount",
    isStock: "Stock",
    brand: "Brand",
    titleAz: "Title (AZ)",
    nameEn: "Name(EN)",
    nameAz: "Name(AZ)",
    titleEn: "Title (EN)",
    descriptionAz: "Description (AZ)",
    descriptionEn: "Description (EN)",
    detailAz: "Details (AZ)",
    detailEn: "Details (EN)",
  };

  const imageKeys = ["img", "thumnailImg"];
  const keysInData = data[0] ? Object.keys(data[0]) : [];

  const imageColumns = imageKeys
    .filter((key) => keysInData.includes(key)) // yalnız mövcud sütunlar üçün
    .map((key) => ({
      title: (
        <span
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: " rgb(79, 126, 79)",
          }}
        >
          {columnNames[key] || key}
        </span>
      ),
      dataIndex: key,
      key,
      width: 100,
      render: (text) => {
        if (!text) return "-";
        return (
          <img
            src={text}
            alt="img"
            style={{
              width: 60,
              height: 60,
              objectFit: "cover",
              borderRadius: 6,
            }}
          />
        );
      },
    }));

  const columns = [
    {
      title: "#",
      key: "index",
      render: (text, record, index) => index + 1,
      fixed: "left",
      width: 60,
    },
    ...imageColumns,
    ...Object.keys(data[0] || {})
      .filter((key) => !["img", "thumnailImg"].includes(key))
      .map((key) => ({
        title: (
          <span
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: " rgb(79, 126, 79)",
            }}
          >
            {/* {key} */}
            {columnNames[key] || key}
          </span>
        ),
        dataIndex: key,
        key,

        render: (text, record) => {
          const isEditing = editingId === record.id;
          const longKeys = [
            "descriptionAz",
            "descriptionEn",
            "detailAz",
            "detailEn",
            "answerAz",
            "answerEn",
          ];

          if (isEditing) {
            if (key === "id") {
              return record[key]; // Edit mümkün deyil
            }

            if (isEditing) {
              if (key === "created_at") {
                // Edit mümkün deyil, sadəcə göstər
                return new Date(record[key]).toLocaleDateString("az-AZ");
              }
            }
            return (
              <input
                value={editedRow[key] ?? ""}
                className={dash.inputCell}
                onChange={(e) => handleInputChange(e, key)}
                style={{ width: "100%" }}
              />
            );
          }
          if (key === "created_at") {
            const date = new Date(text);
            return date.toLocaleDateString("az-AZ"); // məsələn: 30.06.2025
          }

          if (text === null || text === "" || text === undefined) return "-";
          if (typeof text === "boolean") return text ? "true" : "-";
          if (longKeys.includes(key)) {
            return (
              <div
                style={{
                  width: 300,
                  height: 50,
                  overflow: "auto",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {text}
              </div>
            );
          }
          return text;
        },
      })),
    {
      title: (
        <span
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: " rgb(79, 126, 79)",
          }}
        >
          Actions
        </span>
      ),
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
              {/* <p className={dash.actionBtn}>delete</p>  */}
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
        title={
          <span
            style={{ fontSize: "20px", fontWeight: "bold", color: "#4f7e4f" }}
          >
            Add New Item
          </span>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleModalSave}
        okText="Add"
        okButtonProps={{
          className: dash.customOkBtn,
        }}
        bodyStyle={{
          maxHeight: "400px", // maksimum hündürlük
          overflowY: "auto", // scroll aktiv olsun
        }}
      >
        {Object.keys(newRowData).map((key) => {
          // boolean field-ləri inputda göstərmirik
          if (typeof newRowData[key] === "boolean") {
            return null;
          }

          return (
            <div key={key} style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", fontWeight: 500 }}>{key}</label>
              <Input
                value={newRowData[key]}
                onChange={(e) =>
                  setNewRowData((prev) => ({ ...prev, [key]: e.target.value }))
                }
              />
            </div>
          );
        })}
      </Modal>
    </div>
  );
};
export default TableView;
