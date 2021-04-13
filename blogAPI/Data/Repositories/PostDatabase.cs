using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Helpers;
using Data.Interfaces;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using Slugify;


namespace Data.Repositories
{
    public class PostDatabase : IPostRepository
    {

        private readonly IUserAccessor _userAccessor;
        private readonly DataContext _db;

        public PostDatabase(DataContext db, IUserAccessor userAccessor)
        {
            this._db = db;
            _userAccessor = userAccessor;

        }
        // public List<Post> GetPosts()
        // {
        //     return _db.Posts.OrderByDescending(x => x.Date).Include(x => x.Comments).Include(x => x.Tags).ToList();
        // }
        public PagedList<Post> GetPosts(PostParameters postParameters)
        {
            // return _db.Posts.OrderByDescending(x => x.Date).Include(x => x.Comments).Include(x => x.Tags).ToList();

            // return _db.Posts.OrderByDescending(x => x.Date)
            // .Include(x => x.Comments)
            // .Include(x => x.Tags)
            // .Skip((postParameters.PageNumber - 1) * postParameters.pageSize)
            // .Take(postParameters.pageSize)
            // .ToList();
            return PagedList<Post>.ToPagedList(_db.Posts.OrderByDescending(x => x.Date).Include(x => x.Comments).Include(x => x.Tags),
            postParameters.PageNumber, postParameters.PageSize);
        }

        public Post GetPostById(int id)
        {
            return _db.Posts.FirstOrDefault(x => x.Id == id);
        }
        public List<Post> GetPostsByAuthor(string author)
        {
            return _db.Posts.Where(x => x.Author.Contains(author)).OrderByDescending(x => x.Date).Include(x => x.Comments).Include(x => x.Tags).ToList();
        }

        public bool CreatePost(Post post)
        {
            SlugHelper helper = new SlugHelper();
            var user = _db.Users.FirstOrDefault(x => x.UserName == _userAccessor.GetUsername()); // Se till att username är unikt
            
            var storedTags = _db.Tags.ToList();
            var newPostTags = post.Tags;

            List<Tag> tags = new List<Tag>();
            foreach (Tag tag in newPostTags)
            {
                tags.Add(storedTags.FirstOrDefault(x => x.TagName == tag.TagName));
            }

            if (user != null)
            {
                var newPost = new Post
                {
                    AppUser = user,
                    Title = post.Title,
                    Summary = post.Summary,
                    Body = post.Body,
                    Author = user.DisplayName,
                    Date = DateTime.Now,
                    Tags = tags,
                    UrlSlug = helper.GenerateSlug(post.Title)
                };
                _db.Posts.Add(newPost);
                _db.SaveChanges();
                return true;
            }
            return false;
        }

        public Post UpdatePost(int id, Post post)
        {
            var upost = _db.Posts.FirstOrDefault(x => x.Id == id);
            upost.Title = post.Title;
            upost.Summary = post.Summary;
            upost.Body = post.Body;

            _db.SaveChanges();
            return upost;
        }

       public Post AddComment(int id, Post post)
        {
            var upost = _db.Posts.FirstOrDefault(x => x.Id == id);

            _db.SaveChanges();
            return upost;
        }

        public bool DeletePost(int id)
        {
            var post = GetPostById(id);
            if (post == null)
            {
                return false;
            }
            _db.Posts.Remove(post);
            _db.SaveChanges();
            return true;
        }
    }
}
