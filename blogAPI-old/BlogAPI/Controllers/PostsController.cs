using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Models;
using Data.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using BlogAPI.Services;

namespace BlogAPI.Controllers
{
    public class PostsController : BaseApiController
    {
        private IPostRepository posts;
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;

        public PostsController(IPostRepository _posts, UserManager<AppUser> userManager, TokenService tokenService)
        {
            this._tokenService = tokenService;
            this._userManager = userManager;
            this.posts = _posts;
        }

        // GET api/posts
        [AllowAnonymous]
        [HttpGet]
        public ActionResult<IEnumerable<Post>> GetAllPosts()
        {
            return posts.GetAllPosts();
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public ActionResult<Post> GetPostById(int id)
        {
            // var book = books.FirstOrDefault(book => book.Id == id); // Lambda expression likt JavaScript. Söker fram book.Id för get metodens input id
            var post = posts.GetPostById(id);
            if (post == null)
            {
                return NotFound();
            }
            return post;
        }

        [AllowAnonymous]
        [HttpGet("author/{author}")]
        public ActionResult<IEnumerable<Post>> GetPostsByAuthor(string author)
        {
            var aposts = posts.GetPostsByAuthor(author);
            if (aposts == null)
            {
                return NotFound();
            }
            return aposts;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<Post>> NewPost(Post post)
        {
            if (posts.AddNewPost(post))
            {
                var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

                if (user != null) 
                {
                  var postWithAuthor = new Post
                    {
                        Title = post.Title,
                        Summary = post.Summary,
                        Body = post.Body,
                        Author = user.DisplayName,
                        Date = DateTime.Now,
                        Tag = post.Tag
                    };
                return postWithAuthor;
                }    
            }
            return BadRequest();
        }
        // PUT api/posts/5
        // [Authorize]
        // [HttpPut("{id}")]
        // public ActionResult<Post> EditPost(int id, Post post)
        // {
        //     var upost = posts.EditPost(id, post);
        //     if (upost == null)
        //     {
        //         return NotFound();
        //     }
        //     return upost;
        // }

        // PUT api/posts/5
        [Authorize]
        [HttpPut("{id}")]
        public ActionResult<Post> EditPost(int id, Post post)
        {
            var upost = posts.EditPost(id, post);
            if (upost == null)
            {
                return NotFound();
            }
            return upost;
        }

        // DELETE api/posts/5
        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult<IEnumerable<Post>> Delete(int id)
        {
            if (posts.Remove(id))
            {
                return posts.GetAllPosts();
            }
            return NotFound();
        }
    }
}
