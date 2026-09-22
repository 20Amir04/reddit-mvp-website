using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reddit_MVP_backend.Data;
using Reddit_MVP_backend.DTOs;
using Reddit_MVP_backend.Models;

namespace Reddit_MVP_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommunitiesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CommunitiesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCommunities()
        {
            var communities = await _context.Communities
                .Include(community => community.Creator)
                .Include(community => community.Members)
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
                .ToListAsync();

            return Ok(communities);
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetCommunityByName(string name)
        {
            var community = await _context.Communities
                .Include(community => community.Creator)
                .Include(community => community.Members)
                .Where(community => community.Name == name.ToLower())
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
                .FirstOrDefaultAsync();

            if (community == null)
            {
                return NotFound(new { message = "Community not found" });
            }

            return Ok(community);
        }

        [HttpGet("{name}/posts")]
        public async Task<IActionResult> GetCommunityPosts(string name)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var normalizedName = name.Trim().ToLower();

            var communityExists = await _context.Communities
                .AnyAsync(community => community.Name == normalizedName);

            if (!communityExists)
            {
                return NotFound(new { message = "Community not found" });
            }

            var posts = await _context.Posts
                .Include(post => post.Author)
                .Include(post => post.Community)
                .Include(post => post.Comments)
                .Include(post => post.SavedByUsers)
                .Where(post => post.Community.Name == normalizedName)
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
                    voteScore = 0,
                    commentsCount = post.Comments.Count,
                    isSaved = !string.IsNullOrWhiteSpace(userId) && post.SavedByUsers.Any(savedPost => savedPost.UserId == userId)
                })
                .ToListAsync();

            return Ok(posts);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateCommunity(CreateCommunityDto createCommunityDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                return Unauthorized(new { message = "Invalid Token" });
            }

            var normalizedName = createCommunityDto.Name.Trim().ToLower();

            if (string.IsNullOrWhiteSpace(normalizedName))
            {
                return BadRequest(new { message = "Community name is required" });
            }

            if (normalizedName.Length < 3 || normalizedName.Length > 50)
            {
                return BadRequest(new { message = "Community name must be between 3 and 50 characters" });
            }

            if (string.IsNullOrWhiteSpace(createCommunityDto.Description))
            {
                return BadRequest(new { message = "Community description is required" });
            }

            var nameExists = await _context.Communities
                .AnyAsync(community => community.Name ==  normalizedName);

            if (nameExists)
            {
                return BadRequest(new { message = "Community name is already taken" });
            }

            var community = new Community
            {
                Name = normalizedName,
                Description = createCommunityDto.Description.Trim(),
                BannerImageUrl = createCommunityDto.BannerImageUrl,
                CreatorId = userId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Communities.Add(community);

            var membership = new CommunityMember
            {
                Community = community,
                UserId = userId,
                JoinedAt = DateTime.UtcNow
            };

            _context.CommunityMembers.Add(membership);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Community created successfully",
                community = new
                {
                    community.Id,
                    community.Name,
                    community.BannerImageUrl,
                    community.CreatedAt,
                    membersCount = 1
                }
            });
        }

        [Authorize]
        [HttpPost("{id:int}/join")]
        public async Task<IActionResult> JoinCommunity(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                return Unauthorized(new { message = "Invalid token" });
            }

            var communityExists = await _context.Communities.AnyAsync(community => community.Id == id);

            if (!communityExists)
            {
                return NotFound(new {message = "Community not found"});
            }

            var alreadyJoined = await _context.CommunityMembers
                .AnyAsync(member => member.CommunityId == id && member.UserId == userId);

            if (alreadyJoined)
            {
                return BadRequest(new { message = "You are already a member of this community" });
            }

            var membership = new CommunityMember
            {
                CommunityId = id,
                UserId = userId,
                JoinedAt = DateTime.UtcNow
            };

            _context.CommunityMembers.Add(membership);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Joined community successfully" });
        }

        [Authorize]
        [HttpDelete("{id:int}/leave")]
        public async Task<IActionResult> LeaveCommunity(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                return Unauthorized(new { message = "Invalid token" });
            }

            var membership = await _context.CommunityMembers
                .FirstOrDefaultAsync(member => member.CommunityId == id && member.UserId == userId);

            if (membership == null)
            {
                return BadRequest(new { message = "You are not a member of this community" });
            }

            var community = await _context.Communities.FirstOrDefaultAsync(community => community.Id == id);

            if (community == null)
            {
                return NotFound(new { message = "Community not found" });
            }

            if (community.CreatorId == userId)
            {
                return BadRequest(new { message = "Community creator cannot leave their own community" });
            }

            _context.CommunityMembers.Remove(membership);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Left Community successfully" });
        }
    }
}
