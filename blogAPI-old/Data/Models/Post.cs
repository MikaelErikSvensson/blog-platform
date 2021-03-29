using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Body { get; set; }
        public string Tag {get; set;}
        public string Author {get; set;}
        public DateTime Date { get; set; }
        public AppUser AppUser {get; set;}
        // public Category Category {get; set;}
        // public ICollection<PostAuthor> Author {get; set;}
    }
}
