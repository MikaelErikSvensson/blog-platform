using System;

namespace Data.Models
{
    public class Comment
    {
        public int CommentId {get; set;}
        public string Name {get; set;}
        public string Body {get; set;}
        public DateTime Date { get; set; }
        public Post Post {get; set;}

    }
}