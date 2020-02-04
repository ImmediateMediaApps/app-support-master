var breadcrumb = new Vue({
  el: '.breadcrumb',
  data: function() {
    return {
      categoryLink: '',
      categoryText: '',
      postTitle: '',
      isSearchPage: false,
    }
  },
  methods: {
    handleNavigationData: function() {

      // grab the category text because we presume it's a tag page
      var activeCategory = Navigation.getActiveCategory();
      this.categoryText = window.tags[activeCategory];

      // when on a post page, include a link back to the category
      if (window.page.layout === 'post') {
        this.categoryLink = window.site.baseurl + '/' + activeCategory;
      }

      // search page
      if ((window.page.url === "/search-results.html") ||
          (window.page.url === "/search.html")){
        this.isSearchPage = true;
      }
    }
  },
  created: function() {

    Party.bindEvent('navigationready', this.handleNavigationData.bind(this));
  },
  delimiters: ["((", "))"],
});
