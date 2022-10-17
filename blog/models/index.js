const Blogger = require('./signups');
const Blogs = require('./Blogs');

Blogger.hasMany(Blogs,{
    foreignKey:'blogger_id',
    onDelete: 'CASCADE'    
});

Blogs.belongsTo (Blogger, {
    foreignKey: 'blogger_id'
});

module.exports = { Blogger, Blogs };
