const getArticleCategory = () => {
  const category = window.location.pathname.split('/')[2];
  const titleCasedCategory = category
    ? category.replace(/^[a-z]/, x => x.toUpperCase())
    : '';
  return titleCasedCategory;
};

export default getArticleCategory;
