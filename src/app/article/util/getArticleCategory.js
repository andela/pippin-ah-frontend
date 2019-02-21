const getArticleCategory = () => {
  const category = window.location.href.split('/')[4];
  const titleCasedCategory = category
    ? category.replace(/^[a-z]/, x => x.toUpperCase())
    : '';
  return titleCasedCategory;
};

export default getArticleCategory;
