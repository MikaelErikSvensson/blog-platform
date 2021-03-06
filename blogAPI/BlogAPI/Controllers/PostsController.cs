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
using Newtonsoft.Json;

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

        [AllowAnonymous]
        [HttpGet]
        public ActionResult<IEnumerable<Post>> GetPosts([FromQuery] PostParameters postParameters)
        {
            var posts = _posts.GetPosts(postParameters);

            var metadata = new
            {
                posts.TotalCount,
                posts.PageSize,
                posts.CurrentPage,
                posts.hasNext,
                posts.hasPrevious
            };

            Response.Headers.Add("Pagination", JsonConvert.SerializeObject(metadata));


            return Ok(posts);
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
        public async Task<ActionResult<Post>> CreatePost(Post post)
        {
            SlugHelper helper = new SlugHelper();
            if (_posts.CreatePost(post))
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
        public ActionResult<Post> UpdatePost(int id, Post post)
        {
            var upost = _posts.UpdatePost(id, post);
            if (upost == null)
            {
                return NotFound();
            }
            return upost;
        }
        [Authorize]
        [HttpPut("comment/{id}")]
        public ActionResult<Post> AddComment(int id, Post post)
        {
            var upost = _posts.AddComment(id, post);
            if (upost == null)
            {
                return NotFound();
            }
            return upost;
        }

        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult<IEnumerable<Post>> DeletePost(int id)
        {
            if (_posts.DeletePost(id))
            {
                return Ok();
            }
            return NotFound();
        }
    }
}
