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
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18next";

function Product() {
  const {t}=useTranslation()
  const currentLang = i18n.language;
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.product);
  console.log(data);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [availabilityFilter, setAvailablityFilter] = useState(null);
   const [selectedMaterial, setSelectedMaterial] = useState([]);
   const [selectedCondition, setSelectedCondition] = useState([]);
   const [selectedBrand, setSelectedBrand] = useState([]);
   const [sortOption, setSortOption] = useState("1");

  //  const [selectedBrand, setSelectedBrand] = useState([]);


  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategory((prev) =>
      checked ? [...prev, value] : prev.filter((cat) => cat !== value)
    );
  };
  const handleMaterialChange = (e) => {
  const { value, checked } = e.target;
  setSelectedMaterial((prev) =>
    checked ? [...prev, value] : prev.filter((mat) => mat !== value)
  );
};
  const handleConditionChange = (e) => {
  const { value, checked } = e.target;
  setSelectedCondition((prev) =>
    checked ? [...prev, value] : prev.filter((cond) => cond !== value)
  );
};
const brandOptions = ['Cartify', 'EcomZone', 'SmartShop', 'StyleHub'];

const filteredBrandOptions = brandOptions.filter(
  (option) => !selectedBrand.includes(option)
);
// const handleBrandChange = (e) => {
//   const { value, checked } = e.target;
//   setSelectedBrand((prev) =>
//     checked ? [...prev, value] : prev.filter((brand) => brand !== value)
//   );
// };
// const handleBrandChange = (value) => {
//   setSelectedBrand(value);
// };



  const filteredProducts = data.filter((product) => {
    const categoryMatch =
      selectedCategory.length === 0 ||
      selectedCategory.includes(product.category);

    const availabilityMatch =
      availabilityFilter === null || // yəni istifadəçi heç bir checkbox seçməyibsə
      (availabilityFilter === "available" && product.isStock === true) ||
      (availabilityFilter === "not-available" && product.isStock === false);
      
     const materialMatch =
    selectedMaterial.length === 0 || 
    selectedMaterial.includes(product.materialKey);

    const conditionMatch =
    selectedCondition.length === 0 ||
    selectedCondition.includes(product.conditionKey);

    const brandMatch =
  selectedBrand.length === 0 || selectedBrand.includes(product.brand);

    //  const brandMatch =
    // selectedBrand.length === 0 ||
    // selectedBrand.includes(product.brand);
    return categoryMatch && availabilityMatch && materialMatch && conditionMatch && brandMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
  const langKey = currentLang === "az" ? "nameAz" : "nameEn";

  const getDisplay = (product) => {
    if (product.small) return product.smallDisPrice || product.smallPrice;
    if (product.medium) return product.mediumDisPrice || product.mediumPrice;
    if (product.large) return product.largeDisPrice || product.largePrice;
    return 0;
  };

  switch (sortOption) {
    case "1":
      return a[langKey].localeCompare(b[langKey]); // A to Z
    case "2":
      return b[langKey].localeCompare(a[langKey]); // Z to A
    case "3":
      return getDisplay(a) - getDisplay(b); // Price low to high
    case "4":
      return getDisplay(b) - getDisplay(a); // Price high to low
    case "5":
      return b.rating - a.rating; // Rating high to low
    case "6":
      return a.rating - b.rating; // Rating low to high
    default:
      return 0;
  }
});


  // !pagination---------------------
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts =  sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil( sortedProducts.length / productsPerPage);

  // !Select-------------------------
// const OPTIONS = ['Cartify', 'EcomZone', 'SmartShop', 'StyleHub'];
//   const filteredOptions = OPTIONS.filter(o => !selectedBrand.includes(o));


  const [showFilter, setShowFilter] = useState(false);
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
          <p className={pro.catTitle}>Availablity</p>
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
              <p className={pro.filElement}>{t("filter.avail")}</p>
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
              <p className={pro.filElement}>{t("filter.notAvail")}</p>
            </label>
          </div>
        </div>
        <div className={pro.filterInput}>
          <p className={pro.catTitle}>Material</p>
          <div className={pro.inputItem}>
            <label className={pro.labell}>
              <input type="checkbox" value="plastic" onChange={handleMaterialChange}/>
              <p className={pro.filElement}>Plastic</p>
            </label>
            <label className={pro.labell}>
              <input type="checkbox" value="ceramic" onChange={handleMaterialChange} />
              <p className={pro.filElement}>Keramik</p>
            </label>
            <label className={pro.labell}>
              <input type="checkbox" value="metal" onChange={handleMaterialChange} />
              <p className={pro.filElement}>Metal</p>
            </label>
          </div>
        </div>
        <div className={pro.filterInput}>
          <p className={pro.catTitle}>Brand</p>
          <div className={pro.selectItem}>
            {/* <Select
              mode="multiple"
              placeholder="(no filter)"
              value={selectedBrand}
              onChange={handleBrandChange}
              style={{ width: "95%" }}
              suffixIcon={<FaCaretDown color="black" size={16} />}
              className={pro.customSelect}
              options={filteredOptions.map((item) => ({
                value: item,
                label: item,
              }))}
            /> */}
    
              <Select
  mode="multiple"
  placeholder="(no filter)"
  value={selectedBrand}
  onChange={setSelectedBrand}
  style={{ width: "95%" }}
  suffixIcon={<FaCaretDown color="black" size={16} />}
  className={pro.customSelect}
  options={filteredBrandOptions.map((brand) => ({
    value: brand,
    label: brand,
}))}
/>
          </div>
        </div>
        <div className={pro.filterInput}>
          <p className={pro.catTitle}>Condition</p>
          <div className={pro.inputItem}>
            <label className={pro.labell}>
              <input type="checkbox" value="discounted" onChange={handleConditionChange} />
              <p className={pro.filElement}>Discounted</p>
            </label>
            <label className={pro.labell}>
              <input type="checkbox" value="new" onChange={handleConditionChange} />
              <p className={pro.filElement}>New Product</p>
            </label>
            <label className={pro.labell}>
              <input type="checkbox" value="popular" onChange={handleConditionChange}/>
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
              {/* <Select
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
                    label: "Name, A to Z",
                  },
                  {
                    value: "2",
                    label: "Name, Z to A",
                  },
                  {
                    value: "3",
                    label: "Price, low to high",
                  },
                  {
                    value: "4",
                    label: "Price, high to low",
                  },
                  {
                    value: "5",
                    label: "Rating, high to low",
                  },
                  {
                    value: "6",
                    label: "Rating, low to high",
                  },
                ]}
              /> */}
              <Select
  showSearch
  style={{ width: 200 }}
  placeholder="Name, A to Z"
  className={pro.customSelectTwice}
  optionFilterProp="label"
  suffixIcon={<FaCaretDown color="black" size={16} />}
  onChange={(value) => setSortOption(value)}
  options={[
    { value: "1", label: "Name, A to Z" },
    { value: "2", label: "Name, Z to A" },
    { value: "3", label: "Price, low to high" },
    { value: "4", label: "Price, high to low" },
    { value: "5", label: "Rating, high to low" },
    { value: "6", label: "Rating, low to high" },
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
