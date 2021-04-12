using System.Collections.Generic;
using Data.Models;

namespace Data.Interfaces
{
    public interface ITagRepository
    {
        List<Tag> GetAllTags();
        bool AddNewTag(Tag tag);
        bool Remove(int id); 
        Tag GetTagById(int id);
        List<Tag> SearchTags(string searchString);


    }
}