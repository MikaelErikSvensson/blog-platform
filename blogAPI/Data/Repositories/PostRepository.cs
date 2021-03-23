﻿using Data.Interfaces;
using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repositories
{
    public class PostRepository : IPostRepository
    {
        private DataContext db;

        List<Post> posts = new List<Post>
        {
            new Post
            {
                Id = 1,
                Title = "Example post",
                Summary = "This is an example post",
                Body = "This is just some post. This part should contain all the markup generated by the WYSIWIG editor.",
                Tag = "Programming",
                Date = DateTime.Now
                // Author = new Author
                // {
                //     Id = 1,
                //     Name = "Kristaps",
                //     Description = "Hi, my name is Kristaps"
                // },
                
   
                // Tags = new Tag
                // {
                //     Id = 1,
                //     Name = "Programming",
                // }
            }
        };

        public PostRepository(DataContext _db)
        {
            db = _db;
        }

        public bool AddNewPost(Post post)
        {
            db.Posts.Add(post);
            db.SaveChanges();
            return true;
        }

        public List<Post> EditPost(int id, Post post)
        {
            throw new NotImplementedException();
        }

        public List<Post> GetAllPosts()
        {
            return posts;
        }
        public Post GetPostById(int id)
        {
            return posts.FirstOrDefault(x => x.Id == id);
        }

        public List<Post> GetPostsByAuthor(string Author)
        {
            throw new NotImplementedException();
        }

        public bool Remove(int id)
        {
            throw new NotImplementedException();
        }

        Post IPostRepository.EditPost(int id, Post post)
        {
            throw new NotImplementedException();
        }
    }
}
