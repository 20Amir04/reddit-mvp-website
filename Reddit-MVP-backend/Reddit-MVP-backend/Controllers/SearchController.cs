using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reddit_MVP_backend.Data;


namespace Reddit_MVP_backend.Controllers
{
    [ApiController]
    [Route("api/search")]
    public class SearchController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SearchController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] string query, [FromQuery] string type = "all")
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return BadRequest(new { message = "Search query is required." });
            }

            var normalizedQuery = query.Trim().ToLower();
            var normalizedType = type.Trim().ToLower();

            if (normalizedType != "all" && normalizedType != "posts" && normalizedType != "communities")
            {
                return BadRequest(new { message = "Invalid search type" });
            }

            var posts = new List<object>();
            var communities = new List<object>();

            if (normalizedType == "all" || normalizedType == "posts")
            {
                posts = await _context.Posts
                    .Include(post => post.Author)
                    .Include(post => post.Community)
                    .Include(post => post.Votes)
                    .Include(post => post.Comments)
                    .Where(post =>
                        post.Title.ToLower().Contains(normalizedQuery) ||
                        post.Content.ToLower().Contains(normalizedQuery))
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
                    .Cast<object>()
                    .ToListAsync();
            }

            if (normalizedType == "all" || normalizedType == "communities")
            {
                communities = await _context.Communities
                    .Include(community => community.Creator)
                    .Include(community => community.Members)
                    .Where(community =>
                        community.Name.ToLower().Contains(normalizedQuery) ||
                        community.Description.ToLower().Contains(normalizedQuery))
                    .OrderByDescending(community => community.CreatedAt)
                    .Select(community => new
                    {
                        community.Id,
                        community.Name,
                        community.Description,
                        community.BannerImageUrl,
                        community.CreatedAt,
                        creatorUsername = community.Creator.UserName,
                        membersCount = community.Members.Count
                    })
                    .Cast<object>()
                    .ToListAsync();
            }

            return Ok(new
            {
                query = normalizedQuery,
                type = normalizedType,
                posts,
                communities
            });
        }
    }
}
