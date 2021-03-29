using System.Collections.Generic;

namespace Data.Models
{
    public class Tag
    {
        public int TagId {get; set;}
        public string Name {get; set;}
        public string UrlSlug {get; set;} 
        public IList<Post> Posts {get; set;}
    }
}