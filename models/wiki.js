const marked = require('marked')
const toc = require('markdown-toc');
const Wiki = require('../lib/mongo').Wiki

function remove_title(text){
  exceptFirstLine = text.split('\n').slice(1);
  return exceptFirstLine.join("\n");
}

function ignoreLatex(text){
  return text.replace(/(\${2}[^\$]+\${2})/g, function(a){return `<div>${a}</div>`});
}

function addTableContainer(text){
  return text.replace(/(<table[^>]*>(?:.|\n)*?<\/table>)/g, function(a){return `<div class="tableContainer">${a}</div>`});
}

// 将 post 的 content 从 markdown 转换成 html
Wiki.plugin('contentToHtml', {
  afterFind: function (posts) {
    return posts.map(function (post) {
      if (post.isblog){
        // result = toc(post.content, {firsth1: false, bullets: "-"}).content;
        var result = toc(post.content, {
          linkify: function(tok, text, slug) {
            // update tok.content to how you want it
            tok.content = `[${text}](/note/${post._id}/#${slug})`;
            // tok.content = `${text}`;
            return tok;
          },
          firsth1: false,
          bullets: ['1.', '1.', '-']
        });
        str = result.content;
        // str = remove_link_from_md(result);
        post.content = str;
      }
      post.content = addTableContainer(marked(ignoreLatex(post.content)));
      return post
    })
  },
  afterFindOne: function (post) {
    if (post) {
      if (post.isblog){
        post.content = remove_title(post.content);
      }
      post.content = addTableContainer(marked(ignoreLatex(post.content)));
    }
    return post
  }
})

module.exports = {
  // 创建一篇文章
  create: function create (post) {
    return Wiki.create(post).exec()
  },

  // 通过文章 id 获取一篇文章
  getPostById: function getPostById (postId) {
    return Wiki
      .findOne({ _id: postId })
      .populate({ path: 'author', model: 'User' })
      .addCreatedAt()
      .contentToHtml()
      .exec()
  },

  // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
  getPosts: function getPosts (author) {
    const query = {}
    if (author) {
      query.author = author
    }
    query.archive = false;
    return Wiki
      .find(query)
      .populate({ path: 'author', model: 'User' })
      .sort({ top: -1, mydate: -1, _id: -1 })
      .addCreatedAt()
      .contentToHtml()
      .exec()
  },

  // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
  getArchivedPosts: function getArchivedPosts (author) {
    const query = {}
    if (author) {
      query.author = author
    }
    query.archive = true;
    return Wiki
      .find(query)
      .populate({ path: 'author', model: 'User' })
      .sort({ top: -1, mydate: -1, _id: -1 })
      .addCreatedAt()
      .contentToHtml()
      .exec()
  },

  getAllPosts: function getAllPosts (author) {
    const query = {}
    if (author) {
      query.author = author
    }
    return Wiki
      .find(query)
      .populate({ path: 'author', model: 'User' })
      .sort({ top: -1, mydate: -1, _id: -1 })
      .addCreatedAt()
      .contentToHtml()
      .exec()
  },

  getNoneHiddenPosts: function getNoneHiddenPosts (author) {
    const query = {}
    if (author) {
      query.author = author
    }
    query.hide = false;
    return Wiki
      .find(query)
      .populate({ path: 'author', model: 'User' })
      .sort({ top: -1, mydate: -1, _id: -1 })
      .addCreatedAt()
      .contentToHtml()
      .exec()
  },

  // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
  getRawPosts: function getRawPosts (author) {
    const query = {}
    if (author) {
      query.author = author
    }
    return Wiki
      .find(query)
      .populate({ path: 'author', model: 'User' })
      .sort({ top: -1, mydate: -1, _id: -1 })
      .addCreatedAt()
      .exec()
  },

  // get post by tag
  getPostsByTag: function getPostsByTag (author, tag) {
    const query = {}
    if (author) {
      query.author = author;
    }
    if (tag) {
      query.tag = tag;
    }
    query.archive = false;
    console.log(query);
    return Wiki
      .find(query)
      .populate({ path: 'author', model: 'User' })
      .sort({ top: -1, mydate: -1, _id: -1 })
      .addCreatedAt()
      .contentToHtml()
      .exec()
  },

  // get post by tag
  getAllPostsByTag: function getAllPostsByTag (author, tag) {
    const query = {}
    if (author) {
      query.author = author;
    }
    if (tag) {
      query.tag = tag;
    }
    console.log(query);
    return Wiki
      .find(query)
      .populate({ path: 'author', model: 'User' })
      .sort({ top: -1, mydate: -1, _id: -1 })
      .addCreatedAt()
      .contentToHtml()
      .exec()
  },

  // get post by tag
  getArchivedPostsByTag: function getArchivedPostsByTag (author, tag) {
    const query = {}
    if (author) {
      query.author = author;
    }
    if (tag) {
      query.tag = tag;
    }
    query.archive = true;
    console.log(query);
    return Wiki
      .find(query)
      .populate({ path: 'author', model: 'User' })
      .sort({ top: -1, mydate: -1, _id: -1 })
      .addCreatedAt()
      .contentToHtml()
      .exec()
  },

  getNoneHiddenPostsByTag: function getNoneHiddenPostsByTag (author, tag) {
    const query = {}
    if (author) {
      query.author = author;
    }
    if (tag) {
      query.tag = tag;
    }
    query.hide = false;
    return Wiki
      .find(query)
      .populate({ path: 'author', model: 'User' })
      .sort({ top: -1, mydate: -1, _id: -1 })
      .addCreatedAt()
      .contentToHtml()
      .exec()
  },
  getRawPostsByTag: function getRawPostsByTag (author, tag) {
    const query = {}
    if (author) {
      query.author = author;
    }
    if (tag) {
      query.tag = tag;
    }
    console.log(query);
    return Wiki
      .find(query)
      .populate({ path: 'author', model: 'User' })
      .sort({ top: -1, mydate: -1, _id: -1 })
      .addCreatedAt()
      .exec()
  },

  // 通过文章 id 获取一篇原生文章（编辑文章）
  getRawPostById: function getRawPostById (postId) {
    return Wiki
      .findOne({ _id: postId })
      .populate({ path: 'author', model: 'User' })
      .exec()
  },

  // 通过文章 id 更新一篇文章
  updatePostById: function updatePostById (postId, data) {
    return Wiki.update({ _id: postId }, { $set: data }).exec()
  },

  // 通过文章 id 删除一篇文章
  delPostById: function delPostById (postId) {
    return Wiki.deleteOne({ _id: postId })
      .exec()
  },

  getAllTags: function getAllTags (postId) {
    return Wiki.distinct('tag')
      .exec()
  },
}
