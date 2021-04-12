using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Data.Models
{
    public class Comment
    {
        public int CommentId {get; set;}
        public string Author {get; set;}
        public string Body {get; set;}
        public DateTime Date { get; set; }
        [JsonIgnore]
        public ICollection<Post> Posts {get; set;}

    }
}