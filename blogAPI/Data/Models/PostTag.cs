namespace Data.Models
{
    public class PostTag
    {
        public int Id {get; set;}
        public Post Posts {get; set;}
        public int TagId {get; set;}
        public Tag Tags {get; set;}
    }
}