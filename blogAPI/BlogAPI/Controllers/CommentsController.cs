using System.Collections.Generic;
using System.Threading.Tasks;
using Data.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System;

namespace BlogAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {

        private readonly ICommentRepository _comments;

        public CommentsController(ICommentRepository comments)
        {
            this._comments = comments;

        }

        [AllowAnonymous]
        [HttpGet]
        public ActionResult<IEnumerable<Comment>> GetAllComments()
        {
            return _comments.GetAllComments();
        }

        [AllowAnonymous]
        [HttpGet("author/{author}")]
        public ActionResult<IEnumerable<Comment>> GetCommentsByAuthor(string author)
        {
            var acomments = _comments.GetCommentsByAuthor(author);
            if (acomments == null)
            {
                return NotFound();
            }
            return acomments;
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult<Comment> NewComment(Comment comment)
        {

            if (_comments.AddNewComment(comment))
            {
                return Ok(comment);
            }
            return BadRequest();
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public ActionResult<Comment> GetCommentById(int id)
        {
            var comment = _comments.GetCommentById(id);
            if (comment == null)
            {
                return NotFound();
            }
            return comment;
        }
    }
}
