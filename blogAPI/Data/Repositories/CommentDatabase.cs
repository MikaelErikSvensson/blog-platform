using System;
using System.Collections.Generic;
using System.Linq;
using Data.Interfaces;
using Data.Models;

namespace Data.Repositories
{
    public class CommentDatabase : ICommentRepository
    {
        private readonly DataContext _db;
        public CommentDatabase(DataContext db)
        {
            this._db = db;
        }

        public bool AddNewComment(Comment comment)
        {
            throw new NotImplementedException();
        }

        public List<Comment> GetAllComments()
        {
            return _db.Comments.OrderByDescending(x => x.Date).ToList();
        }

        public Comment GetCommentById(int id)
        {
            throw new NotImplementedException();
        }

        public List<Comment> GetCommentsByPostId(int id)
        {
            throw new NotImplementedException();
        }

        public List<Comment> GetCommentsByAuthor(string author)
        {
            return _db.Comments.Where(x => x.Author.Contains(author)).OrderByDescending(x => x.Date).ToList();
        }

        public bool Remove(int id)
        {
            throw new NotImplementedException();
        }
    }
}