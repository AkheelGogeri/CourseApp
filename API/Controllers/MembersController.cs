using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]     //localhost:5002/api/
    public class MembersController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppUsers>>> GetMembers()
        {
            var members = await context.Users.ToListAsync();

            return members;
        }
        [HttpGet("{id}")]       //localhost:5002/api/members/bob-id
        public async Task<ActionResult<AppUsers>> GetMember(string id)
        {
            var member =await context.Users.FindAsync(id);

            if (member == null) return NotFound();

            return member;
        }
    }
}