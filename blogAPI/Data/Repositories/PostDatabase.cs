using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

        public bool AddNewPost(Post post)
        {
            SlugHelper helper = new SlugHelper();
            var user = _db.Users.FirstOrDefault(x => x.UserName == _userAccessor.GetUsername());
            
            var storedTags = _db.Tags.ToList();
            var newPostTags = post.Tags;

            List<Tag> tags = new List<Tag>();
            foreach (Tag tag in newPostTags)
            {
                tags.Add(storedTags.FirstOrDefault(x => x.TagName == tag.TagName)); // Loopar över postTags, returnerar första matchen
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

        public Post EditPost(int id, Post post)
        {
            // return _db.Posts.FirstOrDefault(x => x.Id == id);
            var upost = _db.Posts.FirstOrDefault(x => x.Id == id);
            upost.Title = post.Title;
            upost.Summary = post.Summary;
            upost.Body = post.Body;

            _db.SaveChanges();
            return upost;
        }

        public List<Post> GetAllPosts()
        {
            return _db.Posts.OrderByDescending(x => x.Date).Include(x => x.Comments).Include(x => x.Tags).ToList();
        }

        public Post GetPostById(int id)
        {
            return _db.Posts.FirstOrDefault(x => x.Id == id);
        }

        public bool Remove(int id)
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

        public List<Post> GetPostsByAuthor(string author)
        {
            return _db.Posts.Where(x => x.Author.Contains(author)).OrderByDescending(x => x.Id).ToList();
        }
    }
}
