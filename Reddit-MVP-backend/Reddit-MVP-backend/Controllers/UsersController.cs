using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reddit_MVP_backend.Data;

namespace Reddit_MVP_backend.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetUserProfile(string username)
        {
            var normalizedUsername = username.Trim().ToLower();

            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var user = await _context.Users
                .Where(user => user.UserName != null && user.UserName.ToLower() == normalizedUsername)
                .Select(user => new
                {
                    user.Id,
                    username = user.UserName,
                    email = currentUserId == user.Id ? user.Email : null,
                    user.CreatedAt,
                    postsCount = user.Posts.Count,
                    commentsCount = user.Comments.Count,
                    karma = user.Posts
                        .SelectMany(post => post.Votes)
                        .Sum(vote => vote.Value)
                })
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound(new {message = "User not found"});
            }

            return Ok(user);
        }

        [HttpGet("{username}/posts")]
        public async Task<IActionResult> GetUserPosts(string username)
        {
            var normalizedUsername = username.Trim().ToLower();

            var userExists = await _context.Users
                .AnyAsync(user => user.UserName != null && user.UserName.ToLower() == normalizedUsername);

            if (!userExists)
            {
                return NotFound(new { message = "User not found" });
            }

            var posts = await _context.Posts
                .Include(post => post.Author)
                .Include(post => post.Community)
                .Include(post => post.Votes)
                .Include(post => post.Comments)
                .Where(post => post.Author.UserName != null && post.Author.UserName.ToLower() == normalizedUsername)
                .OrderByDescending(post => post.CreatedAt)
                .Select(post => new
                {
                    post.Id,
                    post.Title,
                    post.Content,
                    post.ImageUrl,
                    post.CreatedAt,
                    post.UpdatedAt,
                    authorUsername = post.Author.UserName,
                    communityId = post.CommunityId,
                    communityName = post.Community.Name,
                    voteScore = post.Votes.Sum(vote => vote.Value),
                    commentsCount = post.Comments.Count
                })
                .ToListAsync();

            return Ok(posts);
        }
    }
}
