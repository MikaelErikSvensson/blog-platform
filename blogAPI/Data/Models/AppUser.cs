using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Data.Models
{
    public class AppUser :IdentityUser
    {        
        public string DisplayName {get; set;}
        // public ICollection<PostAuthor> Posts {get; set;}
    }
}