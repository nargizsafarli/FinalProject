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
          <p className={pro.catTitle}>Categories</p>
          <div className={pro.inputItem}>
            <label className={pro.labell}>
              <input type="checkbox" value="Dicotyledons" />
              <p className={pro.filElement}> Dicotyledons (18)</p>
            </label>
            <label className={pro.labell}>
              <input type="checkbox" value="Lilies" />
              <p className={pro.filElement}> Lilies (18)</p>
            </label>
            <label className={pro.labell}>
              <input type="checkbox" value="Monocotyledons" />
             <p className={pro.filElement}>Monocotyledons (20)</p> 
            </label>
            <label className={pro.labell}>
              <input type="checkbox" value="Sugarcanes" />
               <p className={pro.filElement}>Sugarcanes (18)</p>
            </label>
          </div>
        </div>
        <div className={pro.filterInput}>
          <p className={pro.catTitle}>Availability</p>
          <div className={pro.inputItem}>
            <label className={pro.labell}>
              <input type="checkbox" value="Dicotyledons" />
             <p className={pro.filElement}>Available</p>
            </label>
            <label className={pro.labell}>
              <input type="checkbox" value="Lilies" />
             <p className={pro.filElement}>Not available</p> 
            </label>
          </div>
        </div>
        <div className={pro.filterInput}>
          <p className={pro.catTitle}>Material</p>
          <div className={pro.inputItem}>
            <label className={pro.labell}>
              <input type="checkbox" value="plastic" />
             <p className={pro.filElement}>Plastic</p> 
            </label>
            <label className={pro.labell}>
              <input type="checkbox" value="keramic" />
             <p className={pro.filElement}>Keramik</p> 
            </label>
            <label className={pro.labell}>
              <input type="checkbox" value="metal" />
             <p className={pro.filElement}>Metal</p> 
            </label>
          </div>
        </div>
        <div className={pro.filterInput}>
          <p className={pro.catTitle}>Brand</p>
          <div className={pro.selectItem}>
            <Select
              mode="multiple"
              placeholder="(no filter)"
              value={selectedItems}
              onChange={setSelectedItems}
              style={{ width: "95%" }}
              className={pro.customSelect}
              
              options={filteredOptions.map((item) => ({
                value: item,
                label: item,
              }))}
            />
          </div>
        </div>
        <div className={pro.filterInput}>
          <p className={pro.catTitle}>Condition</p>
          <div className={pro.inputItem}>
            <label className={pro.labell}>
              <input type="checkbox" value="plastic" />
             <p className={pro.filElement}>Discounted</p> 
            </label>
            <label className={pro.labell}>
              <input type="checkbox" value="keramic" />
             <p className={pro.filElement}>New Product</p> 
            </label>
            <label className={pro.labell}>
              <input type="checkbox" value="metal" />
             <p className={pro.filElement}>Popular</p> 
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
          <div className={pro.intItem}>
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
                  <img src={product.img} alt={product.nameEn} className={pro.images}/>
                </div>
                <div className={pro.cardBody}>
                  <p className={pro.name}>{product.nameEn}</p>
                  <span className={pro.rating}>{product.rating} ⭐</span>
                  <div className={pro.price}>
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
