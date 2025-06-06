export function getPrices(product, size) {
  if (size === "small") {
    return {
      original: product.smallPrice,
      discount: product.smallDisPrice,
    };
  } else if (size === "medium") {
    return {
      original: product.mediumPrice,
      discount: product.mediumDisPrice,
    };
  } else {
    return {
      original: product.largePrice,
      discount: product.largeDisPrice,
    };
  }
}
