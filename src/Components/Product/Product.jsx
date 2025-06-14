import React, { useEffect, useState } from "react";
import pro from "./product.module.css";
import { Select } from "antd";
import logo from "./assets/download (4).svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/features/auth/productSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaCaretDown } from "react-icons/fa";
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
import det from "./assets/download (6).svg";
import basket from "./assets/download (5).svg";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import i18next from "i18next";
import ModalProduct from "../ModalProduct/ModalProduct";
import { addToWishlist } from "../../redux/features/auth/wishlistSlice";

function Product() {
  const { t } = useTranslation();
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
  const [searchParams, setSearchParams] = useSearchParams();
  const brandOptions = ["Cartify", "EcomZone", "SmartShop", "StyleHub"];
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  //   const selectedFilters = [
  //   ...selectedCategory.map((item) => ({ type: "category", value: item })),
  //   ...selectedMaterial.map((item) => ({ type: "material", value: item })),
  //   ...selectedCondition.map((item) => ({ type: "condition", value: item })),
  //   ...(availabilityFilter ? [{ type: "availability", value: availabilityFilter }] : []),
  //   ...selectedBrand.map((item) => ({ type: "brand", value: item })),
  // ];

  // const removeFilter = (filterType, value) => {
  //   switch (filterType) {
  //     case "category":
  //       setSelectedCategory((prev) => prev.filter((item) => item !== value));
  //       break;
  //     case "material":
  //       setSelectedMaterial((prev) => prev.filter((item) => item !== value));
  //       break;
  //     case "condition":
  //       setSelectedCondition((prev) => prev.filter((item) => item !== value));
  //       break;
  //     case "availability":
  //       setAvailablityFilter(null);
  //       break;
  //     case "brand":
  //       setSelectedBrand((prev) => prev.filter((item) => item !== value));
  //       break;
  //   }

  //   // URL-dən də sil
  //   setSearchParams((params) => {
  //     const updated = selectedFilters.filter(
  //       (f) => !(f.type === filterType && f.value === value)
  //     );

  //     const grouped = updated.reduce((acc, f) => {
  //       acc[f.type] = acc[f.type] ? [...acc[f.type], f.value] : [f.value];
  //       return acc;
  //     }, {});

  //     // param-ları yenilə
  //     ["category", "material", "condition", "availability", "brand"].forEach((key) => {
  //       if (grouped[key]) {
  //         params.set(key, grouped[key].join("-"));
  //       } else {
  //         params.delete(key);
  //       }
  //     });

  //     return params;
  //   });
  // };

  // const clearAllFilters = () => {
  //   setSelectedCategory([]);
  //   setSelectedMaterial([]);
  //   setSelectedCondition([]);
  //   setSelectedBrand([]);
  //   setAvailablityFilter(null);
  //   setSearchParams({});
  // };

  // !Filter and url
  // const handleFilterChange = (e, filterType) => {
  //   const { value, checked } = e.target;

  //   if (filterType === "category") {
  //     setSelectedCategory((prev) => {
  //       const updated = checked
  //         ? [...prev, value]
  //         : prev.filter((item) => item !== value);

  //       setSearchParams((params) => {
  //         if (updated.length > 0) {
  //           params.set("category", updated.join("-"));
  //         } else {
  //           params.delete("category");
  //         }
  //         return params;
  //       });

  //       return updated;
  //     });
  //   }

  //   if (filterType === "material") {
  //     setSelectedMaterial((prev) => {
  //       const updated = checked
  //         ? [...prev, value]
  //         : prev.filter((item) => item !== value);

  //       setSearchParams((params) => {
  //         if (updated.length > 0) {
  //           params.set("material", updated.join("-"));
  //         } else {
  //           params.delete("material");
  //         }
  //         return params;
  //       });

  //       return updated;
  //     });
  //   }

  //   // Burada gələcəkdə başqa filterləri də əlavə edə bilərsən
  // };
  // ! state icinde basqa bir state cagrildi kimi problem cixdi evvelki ile muqaise et oyren ferqi
  const handleFilterChange = (e, filterType) => {
    const { value, checked } = e.target;

    let updated = [];

    if (filterType === "category") {
      updated = checked
        ? [...selectedCategory, value]
        : selectedCategory.filter((item) => item !== value);
      setSelectedCategory(updated);
    }

    if (filterType === "material") {
      updated = checked
        ? [...selectedMaterial, value]
        : selectedMaterial.filter((item) => item !== value);
      setSelectedMaterial(updated);
    }
    if (filterType === "condition") {
      updated = checked
        ? [...selectedCondition, value]
        : selectedCondition.filter((item) => item !== value);
      setSelectedCondition(updated);
    }
    if (filterType === "availability") {
      const newValue = availabilityFilter === value ? null : value;
      setAvailablityFilter(newValue);
      updated = newValue ? [newValue] : [];
    }
    if (filterType === "brand") {
      updated = value; // value bir array olacaq (Select-in multiple dəyərləri)
      setSelectedBrand(updated);
    }

    // URL-i yuxarıdakı dəyişikliklərdən sonra güncəllə
    setSearchParams((params) => {
      if (filterType === "category") {
        updated.length > 0
          ? params.set("category", updated.join("-"))
          : params.delete("category");
      }
      if (filterType === "material") {
        updated.length > 0
          ? params.set("material", updated.join("-"))
          : params.delete("material");
      }
      if (filterType === "condition") {
        updated.length > 0
          ? params.set("condition", updated.join("-"))
          : params.delete("condition");
      }
      if (filterType === "availability") {
        updated.length > 0
          ? params.set("availability", updated[0])
          : params.delete("availability");
      }
      if (filterType === "brand") {
        updated.length > 0
          ? params.set("brand", updated.join("-"))
          : params.delete("brand");
      }
      return params;
    });
  };

  useEffect(() => {
    const categoryFromURL = searchParams.get("category");
    const materialFromURL = searchParams.get("material");
    const conditionFromURL = searchParams.get("condition");
    const availabilityFromURL = searchParams.get("availability");
    const brandFromURL = searchParams.get("brand");
    const sortFromURL = searchParams.get("sort");

    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL.split("-"));
    }

    if (materialFromURL) {
      setSelectedMaterial(materialFromURL.split("-"));
    }
    if (conditionFromURL) {
      setSelectedCondition(conditionFromURL.split("-"));
    }
    if (availabilityFromURL) {
      setAvailablityFilter(availabilityFromURL); // yeni hissə
    }
    if (brandFromURL) {
      setSelectedBrand(brandFromURL.split("-"));
    }
    if (sortFromURL) setSortOption(sortFromURL);
  }, []);
  const handleBrandChange = (value) => {
    handleFilterChange({ target: { value, checked: null } }, "brand");
  };
  const handleSortChange = (value) => {
    setSortOption(value);

    // URL-ə sort-u əlavə et
    setSearchParams((params) => {
      if (value) {
        params.set("sort", value);
      } else {
        params.delete("sort");
      }
      return params;
    });
  };

  const wishlist = useSelector((state) => state.wishlist.items);
  const bask = useSelector((state) => state.basket.items);

  // !filterMath------------
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
    return (
      categoryMatch &&
      availabilityMatch &&
      materialMatch &&
      conditionMatch &&
      brandMatch
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const langKey = currentLang === "az" ? "nameAz" : "nameEn";

    const getDisplay = (product) => {
      if (product.small) return product.smallDisPrice || product.smallPrice;
      if (product.medium) return product.mediumDisPrice || product.mediumPrice;
      if (product.large) return product.largeDisPrice || product.largePrice;
      return 0;
    };

    // ! Sort---------------------
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
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // !Select-------------------------
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
      price: "not avail",
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
                checked={selectedCategory.includes("dicotyledons")}
                onChange={(e) => handleFilterChange(e, "category")}
              />
              <p className={pro.filElement}> Dicotyledons (18)</p>
            </label>
            <label className={pro.labell}>
              <input
                type="checkbox"
                value="lilies"
                checked={selectedCategory.includes("lilies")}
                onChange={(e) => handleFilterChange(e, "category")}
              />
              <p className={pro.filElement}> Lilies (18)</p>
            </label>
            <label className={pro.labell}>
              <input
                type="checkbox"
                value="monocotyledons"
                checked={selectedCategory.includes("monocotyledons")}
                onChange={(e) => handleFilterChange(e, "category")}
              />
              <p className={pro.filElement}>Monocotyledons (20)</p>
            </label>
            <label className={pro.labell}>
              <input
                type="checkbox"
                value="sugarcanes"
                onChange={(e) => handleFilterChange(e, "category")}
                checked={selectedCategory.includes("sugarcanes")}
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
                value="available"
                name="availablity"
                checked={availabilityFilter === "available"}
                onChange={(e) => handleFilterChange(e, "availability")}
              />
              <p className={pro.filElement}>{t("filter.avail")}</p>
            </label>
            <label className={pro.labell}>
              <input
                type="checkbox"
                name="availablity"
                value="not-available"
                checked={availabilityFilter === "not-available"}
                onChange={(e) => handleFilterChange(e, "availability")}
              />
              <p className={pro.filElement}>{t("filter.notAvail")}</p>
            </label>
          </div>
        </div>
        <div className={pro.filterInput}>
          <p className={pro.catTitle}>Material</p>
          <div className={pro.inputItem}>
            <label className={pro.labell}>
              <input
                type="checkbox"
                value="plastic"
                checked={selectedMaterial.includes("plastic")}
                onChange={(e) => handleFilterChange(e, "material")}
              />
              <p className={pro.filElement}>Plastic</p>
            </label>
            <label className={pro.labell}>
              <input
                type="checkbox"
                value="ceramic"
                checked={selectedMaterial.includes("ceramic")}
                onChange={(e) => handleFilterChange(e, "material")}
              />
              <p className={pro.filElement}>Keramik</p>
            </label>
            <label className={pro.labell}>
              <input
                type="checkbox"
                value="metal"
                checked={selectedMaterial.includes("metal")}
                onChange={(e) => handleFilterChange(e, "material")}
              />
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
              value={selectedBrand}
              onChange={handleBrandChange}
              // onChange={(value) => setSelectedBrand(value)}
              style={{ width: "95%" }}
              suffixIcon={<FaCaretDown color="black" size={16} />}
              className={pro.customSelect}
              options={brandOptions.map((brand) => ({
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
              <input
                type="checkbox"
                value="discounted"
                checked={selectedCondition.includes("discounted")}
                onChange={(e) => handleFilterChange(e, "condition")}
              />
              <p className={pro.filElement}>Discounted</p>
            </label>
            <label className={pro.labell}>
              <input
                type="checkbox"
                value="new"
                checked={selectedCondition.includes("new")}
                onChange={(e) => handleFilterChange(e, "condition")}
              />
              <p className={pro.filElement}>New Product</p>
            </label>
            <label className={pro.labell}>
              <input
                type="checkbox"
                value="popular"
                checked={selectedCondition.includes("popular")}
                onChange={(e) => handleFilterChange(e, "condition")}
              />
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
                value={sortOption}
                style={{ width: 200 }}
                placeholder="Name, A to Z"
                className={pro.customSelectTwice}
                optionFilterProp="label"
                suffixIcon={<FaCaretDown color="black" size={16} />}
                // onChange={(value) => setSortOption(value)}
                onChange={handleSortChange}
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
              <div
                key={product.id}
                className={`${pro.proCard} ${
                  !product.isStock ? pro.outOfStock : ""
                }`}
              >
                {!product.isStock && (
                  <>
                    <div className={pro.stockOverlay}></div>
                    <div className={pro.comingSoon}>Coming Soon...</div>
                  </>
                )}

                {product.isStock && (
                  <div className={pro.cardOverlay}>
                    <div
                      className={`${pro.overIcon} ${
                        wishlist.some((item) => item.id === product.id)
                          ? pro.active
                          : ""
                      }`}
                      onClick={() => dispatch(addToWishlist(product))}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <div
                      className={pro.overIcon}
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsModalOpen(true);
                      }}
                    >
                      <img src={basket} className={pro.overImg} alt="Basket" />
                    </div>
                    <div
                      className={pro.overIcon}
                      onClick={() =>
                        navigate(`/${currentLang}/shop/${product.id}`)
                      }
                    >
                      <img src={det} className={pro.overImg} alt="Detail" />
                    </div>
                  </div>
                )}
                <ModalProduct
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  // product={product}
                  product={selectedProduct}
                />
                <div className={pro.cardImg}>
                  <img
                    src={product.img}
                    alt={product.nameEn}
                    className={`${pro.images} ${pro.mainImg}`}
                  />
                  <img
                    src={product.thumnailImg}
                    alt={product.nameEn}
                    className={`${pro.images} ${pro.hoverImg}`}
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
