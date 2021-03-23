using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces
{
    public interface IPostRepository
    {
        List<Post> GetAllPosts();
        List<Post> GetPostsByAuthor(string author);
        Post GetPostById(int id);
        bool AddNewPost(Post post);
        bool Remove(int id);
        Post EditPost(int id, Post post);

    }
}
