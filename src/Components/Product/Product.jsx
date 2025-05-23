import React, { useEffect, useState } from "react";
import pro from "./product.module.css";
import { Select } from "antd";
import logo from "./assets/download (4).svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/features/auth/productSlice";
const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
function Product() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.product);
  console.log(data);
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta baş verdi: {error}</p>;

  const getDisplayPrice = (product) => {
    if (product.small) {
      return {
        price: product.smallPrice,
        discount: product.smallDisPrice,
      };
    }
    if (product.medium) {
      return {
        price: product.mediumPrice,
        discount: product.mediumDisPrice,
      };
    }
    if (product.large) {
      return {
        price: product.largePrice,
        discount: product.largeDisPrice,
      };
    }
    return {
      price: null,
      discount: null,
    };
  };

  return (
    <div className={pro.container}>
      <div className={pro.filterCon}>
        <div className={pro.filterBy}>Filter By</div>
        <div className={pro.filterInput}>
          <p>Categories</p>
          <div className={pro.inputItem}>
            <label>
              <input type="checkbox" value="Dicotyledons" />
              Dicotyledons (18)
            </label>
            <label>
              <input type="checkbox" value="Lilies" />
              Lilies (17)
            </label>
            <label>
              <input type="checkbox" value="Monocotyledons" />
              Monocotyledons (20)
            </label>
            <label>
              <input type="checkbox" value="Sugarcanes" />
              Sugarcanes (18)
            </label>
          </div>
        </div>
        <div className={pro.filterInput}>
          <p>Availability</p>
          <div className={pro.inputItem}>
            <label>
              <input type="checkbox" value="Dicotyledons" />
              In stock
            </label>
            <label>
              <input type="checkbox" value="Lilies" />
              Not available
            </label>
          </div>
        </div>
        <div className={pro.filterInput}>
          <p>Material</p>
          <div className={pro.inputItem}>
            <label>
              <input type="checkbox" value="plastic" />
              Plastic
            </label>
            <label>
              <input type="checkbox" value="keramic" />
              Keramik
            </label>
            <label>
              <input type="checkbox" value="metal" />
              Metal
            </label>
          </div>
        </div>
        <div className={pro.filterInput}>
          <p>Brand</p>
          <div className={pro.inputItem}>
            <Select
              mode="multiple"
              placeholder="(no filter)"
              value={selectedItems}
              onChange={setSelectedItems}
              style={{ width: "15%" }}
              options={filteredOptions.map((item) => ({
                value: item,
                label: item,
              }))}
            />
          </div>
        </div>
        <div className={pro.filterInput}>
          <p>Condition</p>
          <div className={pro.inputItem}>
            <label>
              <input type="checkbox" value="plastic" />
              Discounted
            </label>
            <label>
              <input type="checkbox" value="keramic" />
              New Product
            </label>
            <label>
              <input type="checkbox" value="metal" />
              Popular
            </label>
          </div>
        </div>
      </div>
      <div className={pro.productCon}>
        <div className={pro.inf}>
          <div className={pro.intItem}>
            <img src={logo} style={{ width: "20px" }} />
            <p>There are 23 products.</p>
          </div>
          <div>
            <p>Sort By:</p>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Relevance"
              optionFilterProp="label"
              filterSort={(optionA, optionB) => {
                var _a, _b;
                return (
                  (_a =
                    optionA === null || optionA === void 0
                      ? void 0
                      : optionA.label) !== null && _a !== void 0
                    ? _a
                    : ""
                )
                  .toLowerCase()
                  .localeCompare(
                    ((_b =
                      optionB === null || optionB === void 0
                        ? void 0
                        : optionB.label) !== null && _b !== void 0
                      ? _b
                      : ""
                    ).toLowerCase()
                  );
              }}
              options={[
                {
                  value: "1",
                  label: "Not Identified",
                },
                {
                  value: "2",
                  label: "Closed",
                },
                {
                  value: "3",
                  label: "Communicated",
                },
                {
                  value: "4",
                  label: "Identified",
                },
                {
                  value: "5",
                  label: "Resolved",
                },
                {
                  value: "6",
                  label: "Cancelled",
                },
              ]}
            />
          </div>
        </div>

        <div className={pro.productss}>
          {data.map((product) => {
            const { price, discount } = getDisplayPrice(product);
            return (
              <div key={product.id} className={pro.proCard}>
                <div className={pro.cardImg}>
                  <img src={product.img} alt={product.nameEn} />
                </div>
                <div className={pro.cardBody}>
                  <p>{product.nameEn}</p>
                  <span>{product.rating} ⭐</span>
                  <div>
                    {discount ? (
                      <div>
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "gray",
                            marginRight: "8px",
                          }}
                        >
                          ${price}
                        </span>
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          ${discount}
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontWeight: "bold" }}>${price}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Product;
