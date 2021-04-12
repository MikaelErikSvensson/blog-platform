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
using Slugify;

namespace BlogAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private IPostRepository _posts;
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;

        public PostsController(IPostRepository posts, UserManager<AppUser> userManager, TokenService tokenService)
        {
            this._tokenService = tokenService;
            this._userManager = userManager;
            this._posts = posts;
        }

        // GET api/posts
        [AllowAnonymous]
        [HttpGet]
        public ActionResult<IEnumerable<Post>> GetAllPosts()
        {
            return _posts.GetAllPosts();
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public ActionResult<Post> GetPostById(int id)
        {
            var post = _posts.GetPostById(id);
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
            var aposts = _posts.GetPostsByAuthor(author);
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
            SlugHelper helper = new SlugHelper();
            if (_posts.AddNewPost(post))
            {
                var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

                if (user != null) 
                {
                  var newPost = new Post
                    {
                        Title = post.Title,
                        Summary = post.Summary,
                        Body = post.Body,
                        Author = user.DisplayName,
                        Date = DateTime.Now,
                        Tags = post.Tags,
                        UrlSlug = helper.GenerateSlug(post.Title),
                        Comments = post.Comments
                    };
                return newPost;
                }    
            }
            return BadRequest();
        }

        [Authorize]
        [HttpPut("{id}")]
        public ActionResult<Post> EditPost(int id, Post post)
        {
            var upost = _posts.EditPost(id, post);
            if (upost == null)
            {
                return NotFound();
            }
            return upost;
        }

        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult<IEnumerable<Post>> Delete(int id)
        {
            if (_posts.Remove(id))
            {
                return _posts.GetAllPosts();
            }
            return NotFound();
        }
    }
}
