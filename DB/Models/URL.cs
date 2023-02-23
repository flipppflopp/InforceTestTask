using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB.Models
{
    public class URL
    {
        [Key]
        public int ID { get; set; }

        public string DefaultURL { get; set; }

        public string ShourtedURL { get; set; }

        public int CreatorID { get; set; }
    }
}
