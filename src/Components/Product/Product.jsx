import React, { useEffect, useState } from "react";
import pro from "./product.module.css";
import { Select } from "antd";
import logo from "./assets/download (4).svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/features/auth/productSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaCaretDown } from "react-icons/fa";
// import { faHeart, faStar, faStarHalfAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faArrowRight,
  faStar as faSolidStar,
  faStarHalfAlt,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faStar as faRegularStar,
} from "@fortawesome/free-regular-svg-icons";
import det from "./assets/download (5).svg";
import basket from "./assets/download (6).svg";
const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];

function Product() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.product);
  console.log(data);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [availabilityFilter, setAvailablityFilter] = useState(null);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategory((prev) =>
      checked ? [...prev, value] : prev.filter((cat) => cat !== value)
    );
  };
  // const filteredProducts = data.filter((product) => {
  //   if (selectedCategory.length === 0) return true; // heç nə seçilməyibsə, hamısını göstər
  //   return selectedCategory.includes(product.category);
  // });
  const filteredProducts = data.filter((product) => {
    const categoryMatch =
      selectedCategory.length === 0 ||
      selectedCategory.includes(product.category);

    const availabilityMatch =
      availabilityFilter === null || // yəni istifadəçi heç bir checkbox seçməyibsə
      (availabilityFilter === "available" && product.isStock === true) ||
      (availabilityFilter === "not-available" && product.isStock === false);

    return categoryMatch && availabilityMatch;
  });

  // !pagination---------------------
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // !Select-------------------------
  const [selectedItems, setSelectedItems] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
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
  const renderStars = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <FontAwesomeIcon
            icon={faSolidStar}
            color="#facc15"
            style={{ fontSize: "12px" }}
            key={i}
          />
        );
      } else if (rating >= i - 0.5) {
        stars.push(
          <FontAwesomeIcon
            icon={faStarHalfAlt}
            color="#facc15"
            style={{ fontSize: "12px" }}
            key={i}
          />
        );
      } else {
        stars.push(
          <FontAwesomeIcon
            icon={faRegularStar}
            color="#facc15"
            style={{ fontSize: "12px" }}
            key={i}
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className={pro.container}>
      <div
        className={`${pro.filterOverlay} ${showFilter ? pro.overlayOpen : ""}`}
        onClick={() => setShowFilter(false)}
      ></div>

      <div className={`${pro.filterCon} ${showFilter ? pro.activeFilter : ""}`}>
        <div className={pro.filterBy}>
          Filter By
          <button className={pro.closeBtn} onClick={() => setShowFilter(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className={pro.filterInput}>
          <p className={pro.catTitle}>Categories</p>
          <div className={pro.inputItem}>
            <label className={pro.labell}>
              <input
                type="checkbox"
                value="dicotyledons"
                onChange={handleCategoryChange}
              />
              <p className={pro.filElement}> Dicotyledons (18)</p>
            </label>
            <label className={pro.labell}>
              <input
                type="checkbox"
                value="lilies"
                onChange={handleCategoryChange}
              />
              <p className={pro.filElement}> Lilies (18)</p>
            </label>
            <label className={pro.labell}>
              <input
                type="checkbox"
                value="monocotyledons"
                onChange={handleCategoryChange}
              />
              <p className={pro.filElement}>Monocotyledons (20)</p>
            </label>
            <label className={pro.labell}>
              <input
                type="checkbox"
                value="sugarcanes"
                onChange={handleCategoryChange}
              />
              <p className={pro.filElement}>Sugarcanes (18)</p>
            </label>
          </div>
        </div>
        <div className={pro.filterInput}>
          <p className={pro.catTitle}>Availability</p>
          <div className={pro.inputItem}>
            <label className={pro.labell}>
              <input
                type="checkbox"
                value="availablity"
                name="availablity"
                checked={availabilityFilter === "available"}
                onChange={(e) => {
                  if (availabilityFilter === "available") {
                    setAvailablityFilter(null); // eyni checkbox ikinci dəfə seçilərsə, sıfırla
                  } else {
                    setAvailablityFilter("available");
                  }
                }}
              />
              <p className={pro.filElement}>Available</p>
            </label>
            <label className={pro.labell}>
              <input
                type="checkbox"
                name="availablity"
                value="not-available"
                checked={availabilityFilter === "not-available"}
                onChange={(e) => {
                  if (availabilityFilter === "not-available") {
                    setAvailablityFilter(null);
                  } else {
                    setAvailablityFilter("not-available");
                  }
                }}
              />
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
              suffixIcon={<FaCaretDown color="black" size={16} />}
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
          <div className={pro.resItem}>
            <div className={pro.intItem}>
              <img src={logo} style={{ width: "20px" }} />
              <p className={pro.proDet}>There are {data.length} products.</p>
            </div>
            <div className={pro.intItem}>
              <p className={pro.proDet2}>Sort By:</p>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Relevance"
                className={pro.customSelectTwice}
                optionFilterProp="label"
                suffixIcon={<FaCaretDown color="black" size={16} />}
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
              <button
                className={pro.filterToggleBtn}
                onClick={() => setShowFilter(true)}
              >
                FILTER
              </button>
            </div>
          </div>
        </div>

        <div className={pro.productss}>
          {currentProducts.map((product) => {
            const { price, discount } = getDisplayPrice(product);
            return (
              <div key={product.id} className={pro.proCard}>
                <div className={pro.cardOverlay}>
                  <div className={pro.overIcon}>
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                  <div className={pro.overIcon}>
                    <img src={basket} className={pro.overImg} />
                  </div>
                  <div className={pro.overIcon}>
                    <img src={det} className={pro.overImg} />
                  </div>
                </div>
                <div className={pro.cardImg}>
                  <img
                    src={product.img}
                    alt={product.nameEn}
                    className={pro.images}
                  />
                </div>
                <div className={pro.cardBody}>
                  <p className={pro.name}>{product.nameEn}</p>
                  <div className={pro.rating}>
                    {renderStars(product.rating)}
                  </div>
                  <div className={pro.price}>
                    {discount ? (
                      <div>
                        <span className={pro.oldPrice}>${price}</span>
                        <span className={pro.disPrice}>${discount}</span>
                      </div>
                    ) : (
                      <span className={pro.pri}>${price}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Paginationnn */}
        <div className={pro.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faArrowLeft} style={{ color: "white" }} />
          </button>
          <span className={pro.currentPage}>{currentPage}</span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faArrowRight} style={{ color: "white" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
