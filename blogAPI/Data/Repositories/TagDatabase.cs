using System;
using System.Collections.Generic;
using System.Linq;
using Data.Interfaces;
using Data.Models;

namespace Data.Repositories
{
    public class TagDatabase : ITagRepository
    {
        private readonly DataContext _db;
        public TagDatabase(DataContext db)
        {
            this._db = db;
        }
        public bool AddNewTag(Tag tag)
        {
            _db.Tags.Add(tag);
            _db.SaveChanges();
            return true;
        }

        public List<Tag> GetAllTags()
        {
            return _db.Tags.ToList();
        }

         public bool Remove(int id)
        {
            var tag = GetTagById(id);
            if (tag == null)
            {
                return false;
            }
            _db.Tags.Remove(tag);
            _db.SaveChanges();
            return true;
        }

        public Tag GetTagById(int id)
        {
            return _db.Tags.FirstOrDefault(x => x.TagId == id);
        }

        public List<Tag> SearchTags(string searchString)
        {
            var allTags = _db.Tags.ToList();
            var tagQuery = from x in allTags // skapar en LINQ query för att välja taggar. Queryn defineras, men körs inte mot databas än.
                    select x;
            
            tagQuery = tagQuery.Where(x => x.TagName.Contains(searchString)); // välj tag i taggar som innehåller söksträng
            if (tagQuery == null)
            {
                return null;
            }
            
            return tagQuery.ToList();
        }
    }
}