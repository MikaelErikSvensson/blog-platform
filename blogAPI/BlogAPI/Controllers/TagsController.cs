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
    public class TagsController : ControllerBase
    {
        private readonly ITagRepository _tags;

        public TagsController(ITagRepository tags)
        {
            this._tags = tags;
        }

        [AllowAnonymous]
        [HttpGet]
        public ActionResult<IEnumerable<Tag>> GetAllTags()
        {
            return _tags.GetAllTags();
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult<Tag> NewTag(Tag tag)
        {
 
            if (_tags.AddNewTag(tag))
            {
                return Ok(tag);
            }
            return BadRequest();
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public ActionResult<Tag> GetTagById(int id)
        {
            var tag = _tags.GetTagById(id);
            if (tag == null)
            {
                return NotFound();
            }
            return tag;
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public ActionResult<IEnumerable<Tag>> Delete(int id)
        {
            if (_tags.Remove(id))
            {
                return _tags.GetAllTags();
            }
            return NotFound();
        }
        [AllowAnonymous]
        [HttpGet("search/{searchString}")]
        public ActionResult<IEnumerable<Tag>> SearchTags(string searchString)
        {

            if (!String.IsNullOrEmpty(searchString))
            {
                return _tags.SearchTags(searchString);
            }
            return NotFound();
        }
        }
    }
