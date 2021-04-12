using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Data.Models
{
    public class Tag
    {
        public int TagId {get; set;}
        public string TagName {get; set;}
        public string UrlSlug {get; set;} 
        [JsonIgnore]
        public ICollection<Post> Posts {get; set;}
    }
}