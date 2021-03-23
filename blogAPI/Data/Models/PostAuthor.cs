namespace Data.Models
{
    public class PostAuthor
    {
        public string AppUserId {get; set;}
        public AppUser AppUser {get; set;}
        public int PostId {get; set;}
        public Post Post {get; set;}
    }
}