using Data.Helpers;
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
        // List<Post> GetPosts();
        PagedList<Post> GetPosts(PostParameters postParameters);

        List<Post> GetPostsByAuthor(string author);
        Post GetPostById(int id);
        bool CreatePost(Post post);
        bool DeletePost(int id);
        Post UpdatePost(int id, Post post);
        Post AddComment(int id, Post post);

    }
}
