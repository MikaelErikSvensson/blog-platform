using System.Collections.Generic;
using Data.Models;

namespace Data.Interfaces
{
    public interface ICommentRepository
    {
        List<Comment> GetAllComments();
        List<Comment> GetCommentsByAuthor(string author);
        List<Comment> GetCommentsByPostId(int id);
        bool AddNewComment(Comment comment);
        bool Remove(int id); 
        Comment GetCommentById(int id);
    }
}