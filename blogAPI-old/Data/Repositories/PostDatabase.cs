using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Data.Interfaces;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories
{
    public class PostDatabase : IPostRepository
    {
        private DataContext db;
        private readonly IUserAccessor _userAccessor;

        public PostDatabase(DataContext _db, IUserAccessor userAccessor)
        {
            _userAccessor = userAccessor;
            db = _db;
        }

        public bool AddNewPost(Post post)
        {
            var user = db.Users.FirstOrDefault(x => x.UserName == _userAccessor.GetUsername());

            if (user != null) 
            {
                var postWithAuthor = new Post
                {
                    AppUser = user,
                    Title = post.Title,
                    Summary = post.Summary,
                    Body = post.Body,
                    Author = user.DisplayName,
                    Date = DateTime.Now,
                    Tag = post.Tag
                };
                db.Posts.Add(postWithAuthor);
                db.SaveChanges();
                return true;
            }
            return false;
        }

        // public Post EditPost(int id, Post post)
        // {
        //     if (this.Remove(id))
        //     {
        //         this.AddNewPost(post);
        //         db.SaveChanges();
        //         return db.Posts.FirstOrDefault(x => x.Id == id);
        //     }
        //     else return null;
        // }

            public Post EditPost(int id, Post post)
        {
            // return db.Posts.FirstOrDefault(x => x.Id == id);
            var upost = db.Posts.FirstOrDefault(x => x.Id == id);
            upost.Title = post.Title;
            upost.Summary = post.Summary;
            upost.Body = post.Body;

            db.SaveChanges();
            return upost;
        }

        public List<Post> GetAllPosts()
        {
            //return db.Posts.OrderByDescending(x => x.Id).ToList();
             return db.Posts.OrderByDescending(x => x.Id).ToList();
        }

        public Post GetPostById(int id)
        {
            return db.Posts.FirstOrDefault(x => x.Id == id);
        }

        public bool Remove(int id)
        {
            var post = GetPostById(id);
            if (post == null)
            {
                return false;
            }
            db.Posts.Remove(post);
            db.SaveChanges();
            return true;
        }

        public List<Post> GetPostsByAuthor(string author)
        {
            return db.Posts.Where(x => x.Author.Contains(author)).OrderByDescending(x => x.Id).ToList();
        }
    }
}
