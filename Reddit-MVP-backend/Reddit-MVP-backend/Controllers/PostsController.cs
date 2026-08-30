using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reddit_MVP_backend.Models;
using Reddit_MVP_backend.Data;
using Reddit_MVP_backend.DTOs;

namespace Reddit_MVP_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetPosts([FromQuery] string sort = "new")
        {
            var query = _context.Posts
                .Include(post => post.Author)
                .Include(post => post.Community)
                .Include(post => post.Votes)
                .AsQueryable();

            query = sort.ToLower() switch
            {
            "popular" => query
                .OrderByDescending(post => post.Votes.Sum(vote => vote.Value))
                .ThenByDescending(post => post.CreatedAt),
                _=> query.OrderByDescending(post => post.CreatedAt)
            };

            var posts = await query
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
                    commentsCount = 0
                })
                .ToListAsync();

            return Ok(posts);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetPostById(int id)
        {
            var post = await _context.Posts
                .Include(post => post.Author)
                .Include(post => post.Community)
                .Include(post => post.Votes)
                .Where(post => post.Id == id)
                .Select(post => new
                {
                    post.Id,
                    post.Title,
                    post.Content,
                    post.ImageUrl,
                    post.CreatedAt,
                    post.UpdatedAt,
                    authorId = post.AuthorId,
                    authorUsername = post.Author.UserName,
                    communityId = post.CommunityId,
                    communityName = post.Community.Name,
                    voteScore = post.Votes.Sum(vote => vote.Value),
                    commentsCount = 0
                })
                .FirstOrDefaultAsync();

            if (post == null)
            {
                return NotFound(new { message = "Post not found" });
            }

            return Ok(post);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] CreatePostDto createPostDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                return Unauthorized(new { message = "Invalid Token" });
            }

            if (createPostDto.CommunityId <= 0)
            {
                return BadRequest(new { message = "Community is required" });
            }

            if (string.IsNullOrWhiteSpace(createPostDto.Title))
            {
                return BadRequest(new { message = "post title is required" });
            }

            if (createPostDto.Title.Trim().Length > 200)
            {
                return BadRequest(new { message = "Post title cannot exceed 200 characters" });
            }

            if (string.IsNullOrWhiteSpace(createPostDto.Content))
            {
                return BadRequest(new { message = "Post content is required" });
            }

            if (createPostDto.Content.Trim().Length > 5000)
            {
                return BadRequest(new { message = "Post content cannot exceed 5000 characters" });
            }

            var community = await _context.Communities
                .FirstOrDefaultAsync(community => community.Id == createPostDto.CommunityId);

            if (community == null)
            {
                return NotFound(new {message = "Community not found"});
            }

            var post = new Post
            {
                Title = createPostDto.Title.Trim(),
                Content = createPostDto.Content.Trim(),
                ImageUrl = string.IsNullOrWhiteSpace(createPostDto.ImageUrl)
                    ? null
                    : createPostDto.ImageUrl.Trim(),
                CommunityId = community.Id,
                AuthorId = userId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Post created successfully",
                post = new
                {
                    post.Id,
                    post.Title,
                    post.Content,
                    post.ImageUrl,
                    post.CreatedAt,
                    post.UpdatedAt,
                    communityId = community.Id,
                    communityName = community.Name,
                    voteScore = 0,
                    commentsCount = 0
                }
            });
        }

        [Authorize]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] UpdatePostDto updatePostDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                return Unauthorized(new { message = "Invalid token" });
            }

            var post = await _context.Posts.FirstOrDefaultAsync(post => post.Id == id);

            if (post == null)
            {
                return NotFound(new { message = "Post not found" });
            }

            if (post.AuthorId != userId)
            {
                return Forbid();
            }

            if (string.IsNullOrWhiteSpace(updatePostDto.Title))
            {
                return BadRequest(new { message = "Post title is required" });
            }

            if (string.IsNullOrWhiteSpace(updatePostDto.Content))
            {
                return BadRequest(new { message = "Post content is required" });
            }

            if (updatePostDto.Title.Trim().Length > 200)
            {
                return BadRequest(new { message = "Post title cannot exceed 200 characters" });
            }

            if (updatePostDto.Content.Trim().Length > 5000)
            {
                return BadRequest(new { message = "Post content cannot exceed 5000 characters" });
            }

            post.Title = updatePostDto.Title.Trim();
            post.Content = updatePostDto.Content.Trim();
            post.ImageUrl = string.IsNullOrWhiteSpace(updatePostDto.ImageUrl)
                ? null
                : updatePostDto.ImageUrl.Trim();
            post.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Post updated successfully" });
        }

        [Authorize]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                return Unauthorized(new { message = "Invalid token" });
            }

            var post = await _context.Posts.FirstOrDefaultAsync(post => post.Id == id);

            if (post == null)
            {
                return NotFound(new {message = "Post not found"});
            }

            if (post.AuthorId !=  userId)
            {
                return Forbid();
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Post has been deleted successfully" });
        }

        [Authorize]
        [HttpPost("{id:int}/vote")]
        public async Task<IActionResult> VotePost(int id, [FromBody] VotePostDto votePostDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
            {
                return Unauthorized(new { message = "Invalid token" });
            }

            if (votePostDto.Value != 1 && votePostDto.Value != -1)
            {
                return BadRequest(new { message = "Vote value must be 1 or -1" });
            }

            var post = await _context.Posts
                .Include(post => post.Votes)
                .FirstOrDefaultAsync(post => post.Id == id);

            if (post == null)
            {
                return NotFound(new { message = "Post not found" });
            }

            var existingVote = await _context.PostVotes
                .FirstOrDefaultAsync(vote => vote.PostId == id && vote.UserId == userId);

            if (existingVote == null)
            {
                var vote = new PostVote
                {
                    PostId = id,
                    UserId = userId,
                    Value = votePostDto.Value,
                    CreatedAt = DateTime.UtcNow
                };

                _context.PostVotes.Add(vote);
            }
            else if (existingVote.Value == votePostDto.Value)
            {
                _context.PostVotes.Remove(existingVote);
            }
            else
            {
                existingVote.Value = votePostDto.Value;
            }

            await _context.SaveChangesAsync();

            var voteScore = await _context.PostVotes
                .Where(vote => vote.PostId == id)
                .SumAsync(vote => vote.Value);

            return Ok(new
            {
                message = "Vote updated successfully",
                voteScore
            });
        }
    }
}
