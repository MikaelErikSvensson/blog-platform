using System.ComponentModel.DataAnnotations;

namespace Data.Models
{
    public class Register
    {
        [Required]
        public string DisplayName {get; set;}
        [Required]
        [EmailAddress]
        public string Email {get; set;}
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password is not complex enough")]
        public string Password {get; set;}
        [Required]
        public string Username {get; set;}
    }
}