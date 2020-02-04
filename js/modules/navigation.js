Navigation = {

  getActiveCategory: function() {
    return Cookie.read('activecategory');
  },

  setActiveCategory: function(name) {
    Cookie.write('activecategory', name);
    Party.sendEvent('activecategoryset');
  },

  clearActiveCategory: function() {
    Cookie.delete('activecategory');
  },

  init: function(pageData) {

    // determine if the active category should be set
    if (pageData.layout === "tag" && pageData.tag.length > 0) {
      Navigation.setActiveCategory(pageData.tag);
    }

    // delete the stored active category when you land on the homepage
    if (pageData.layout === "default") {
      Navigation.clearActiveCategory();
    }

    // if you've navigated straight to a post, without going through a category
    // choose the first tag in the list
    if (pageData.layout === "post" && !pageData.tag.length) {

      if (pageData.postData.hasOwnProperty('tags') && pageData.postData.tags.length) {
        Navigation.setActiveCategory(pageData.postData.tags[0]);
      }
    }

    Party.sendEvent('navigationready');
  }
};
